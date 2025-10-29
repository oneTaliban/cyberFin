import React from 'react'
import { BarChart3, PieChart, TrendingUp, Shield } from 'lucide-react'
import Terminal from '../common/Terminal'
import FinancialHealth from './FinancialHealth'
import SpendingChart from './SpendingChart'
import BudgetPlanning from './BudgetPlanning'

const AnalyticsDashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
            <FinancialHealth></FinancialHealth>
            <BudgetPlanning></BudgetPlanning>
        </div>
        <div className="space-y-6">
            <SpendingChart></SpendingChart>
            <ProductivityMetrics></ProductivityMetrics>
        </div>
    </div>
  );
};

const ProductivityMetrics = () => {
    return (
        <Terminal title="Productivity Metrics" icon={TrendingUp}>
            <div className="space-y-4">
                <div className="text-center">
                    <div className="text-3xl font-bold text-hacker-green font-mono mb-2">2h 45m</div>
                    <div className="text-sm text-gray-400 font-mono">Today's Focus Time</div>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="font-mon">Tasks Completed</span>
                        <span className="font-mono text-hacker-green">7/12</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div style={{ width: '58%'}} className="bg-hacker-green h-2 rounded-full transition-all duration-500"></div>
                    </div>

                    <div className="flex justify-between text-sm mt-4">
                        <span className="font-mono">Weekly Goal</span>
                        <span className="font-mono text-hacker-blue">65%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div style={{ width: '65%'}} className="bg-hacker-blue h-2 rounded-full transition-all duration-500"></div>
                    </div>
                </div>
            </div>
        </Terminal>
    )
}

export default AnalyticsDashboard