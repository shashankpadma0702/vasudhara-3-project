import { useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import FilterControls from './FilterControls';
import { ListTodo, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function TodoApp() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [filter, setFilter] = useState('all');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const addTask = (text, priority) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      priority,
      createdAt: new Date().toISOString()
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const updateTaskPriority = (id, priority) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, priority } : task
    ));
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    active: tasks.filter(t => !t.completed).length
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center gap-2 mb-8">
        <ListTodo className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-800">Enhanced Todo App</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <TaskForm onAddTask={addTask} />
          <FilterControls 
            filter={filter} 
            onFilterChange={setFilter}
            onClearCompleted={clearCompleted}
            hasCompleted={stats.completed > 0}
          />
          <TaskList 
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onUpdatePriority={updateTaskPriority}
          />
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Statistics</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ListTodo className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">Total Tasks</span>
                </div>
                <span className="font-bold text-gray-800">{stats.total}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Completed</span>
                </div>
                <span className="font-bold text-green-600">{stats.completed}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-600">Active</span>
                </div>
                <span className="font-bold text-blue-600">{stats.active}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Priority Distribution</h2>
            <div className="space-y-2">
              {['high', 'medium', 'low'].map(priority => {
                const count = tasks.filter(t => t.priority === priority).length;
                return (
                  <div key={priority} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className={`w-4 h-4 ${
                        priority === 'high' ? 'text-red-500' :
                        priority === 'medium' ? 'text-yellow-500' : 'text-green-500'
                      }`} />
                      <span className="capitalize text-gray-600">{priority}</span>
                    </div>
                    <span className="font-bold text-gray-800">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}