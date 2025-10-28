import React from 'react';
import {motion , AnimatePresence} from 'framer-motion';
import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import Terminal from '../common/Terminal';
import ExpenseStats from './ExpenseStats';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import { useExpenses } from '../../hooks/useExpenses';

const ExpenseTracker = () => {
    const { expenses, stats, loading, addExpense, deleteExpense } = useExpenses();
    
    if (loading) {
        return (
            <Terminal title="Expenditure Tracker" icon={DollarSign}>
                <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hacker-green"></div>
                </div>
            </Terminal>
        );
    }
  return (
    <div className="space-y-6">
        {/* Stats Overview */}
        {stats && <ExpenseStats stats={stats}></ExpenseStats>}

        {/* Expense form */}
        <Terminal title="Add Transaction" icon={Wallet}>
            <ExpenseForm onAddExpense={addExpense}></ExpenseForm>
        </Terminal>

        {/* Expense list */}
        <Terminal title="Recent Transaction" icon={TrendingUp}>
            <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense}></ExpenseList>
        </Terminal>
    </div>
  )
}

export default ExpenseTracker