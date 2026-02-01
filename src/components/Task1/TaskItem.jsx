import { CheckCircle2, Circle, Trash2, AlertCircle } from 'lucide-react';

export default function TaskItem({ task, onToggle, onDelete, onUpdatePriority }) {
  const priorityColors = {
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-green-100 text-green-800 border-green-200'
  };

  return (
    <li className="p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggle(task.id)}
          className="flex-shrink-0"
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.completed ? (
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          ) : (
            <Circle className="w-6 h-6 text-gray-300 hover:text-gray-400" />
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          <p className={`text-gray-800 ${task.completed ? 'line-through text-gray-400' : ''}`}>
            {task.text}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs px-2 py-1 rounded-full border ${priorityColors[task.priority]}`}>
              {task.priority} priority
            </span>
            <span className="text-xs text-gray-400">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={task.priority}
            onChange={(e) => onUpdatePriority(task.id, e.target.value)}
            className="text-xs px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Delete task"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </li>
  );
}