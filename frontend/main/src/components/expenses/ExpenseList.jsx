import React from 'react';
import { motion, AnimatePresence} from 'framer-motion';
import { Trash2, ArrowUpRight, ArrowDownLeft } from 'lucide-react';


const ExpenseList = ({ expenses, onDeleteExpense}) => {
    if (expenses.length === 0) {
        return (
            <div className="text-center py-8 text-gray-400 font-mono">
                No transactions yet. Add your first transaction above.
            </div>
        )
    }

  return (
    <div className="space-y-2">
        <AnimatePresence>
            {expenses.map((expense, index) => (
                <motion.div
                    key={expense.id}
                    initial={{ opacity: 0, x: -20}}
                    animate={{ opacity: 1, x: 0}}
                    exit={{ opacity: 0, x: 20}}
                    transition={{ delay: index * 0.1}}
                    className='flex items-center justify-between p-3 bg-black/30 rounded border border-gray-800 hover:border-hacker-green/30 transition-colors'
                >
                    <div className="flex items-center space-x-3">
                        <div
                            className={`p-2 rounded ${
                                expense.transaction_type === 'income'
                                    ? 'bg-hacker-green/20 text-hacker-green' 
                                    : 'bg-hacker-red/20 text-hacker-red'
                            }`}
                        >
                            {expense.transaction_type === 'income' ? (
                                <ArrowUpRight size={16}></ArrowUpRight>
                            ) : (
                                <ArrowDownLeft size={i6}></ArrowDownLeft>
                            )}
                        </div>

                        <div>
                            <div className="font-mono font-semibold">{expense.name}</div>
                            <div className="text-sm text-gray-400 font-mono">
                                {expense.category} - {new Date(expense.date).toLocaleDateString()}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <div className={`font-mono font-bold ${
                            expense.transaction_type === 'income' ? 'text-hacker-green' : 'text-hacker-red'
                        }`}>
                            {expense.transaction_type === 'income' ? '+' : '-'}${Math.abs(expense.amount).toFixed(2)}
                        </div>

                        <button
                            onClick={() => onDeleteExpense(expense.id)}
                            className='p-1 text-gray-400 hover:text-hacker-red transition-colors'
                        >
                            <Trash2 size={16}></Trash2>
                        </button>
                    </div>
                </motion.div>
            ))}
        </AnimatePresence>
    </div>
  );
};

export default ExpenseList