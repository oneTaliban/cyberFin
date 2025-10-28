import React from 'react';
import {Cpu, DollarSign, CheckSquare, BarChart3, LogOut } from 'lucide-react';

const Header = ({ activeTab, setActiveTab}) => {
    const navItems = [
        {id: 'dashboard', label: 'Dashboard', icon: Cpu},
        {id: 'expenses', label: 'Expenses', icon: DollarSign},
        {id: 'tasks', label: 'Tasks', icon: CheckSquare},
        {id: 'analytics', label: 'Analytics', icon: BarChart3},
    ];

  return (
    <header className="border-b border-hacker-green/30 py-4 mb-8">
        <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Cpu className='text-hacker-green' size={32}></Cpu>
                    <h1 className="text-2xl font-bold text-hacker-green font-mono">
                        CyberFin
                    </h1>
                </div>

                <nav className="flex items-center space-x-6">
                    {navItems.map(item => {
                        const Icon = item.icon

                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 font-mono ${
                                    activeTab === item.id 
                                        ? 'text-hacker-green bg-hacker-green/10 border border-hacker-green/30' 
                                        : 'text-gray-400 hover:text-hacker-green hover:bg-hacker-green/5'
                                }`}
                            >
                                <Icon size={18}></Icon>
                                <span>{item.label}</span>
                            </button>
                        )
                    })}
                </nav>

                <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-400 font-mono">
                        Welcome, User
                    </div>
                    <button className='p-2 text-gray-gray-400 hover:text-hacker-green transition-colors'>
                        <LogOut size={18}></LogOut>
                    </button>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header