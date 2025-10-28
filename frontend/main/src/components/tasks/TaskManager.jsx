import React from 'react'
import { CheckSquare, Calendar, Target, Clock} from 'lucide-react';
import Terminal from '../common/Terminal';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskStats from './TaskStats';
import { useTasks } from '../../hooks/useTask';

const TaskManager = () => {
  const { tasks, stats, loading, addTask ,updateTask, deleteTask } =  useTasks();

  if (loading) {
    return (
      <Terminal title="Task Manager" icon={CheckSquare}>
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hacker-green"></div>
        </div>
      </Terminal>
    )
  }

  return (
    <div className="space-y-6">
      {/* Tasks Stats */}
      {stats && <TaskStats stats={stats}></TaskStats>}

      {/* Add task form */}
      <Terminal title="Add New Task" icon={Calendar}>
        <TaskForm onAddTask={addTask}></TaskForm>
      </Terminal>

      {/* Task list */}
      <Terminal title="Task List" icon={Target}>
        <TaskList
          tasks={tasks}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
        ></TaskList>
      </Terminal>
    </div>
  )
}

export default TaskManager