import React from 'react';
import { TrendingUp, TrendingDown, Wallet, BarChart3, LucideArrowBigLeft } from 'lucide-react';
import Terminal from '../common/Terminal';
import { color } from 'framer-motion';

const ExpenseStats = ({stats}) => {
    const statCards = [
        {
            label: 'Total Balance',
            value: `$${stats.balance.toFixed(2)}`,
            icon: Wallet,
            color: stats.balance >= 0 ? 'text-hacker-green' : 'text-hacker-red',
        },
        {
            label: 'Total Income',
            value: `$${stats.total_income.toFixed(2)}`,
            icon: TrendingUp,
            color: 'text-hacker-green',
        },
        {
            label: 'Total Expenses',
            value: `$${stats.total_expenses.toFixed(2)}`,
            icon: TrendingDown,
            color: 'text-hacker-red'
        },
        {
            label: 'Transactions',
            value: stats.category_breakdown?.reduce((acc, cat) => acc + cat.count, 0) || 0,
            icon: BarChart3,
            color: 'text-hacker-blue',
        },
    ]
  return (
    <Terminal title="Financial Overview" icon={BarChart3}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((stat, index) => {
                const Icon = stat.icon
                return (
                    <div key={index} className="bg-black/50 rounded-lg p-4 border border-gray-800 hover:border-hacker-green/30 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                            <Icon size={20} className={stat.color}></Icon>
                            <div className="text-xs text-gray-400 font-mono">{stat.label}</div>
                        </div>
                        <div className={`text-xl font-bold font-mono ${stat.color}`}>
                            {stat.value}
                        </div>
                    </div>
                )
            })}
        </div>

        {/* Category Breakdown */}
        {stats.category_breakdown && stats.category_breakdown.length > 0 && (
            <div className="mt-6">
                <h4 className="text-hacker-green font-mono font-semibold mb-3">Spending by category</h4>
                <div className="space-y-2">
                    {stats.category_breakdown.map((category, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded"
                                    style={{backgroundColor: category.category__color || '#00ff00'}}
                                ></div>
                                <span className="font-mono text-sm">{category.category__name}</span>
                            </div>
                            <div className="font-mono text-hacker-red">
                                -${Math.abs(category.total.toFixed(2))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </Terminal>
  )
}

export default ExpenseStats