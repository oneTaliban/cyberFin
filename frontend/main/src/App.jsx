import React,  { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {Routes, Route} from 'react-router-dom';
import { Canvas } from '@react-three/fiber';

import Header from './components/common/Header';
import ThreeDCube from './components/common/ThreeDCube';
import ExpenseTracker from './components/expenses/ExpenseTracker';
import Dashboard from './components/Dashboard';
import TaskManager from './components/tasks/TaskManager';
import AnalyticsDashboard from './components/analytics/AnalyticsDashboard';

function App() {
  const [activeTab, setActiveTab] = useState();

  const renderContent = () => {
    switch (activeTab) {
      case 'expenses':
        return <ExpenseTracker></ExpenseTracker>;
      case 'tasks':
        return <TaskManager></TaskManager>;
      case 'analytics':
        return <AnalyticsDashboard></AnalyticsDashboard>;
      default :
      return <Dashboard></Dashboard>;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas>
          <ambientLight intensity={0.5}></ambientLight>
          <pointLight position={[10, 10, 10]}></pointLight>
          <ThreeDCube></ThreeDCube>
        </Canvas>
      </div>

      {/* Main  content */}
      <div className="relative z-10">
        <Header activeTab={activeTab} setActiveTab={setActiveTab}></Header>
        <main className="container mx-auto px-4 py-4">
          <Routes>
            <Route path='/' element={renderContent()}></Route>
            <Route path='/expenses' element={<ExpenseTracker></ExpenseTracker>}></Route>
            <Route path='/tasks' element={<TaskManager></TaskManager>}></Route>
            <Route path='/analytics' element={<AnalyticsDashboard></AnalyticsDashboard>}></Route>
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
