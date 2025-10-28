import React from 'react'
import { CheckCircle, Clock, AlertCircle, Target } from 'lucide-react'
import Terminal from '../common/Terminal'

const TaskStats = ({ stats }) => {

    const statCards = [
        {
            label: 'Total Tasks',
            value: stats.total_tasks,
            icon: Target,
            color: 'text-hacker-blue',
        },
        {
            label: 'Completed',
            value: stats.completed_tasks,
            icon: CheckCircle,
            color: 'text-hacker-green',
        },
        {
            label: 'Pending',
            value: stats.pending_tasks,
            icon: Clock,
            color: 'text-yellow-500',
        },
        {
            label: 'Completion Rate',
            value: `${stats.completion_rate.toFixed(1)}%`,
            icon: AlertCircle,
            color: 'text-hacker-green',
        },
    ]
  return (
    <Terminal title="Task Overview" icon={Target}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((stat, index) => {
                const Icon = stat.icon
                return (
                    <div key={index} className="bg-black/50 rounded-lg p-4 border border-gray-800 hover:border-hacker-green/30 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                            <Icon size={20}></Icon>
                            <div className="text-xs text-gray-400 font-mono">{stat.label}</div>
                        </div>
                        <div className={`text-xl font-bold font-mono ${stat.color}`}>
                            {stat.value}
                        </div>
                    </div>
                )
            })}
        </div>

        {/* Priority Breakdown */}
        {stats.priority_breakdown && (
            <div className="mt-6">
                <h4 className="text-hacker-green font-mono font-semibold">Tasks by Priority</h4>
                {stats.priority_breakdown.map((priority, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div
                                className={`w-3 h-3 rounded ${
                                   priority.priority === 'high' ? 'bg-hacker-red' : 
                                   priority.priority === 'medium' ? 'bg-yellow-500' : 'bg-hacker-green' 
                                }`}
                            ></div>
                            <span className="font-mono text-sm capitalize">{priority.priority}</span>
                        </div>
                        <div className="font-mono text-hacker-blue">
                            {priority.count} tasks
                        </div>
                    </div>
                ))}
            </div>
        )}
    </Terminal>
  )
}

export default TaskStats