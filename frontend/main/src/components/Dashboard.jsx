import React from 'react'
import ExpenseTracker from './expenses/ExpenseTracker'
import TaskManager from './tasks/TaskManager'
import AnalyticsDashboard from './analytics/AnalyticsDashboard'


const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
            <ExpenseTracker></ExpenseTracker>
          <AnalyticsDashboard></AnalyticsDashboard>
        </div>
        <div className="space-y-6">
          <TaskManager></TaskManager>
        </div>
    </div>
  )
}

export default Dashboard