import { useState, useEffect } from "react";
import  { expenseAPI} from '../services/api';


export const useExpenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [stats ,setStats] = useState(null);
    
    const fetchExpenses = async () => {
        setLoading(true);
        try {
            const response = await expenseAPI.getAll();
            setExpenses(response.data);
        } catch (error) {
            console.error("Error fetchind expenses: ", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try { 
            const response = await expenseAPI.getStats();
            setStats(response.data);
        } catch (error) { 
            console.error("Error fetching stats: ", error);
        }
    };

    const addExpense = async (expenseData) => {
        try {
            const response = await expenseAPI.create(expenseData);
            setExpenses(prev => [response.data, ...prev]);
            await fetchStats();
            return response.data;
        } catch (error) {
            console.error("Error adding an expense ... : ", error);
            throw error;
        }
    };

    const deleteExpense = async (id) => {
        try {
            await expenseAPI.delete(id);
            setExpenses(prev => prev.filter(expense => expense.id !== id));
            await fetchStats();
        } catch (error) {
            console.error("Error deleting expense: ", error);
            throw error;
        }
    };

    useEffect(() => {
        fetchExpenses();
        fetchStats();
    }, []);

    return {
        expenses,
        stats,
        loading,
        addExpense,
        deleteExpense,
        refetch: fetchExpenses,
    };
};