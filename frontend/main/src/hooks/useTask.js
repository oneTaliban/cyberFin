import React, {useState, useEffect} from 'react'
import { taskAPI} from '../services/api';

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState(null);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const response = await taskAPI.getAll();
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks: ", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await taskAPI.getStats();
            setStats(response.data);
        } catch (error) {
            console.error("Error fetching stats: ", error);
        }
    };

    const addTask = async (taskData) => {
        try {
            const response = await taskAPI.create(taskData);
            setTasks(prev => [response.data, ...prev]);
            await fetchStats();
            return response.data;
        } catch (error) {
            console.error("Error adding task: ", error);
            throw error;
        }
    }

    const updateTask = async (id, taskData) => {
        try {
            const response = await taskAPI.update(id, taskData);
            setTasks(prev => prev.map(task => task.id === id ? response.data : task));
            await fetchStats();
            return response.data;
        } catch (error) {
            console.error("Error updating task: ", error);
            throw error;
        }
    };

    const deleteTask = async (id) => {
        try {
            await taskAPI.delete(id);
            setTasks(prev => prev.filter(task => task.id !== id));
            await fetchStats();
        } catch (error) {
            console.error("Error deleting task: ", error);
            throw error;
        }
    };

    useEffect(() => {
        fetchTasks();
        fetchStats();
    }, []);

    return {
        tasks,
        stats,
        loading,
        addTask,
        updateTask,
        deleteTask,
        refetch: fetchTasks,
    };
};
