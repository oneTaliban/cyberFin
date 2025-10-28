import React, { useState} from 'react';
import { Plus } from 'lucide-react';

const ExpenseForm = ({onAddExpense}) => {
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        category: 'Food',
        transaction_type: 'expense',
        date: new Date().toISOString().split('T')[0],
        description: '',    
    });

    const categories = ['Food', 'Transportation', 'Utilities', 'Entertainment', 'Healthcare'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name & !formData.amount) return;

        try {
            await onAddExpense({
                ...formData,
                amount: parseFloat(formData.amount),
            });

            // ResetForm
            setFormData({
                name: '',
                amount: '',
                category: 'Food',
                transaction_type: 'expense',
                date: new Date().toISOString().split('T')[0],
                description: '',
            });

        } catch (error) {
            console.error("Error adding expense: ", error);
        }
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm text-gray-400 mb-2 font-mono">
                    Transaction Name
                </label>
                <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    className='w-full bg-black/50 border border-gray-600 rounded px-3 py-2 text-white font-mono focus:border-hacker-green focus:outline-none'
                    placeholder='Enter transaction name'
                ></input>
            </div>

            <div>
                <label className="block text-sm text-gray-400 mb-2 font-mono">
                    Amount
                </label>
                <input
                    type='number'
                    name='amount'
                    value={formData.amount}
                    onChange={handleChange}
                    className='w-full bg-black/50 border border-gray-600 rounded px-3 py-2 text-white font-mono focus:border-hacker-green focus:outline-none'
                    placeholder='0.00'
                    step='0.01'
                ></input>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className='block text-sm text-gray-400 mb-2 font-mono'>
                    Category
                </label>
                <select 
                    name="category" 
                    value={formData.category}    
                    onChange={handleChange}
                    className='w-full bg-black/50 border border-gray-500 rounded px-3 py-2 text-white font-mono focus:border-hacker-green focus:outline-none'
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}> {cat} </option>
                    ))}
                </select>
            </div>
        
            <div>
                <label className='block text-sm text-gray-400 mb-2 font-mono'>
                    Type
                </label>
                <select 
                    name="transaction_type" 
                    value={formData.transaction_type}    
                    onChange={handleChange}
                    className='w-full bg-black/50 border border-gray-500 rounded px-3 py-2 text-white font-mono focus:border-hacker-green focus:outline-none'
                >
                    <option value='expense'>Expense </option>
                    <option value='income'>Income </option>
                </select>
            </div>        
        </div>

        <div>
            <label className="block text-sm text-gray-400 mb-2 font-mono">
                Date
            </label>
            <input
                type='date'
                name='date'
                value={formData.date}
                onChange={handleChange}
                className='w-full bg-black/50 border border-gray-600 rounded px-3 py-2 text-white font-mono focus:border-hacker-green focus:outline-none'
            ></input>
        </div>
        
        <div>
            <label className="block text-sm text-gray-400 mb-2 font-mono">
                Description (optional)
            </label>
            <textarea
                name='description'
                value={formData.description}
                onChange={handleChange}
                rows={2}
                className='w-full bg-black/50 border border-gray-600 rounded px-3 py-2 text-white font-mono focus:border-hacker-green focus:outline-none'
                placeholder='Add any note...'
            ></textarea>
        </div>        

        <button
            type='submit'
            className='w-full bg-hacker-green  text-black font-mono font-bold py-3 rounded hover:bg-green-400 transition-colors flex items-center justify-center space-x-2'
        >
            <Plus size={18}></Plus>
            <span>Add Transaction</span>
        </button>

    </form>
  )
}

export default ExpenseForm