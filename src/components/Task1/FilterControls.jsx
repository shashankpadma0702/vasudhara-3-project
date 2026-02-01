import { Filter, CheckSquare, Square, List } from 'lucide-react';

export default function FilterControls({ filter, onFilterChange, onClearCompleted, hasCompleted }) {
  const filters = [
    { id: 'all', label: 'All', icon: List },
    { id: 'active', label: 'Active', icon: Square },
    { id: 'completed', label: 'Completed', icon: CheckSquare }
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-gray-500" />
        <span className="text-gray-700 font-medium">Filter:</span>
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          {filters.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onFilterChange(id)}
              className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
                filter === id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>
      
      {hasCompleted && (
        <button
          onClick={onClearCompleted}
          className="px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
        >
          Clear Completed
        </button>
      )}
    </div>
  );
}