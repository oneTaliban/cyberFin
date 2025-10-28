import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock, Trash2, AlertTriangle } from 'lucide-react';


const TaskList = ({ tasks, onUpdateTask, onDeleteTask}) => {
    const handleToggleComplete = async (task) => {
        const updatedTask = {
            ...task,
            status: task.status === 'completed' ? 'pending' : "completed",
            completed_at: task.status === 'completed' ? null : new Date().toISOString(),
        };
        await onUpdateTask(task.id, updatedTask);
    };

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'high':
                return <AlertTriangle size={14} className='text-hacker-red'></AlertTriangle>;
            case 'medium':
                return <Clock size={14} className='text-yellow-500'></Clock>;
            case 'low': 
            return <Check size={14} className='text-hacker-green'></Check>;
        }
    };

    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'high':
                return 'border-hacker-red/50 bg-hacker-red/10';
            case 'medium':
                return 'border-yellow-500/50 bg-yellow-500/10';
            default :
                return 'border-hacker-green/50 bg-hacker-green/10';

        }
    }

    if (tasks.length === 0) {
        return (
            <div className="text-center py-8 text-gray-400 font-mono">
                No tasks yet. Add your first new task above.
            </div>
        )
    }
  return (
    <div className="space-y-2">
        <AnimatePresence>
            {tasks.map((task, index) => (
                <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20}}
                    animate={{ opacity: 1, x: 0}}
                    exit={{ opacity: 0, x:20}}
                    transition={{ delay: index * 0.1}}
                    className={`flex items-center justify-between  p-3 rounded border ${getPriorityClass(task.priority)} hover:border-hacker-green/30 transition-colors ${
                        task.status === 'completed' ? 'opacity-60' : ''
                    }`}
                >
                    <div className="flex items-center space-x-3 flex-1">
                        <button
                            onClick={() => handleToggleComplete(task)}
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                task.status === 'completed'
                                    ? 'bg-hacker-green border-hacker-green' 
                                    : 'border-gray-500 hover:border-hacker-green'
                            }`}
                        >
                            {task.status === 'completed' && <Check size={12} className='text-black'></Check>}
                        </button>
                        <div className="flex-1">
                            <div className={`font-mono ${task.status === 'completed' ? 'line-through text-gray-400' : 'text-white'}`}>
                                {task.title}
                            </div>
                            {task.description && (
                                <div className="text-sm text-gray-400 font-mono mt-1">
                                    {task.description}
                                </div>
                            )}
                            {task.due_date && (
                                <div className="text-xs text-gray-500 font-mono mt-1">
                                    Due: {new Date(task.due_date).toLocaleDateString()}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                            {getPriorityClass(task.priority)}
                            <span className="text-xs font-mono capitalize">{task.priority}</span>
                        </div>

                        <button
                            onClick={() => onDeleteTask(task.id)}
                            className='p-1 text-gray-400 hover:text-hacker-red transition-colors'
                        >
                            <Trash2 size={16}></Trash2>
                        </button>
                    </div>
                </motion.div>
            ))}            
        </AnimatePresence>
    </div>
  )
}

export default TaskList