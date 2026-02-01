import { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Play, Pause, RotateCcw, Timer, Clock, AlertCircle } from 'lucide-react';

export default function CountdownTimer() {
  const [initialTime, setInitialTime] = useLocalStorage('timer_initial', 10);
  const [timeLeft, setTimeLeft] = useLocalStorage('timer_timeLeft', 10);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [status, setStatus] = useLocalStorage('timer_status', 'Ready');

  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = Math.max(0, prev - 0.01);
          if (newTime <= 0) {
            setIsActive(false);
            setStatus('Completed');
          }
          return newTime;
        });
      }, 10);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, timeLeft]);

  useEffect(() => {
    if (isActive && !isPaused) {
      setStatus('Running');
    } else if (isPaused) {
      setStatus('Paused');
    }
  }, [isActive, isPaused]);

  const handleStart = () => {
    if (timeLeft <= 0) {
      setTimeLeft(initialTime);
    }
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(initialTime);
    setStatus('Ready');
  };

  const handleInitialTimeChange = (value) => {
    const numValue = parseInt(value) || 0;
    if (numValue > 0) {
      setInitialTime(numValue);
      if (!isActive && status === 'Ready') {
        setTimeLeft(numValue);
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  const getStatusColor = () => {
    switch (status) {
      case 'Running': return 'text-green-600 bg-green-50 border-green-200';
      case 'Paused': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Completed': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-center gap-2 mb-8">
        <Timer className="w-8 h-8 text-red-600" />
        <h2 className="text-2xl font-bold text-gray-800">Advanced Countdown Timer</h2>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className={`p-4 rounded-lg border ${getStatusColor()}`}>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">Status: {status}</span>
              </div>
              <div className="text-4xl font-bold text-center font-mono">
                {formatTime(timeLeft)}
              </div>
              {status === 'Completed' && (
                <div className="mt-3 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full">
                    <AlertCircle className="w-4 h-4" />
                    <span className="font-semibold">Time's up!</span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Set Initial Time (seconds)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    max="3600"
                    value={initialTime}
                    onChange={(e) => handleInitialTimeChange(e.target.value)}
                    disabled={isActive}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <button
                    onClick={() => handleInitialTimeChange(initialTime + 1)}
                    disabled={isActive}
                    className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50"
                  >
                    +1
                  </button>
                  <button
                    onClick={() => handleInitialTimeChange(initialTime + 10)}
                    disabled={isActive}
                    className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50"
                  >
                    +10
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleStart}
                  disabled={isActive || status === 'Completed'}
                  className="py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Start
                </button>
                <button
                  onClick={handleReset}
                  className="py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reset
                </button>
                <button
                  onClick={handlePause}
                  disabled={!isActive || isPaused || status === 'Completed'}
                  className="py-3 bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Pause className="w-5 h-5" />
                  Pause
                </button>
                <button
                  onClick={handleResume}
                  disabled={!isActive || !isPaused}
                  className="py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Resume
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Timer Information</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Initial Time</span>
                <span className="font-bold text-gray-800">{initialTime}s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Time Remaining</span>
                <span className="font-bold text-gray-800">{timeLeft.toFixed(2)}s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Time Elapsed</span>
                <span className="font-bold text-gray-800">{(initialTime - timeLeft).toFixed(2)}s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Progress</span>
                <span className="font-bold text-gray-800">
                  {initialTime > 0 ? ((1 - timeLeft / initialTime) * 100).toFixed(1) : 0}%
                </span>
              </div>
            </div>

            <div className="mt-6">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ 
                    width: `${initialTime > 0 ? (1 - timeLeft / initialTime) * 100 : 0}%` 
                  }}
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-800">
                    Timer state is automatically saved to localStorage. 
                    If you refresh the page while the timer is running, 
                    it will resume from the remaining time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}