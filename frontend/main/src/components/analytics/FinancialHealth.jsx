import React from 'react'
import { Shield, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'
import Terminal from '../common/Terminal'

const FinancialHealth = () => {
    const metrics = [
        {
            label: 'Savings Rate',
            value: '18%',
            status: 'good',
            icon: TrendingUp,
        },
        {
            label: 'Emergency Fund',
            value: '4-2 months',
            status: 'good',
            icon: Shield,
        },
        {
            label: 'Debt-to-Income',
            value: '12%',
            status: 'good',
            icon: AlertTriangle,
        },
        {
            label: 'Investment Growth',
            value: '+7.2%',
            status: 'good',
            icon: CheckCircle,
        },                        
    ];

    const getStatusColor = status => {
        return status === 'good' ? 'text-hacker-green' : 'text-hacker-red'
    };

    const getStatusIcon = status => {
        const Icon = status === 'good' ? CheckCircle : AlertTriangle;
        return <Icon size={16} className={getStatusColor(status)}></Icon>;
    };
  return (
    <Terminal title="Financial Health" icon={Shield}>
        <div className="space-y-4">
            <div className="text-center mb-6">
                <div className="text-3xl font-bold text-hacker-green font-mono mb-2">85%</div>
                <div className="text-sm text-gray-400 font-mono">Overall Financial Health</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {metrics.map((metric, index) => {
                    const Icon = metric.icon
                    return (
                        <div key={index} className="bg-black/50 rounded-lg p-3 border border-gray-800">
                            <div className="flex items-center justify-between mb-2">
                                <Icon size={16} className={getStatusColor(metric.status)}></Icon>
                                {getStatusIcon(metric.status)}
                            </div>
                            <div className="text-xs text-gray-400 font-mono mb-1">
                                {metric.label}
                            </div>
                            <div className={`font-bold font-mono ${getStatusColor(metric.status)}`}>
                                {metric.value}
                            </div>
                        </div>
                    )
                })}
            </div>
            
            <div className="bg-hacker-blue/10 border border-hacker-blue/30 rounded-lg p-3 mt-4">
                <div className="font-bold text-hacker-blue font-mono text-sm mb-1">
                    Recommendation
                </div>
                <div className="text-xs text-gray-300 font-mono">
                    Consider increasing your retirement contributions by 2% this month.
                </div>
            </div>
        </div>
    </Terminal>
  );
};

export default FinancialHealth;