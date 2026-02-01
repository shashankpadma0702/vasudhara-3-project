import { useState, useEffect } from 'react';
import { Sliders, Minus, Plus, Target } from 'lucide-react';

export default function ProgressBar() {
  const [inputs, setInputs] = useState([0, 0, 0, 0, 0]);
  const [mainValue, setMainValue] = useState(0);

  useEffect(() => {
    const total = inputs.reduce((sum, value) => sum + value, 0);
    const average = total / inputs.length;
    setMainValue(average);
  }, [inputs]);

  const handleInputChange = (index, value) => {
    const numValue = parseInt(value) || 0;
    const validatedValue = Math.min(Math.max(numValue, 0), 100);
    
    const newInputs = [...inputs];
    newInputs[index] = validatedValue;
    setInputs(newInputs);
  };

  const increment = (index) => {
    handleInputChange(index, inputs[index] + 1);
  };

  const decrement = (index) => {
    handleInputChange(index, inputs[index] - 1);
  };

  const addInput = () => {
    if (inputs.length < 10) {
      setInputs([...inputs, 0]);
    }
  };

  const removeInput = (index) => {
    if (inputs.length > 1) {
      const newInputs = inputs.filter((_, i) => i !== index);
      setInputs(newInputs);
    }
  };

  const getColor = (value) => {
    if (value < 40) return 'bg-red-500';
    if (value < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center gap-2 mb-8">
        <Sliders className="w-8 h-8 text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-800">Dynamic Progress Bar</h2>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-gray-700">Main Progress Bar</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">{mainValue.toFixed(1)}%</span>
        </div>
        
        <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden mb-2">
          <div
            className={`h-full rounded-full transition-all duration-500 ${getColor(mainValue)}`}
            style={{ width: `${mainValue}%` }}
          />
        </div>
        <div className="h-2 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-full" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {inputs.map((value, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-gray-700">Input #{index + 1}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => decrement(index)}
                    disabled={value <= 0}
                    className="p-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => increment(index)}
                    disabled={value >= 100}
                    className="p-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  {inputs.length > 1 && (
                    <button
                      onClick={() => removeInput(index)}
                      className="px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
              
              <div className="flex gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={value}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="flex-1"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={value}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="w-20 px-3 py-2 border border-gray-300 rounded text-center"
                />
              </div>

              <div className="mt-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Sub Progress</span>
                  <span>{value}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${getColor(value)}`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
          
          {inputs.length < 10 && (
            <button
              onClick={addInput}
              className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-500 hover:text-gray-700 hover:border-gray-400 rounded-lg transition-colors"
            >
              + Add Another Input
            </button>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Statistics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Total Value</span>
                <span className="font-bold text-gray-800">
                  {inputs.reduce((sum, val) => sum + val, 0)}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-purple-500 rounded-full"
                  style={{ 
                    width: `${Math.min(100, inputs.reduce((sum, val) => sum + val, 0) / inputs.length)}%` 
                  }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Average</span>
                <span className="font-bold text-gray-800">
                  {(inputs.reduce((sum, val) => sum + val, 0) / inputs.length).toFixed(1)}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${mainValue}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Highest</span>
                <span className="font-bold text-gray-800">
                  {Math.max(...inputs)}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${Math.max(...inputs)}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Lowest</span>
                <span className="font-bold text-gray-800">
                  {Math.min(...inputs)}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: `${Math.min(...inputs)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}