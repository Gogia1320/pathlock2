import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

interface TaskFormProps {
  projectId: number;
  onTaskAdded: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ projectId, onTaskAdded }) => {
  const [title, setTitle] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      await axiosInstance.post(`/projects/${projectId}/tasks`, {
        title,
        dueDate: dueDate ? new Date(dueDate).toISOString() : new Date().toISOString(),
        isCompleted: false,
      });
      setTitle('');
      setDueDate('');
      onTaskAdded();
    } catch (err: any) {
      setError(err.response?.data?.Message || 'Failed to add task.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative group">
      {/* Animated Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
      
      <div className="relative bg-gray-900/80 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8 transition-all duration-500 group-hover:border-purple-400/50">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
          <h3 className="text-2xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-mono tracking-widest">
            CREATE TASK
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div className="space-y-2">
            <label htmlFor="taskTitle" className="block text-purple-200 text-sm font-semibold tracking-widest uppercase">
              Task Protocol
            </label>
            <input
              type="text"
              id="taskTitle"
              className="w-full bg-black/40 border border-purple-500/30 rounded-xl py-4 px-6 text-purple-100 placeholder-purple-200/40 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 backdrop-blur-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task "
              required
              disabled={isLoading}
            />
          </div>

          {/* Due Date Field */}
          <div className="space-y-2">
            <label htmlFor="dueDate" className="block text-purple-200 text-sm font-semibold tracking-widest uppercase">
              Task Deadline
            </label>
            <input
              type="date"
              id="dueDate"
              className="w-full bg-black/40 border border-purple-500/30 rounded-xl py-4 px-6 text-purple-100 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 backdrop-blur-sm"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 animate-pulse backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
                <p className="text-red-400 text-sm font-mono tracking-wide">⚠️ {error}</p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-500/90 to-blue-600/90 hover:from-purple-400 hover:to-blue-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <div className="relative z-10 flex items-center justify-center space-x-2">
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-mono tracking-widest text-sm">INITIALIZING TASK...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="font-mono tracking-widest text-sm">CREATE TASK</span>
                </>
              )}
            </div>
          </button>
        </form>

        {/* Bottom Glow */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-purple-400/20 blur-lg rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default TaskForm;