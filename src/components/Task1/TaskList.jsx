import TaskItem from './TaskItem';
import { ClipboardList } from 'lucide-react';

export default function TaskList({ tasks, onToggle, onDelete, onUpdatePriority }) {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-12 text-center">
        <ClipboardList className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-gray-500 mb-2">No tasks found</h3>
        <p className="text-gray-400">Try adding a new task or changing filters</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <ul className="divide-y divide-gray-100">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdatePriority={onUpdatePriority}
          />
        ))}
      </ul>
    </div>
  );
}