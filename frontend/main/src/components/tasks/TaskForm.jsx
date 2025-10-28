import React, {useState} from 'react';
import { Plus } from 'lucide-react';

const TaskForm = ({ onAddTask}) => {
    const [formData, setFormData] = useState(
        {
            title: '',
            description: '',
            priority: 'medium',
            due_date: '',
            status: 'pending',
        }
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title.trim() ) return;

        try {
            await onAddTask(formData);
            setFormData({
                title: '',
                description: '',
                priority: 'medium',
                due_date: '',
                status: 'pending',
            });
        } catch (error) {
            console.error("Error adding task: ", error);
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
        <div>
            <label className='block text-sm text-gray-400 mb-2 font-mono'>
                Task Title
            </label>
            <input
                type='text'
                name='title'
                value={formData.title}
                onChange={handleChange}
                className='w-full bg-black/50 border border-gray-600 rounded px-3 py-2 text-white font-mono focus:border-hacker-green focus:outline-none'
                placeholder='What needs to be done?'
            ></input>
        </div>

        <div>
            <label className='block text-sm text-gray-400 mb-2 font-mono'>
                Description (optional)
            </label>
            <textarea
                name='description'
                value={formData.description}
                onChange={handleChange}
                rows={2}
                className='w-full bg-black/50 border border-gray-600 rounded px-3 py-2 text-white font-mono focus:border-hacker-green focus:outline-none'
                placeholder='Add details...'
            ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className='block text-sm text-gray-400 mb-2 font-mono'>
                    Priority
                </label>
                <select
                    name='priority'
                    value={formData.priority}
                    onChange={handleChange}
                    className='w-full bg-black/50 border border-gray-600 rounded px-3 py-2 text-white font-mono focus:border-hacker-green focus:outline-none'
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <div>
                <label className='block text-sm text-gray-400 mb-2 font-mono'>
                    Due Date
                </label>
                <input
                    type='date'
                    name='due_date'
                    value={formData.due_date}
                    onChange={handleChange}
                    className='w-full bg-black/50 border border-gray-600 rounded px-3 py-2 text-white font-mono focus:border-hacker-green focus:outline-none'
                ></input>
            </div>
        </div>

        <button
            type='submit'
            className='w-full bg-hacker-green text-black font-mono font-bold py-3 rounded hover:bg-green-400 transition-colors flex items-center justify-center space-x-2'
        >
            <Plus size={18}></Plus>
            <span>Add Task</span>
        </button>
    </form>
  )
}

export default TaskForm