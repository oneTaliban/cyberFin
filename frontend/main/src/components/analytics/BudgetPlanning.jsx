import React from "react";
import {Target, AlertTriangle} from 'lucide-react';
import Terminal from '../common/Terminal';

const BudgetPlanning = () => {
    const budgets = [
        {category: "Food & Dining", spent: 350, budget: 500, color: "hacker-green"},
        {category: "Entertainment", spent: 120, budget: 200, color: "hacker-blue"},
        {category: "Utilities", spent: 180, budget: 250, color: 'hacker-red'},
        {category: "Transportation", spent: 90, budget: 150, color: 'hacker-green'},
    ];

    return (
        <Terminal title="Budget Planning" icon={Target}>
            <div className="space-y-4">
                {budgets.map((item, index) => {
                    const percentage = (item.spent / item.budget) * 100;
                    const isOverBudget = percentage > 100;
                    const colorClass = isOverBudget ? 'hacker-red' : item.color;
                    
                    return (
                        <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="font-mono text-sm">{item.category}</span>
                                <span className={`font-mono text-sm text-${colorClass}`}>
                                    ${item.spent} / ${item.budget}
                                </span>
                            </div>

                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className={`h-2 rounded-full bg-${colorClass} transition-all duration-500 ${
                                    isOverBudget ? 'animate-pulse' : ''
                                }`}
                                style={{ width: `${Math.min(percentage, 100)}%`}}
                                >
                                </div>
                            </div>

                            {isOverBudget && (
                                <div className="flex items-center space-x-1 text-hacker-red text-xs">
                                    <AlertTriangle size={12}></AlertTriangle>
                                    <span className="font-mono">Over budget by ${(item.spent - item.budget).toFixed(2)}</span>
                                </div>
                            )}
                        </div>
                    )
                })}

                <div className="mt-4 p-3 bg-hacker-green/10 border border-hacker-green/30 rouded-lg">
                    <div className="font-bold text-hacker-green font-mono text-sm mb-1">
                        Budget Tip
                    </div>
                    <div className="text-xs text-gray-300 font-mono">
                        You're doing great with your food budget! Consider reallocating some savings to investments.
                    </div>
                </div>
            </div>
        </Terminal>
    );
}

export default BudgetPlanning;