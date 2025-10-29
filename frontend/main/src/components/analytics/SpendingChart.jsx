import React from 'react';
import { BarChart3 } from 'lucide-react';
import Terminal from '../common/Terminal';

const SpendingChart = () => {
    const categories = [
        {name: "Food", amount: 245.50, color: 'bg-hacker-green'},
        {name: "Utilities", amount: 180.00, color: 'bg-hacker-blue'},
        {name: "Entertainment", amount: 120.75, color: 'bg-hacker-red'},
        {name: "Transport", amount: 85.30, color: 'bg-hacker-green'},
        {name: "Shopping", amount: 64.20, color: 'bg-hacker-blue'},
    ];

    const maxAmount = Math.max(...categories.map(cat => cat.amount));
  return (
    <Terminal title="Spending Analyses" icon={BarChart3}>
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <div className="text-hacker-green font-mono font-semibold">Top Categories</div>
                <div className="text-xs text-gray-400 font-mono">This Month</div>
            </div>

            <div className="space-y-3">
                {categories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 w-24">
                            <div className={`w-3 h-3 rounded ${category.color}`}></div>
                            <span className="text-sm font-mono">{category.name}</span>
                        </div>

                        <div className="flex-1 mx-4">
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div 
                                    className={`h-2 rounded-full ${category.color} transition-all duration-500`}
                                    style={{ width: `${(category.amount/maxAmount) * 100}%`}}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Monthly Trends */}
            <div className="mt-6">
                <div className="text-hacker-green font-mono font-semibold mb-4">Monthly Trends</div>
                <div className="flex items-end justify-between h-32">
                    {[65, 75, 82, 92].map((value, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div style={{ height: `${value}%`}} className="w-4 bg-hacker-green rounded-t transition-all duration-500 hover:bg-green-400">
                            </div>
                            <div className="text-xs text-gray-400 font-mono mt-1">
                                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index]}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </Terminal>
  );
};

export default SpendingChart;