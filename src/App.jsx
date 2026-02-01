import { useState } from 'react';
import TodoApp from './components/Task1/TodoApp';
import UserForm from './components/Task2/UserForm';
import ProgressBar from './components/Task3/ProgressBar';
import CountdownTimer from './components/Task4/CountdownTimer';
import SearchList from './components/Task5/SearchList';
import { CheckSquare, FormInput, Sliders, Timer, Search, Menu, X } from 'lucide-react';

const tasks = [
  { id: 1, name: 'Enhanced Todo App', component: TodoApp, icon: CheckSquare },
  { id: 2, name: 'Form Handling & Validation', component: UserForm, icon: FormInput },
  { id: 3, name: 'Dynamic Progress Bar', component: ProgressBar, icon: Sliders },
  { id: 4, name: 'Advanced Countdown Timer', component: CountdownTimer, icon: Timer },
  { id: 5, name: 'Live Search with Highlighting', component: SearchList, icon: Search },
];

function App() {
  const [currentTask, setCurrentTask] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const CurrentComponent = tasks.find(task => task.id === currentTask)?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">
            React Developer Intern Assignment
          </h1>
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-50
          transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 transition-transform duration-300
          w-64 bg-white shadow-xl lg:shadow-none
        `}>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between lg:justify-start gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">VG</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">Vasundharaa Geo</h1>
                <p className="text-sm text-gray-500">React Intern Assignment</p>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <nav className="p-4">
            <ul className="space-y-1">
              {tasks.map((task) => {
                const Icon = task.icon;
                return (
                  <li key={task.id}>
                    <button
                      onClick={() => {
                        setCurrentTask(task.id);
                        setSidebarOpen(false);
                      }}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-lg
                        transition-colors text-left
                        ${currentTask === task.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-100'
                          : 'text-gray-700 hover:bg-gray-50'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium">{task.name}</span>
                      {currentTask === task.id && (
                        <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500">
              <p className="mb-2">Features demonstrated:</p>
              <ul className="space-y-1">
                <li>• State Management</li>
                <li>• LocalStorage Persistence</li>
                <li>• Form Validation</li>
                <li>• Dynamic UI Updates</li>
                <li>• Real-time Search</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <header className="mb-8 hidden lg:block">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                React Developer Intern - Assignment Submission
              </h1>
              <p className="text-gray-600">
                Complete implementation of all 5 tasks with React Hooks, LocalStorage persistence, and responsive design
              </p>
            </header>

            <div className="mb-6">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex flex-wrap gap-2">
                  {tasks.map((task) => {
                    const Icon = task.icon;
                    return (
                      <button
                        key={task.id}
                        onClick={() => setCurrentTask(task.id)}
                        className={`
                          flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                          ${currentTask === task.id
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-100'
                          }
                        `}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">Task {task.id}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="border-b border-gray-200 p-6">
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = tasks.find(t => t.id === currentTask)?.icon;
                    return Icon ? <Icon className="w-6 h-6 text-blue-600" /> : null;
                  })()}
                  <h2 className="text-xl font-bold text-gray-800">
                    {tasks.find(t => t.id === currentTask)?.name}
                  </h2>
                </div>
              </div>
              <div className="p-1">
                {CurrentComponent && <CurrentComponent />}
              </div>
            </div>

            <footer className="mt-8 text-center text-gray-500 text-sm">
              <p>Vasundharaa Geo Technologies Pvt Ltd - React Developer Intern Assignment</p>
              <p className="mt-1">Built with React, Tailwind CSS, and LocalStorage Persistence</p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;