import React, { useState } from 'react';
import type { TaskItem } from '../types';
import axiosInstance from '../api/axiosInstance';

interface TaskCardProps {
  task: TaskItem;
  onTaskUpdated: () => void;
  onTaskDeleted: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(task.title);
  const [editedDueDate, setEditedDueDate] = useState<string>(task.dueDate.split('T')[0]);
  const [editedIsCompleted, setEditedIsCompleted] = useState<boolean>(task.isCompleted);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async () => {
    setError(null);
    try {
      await axiosInstance.put(`/tasks/${task.id}`, {
        title: editedTitle,
        dueDate: new Date(editedDueDate).toISOString(),
        isCompleted: editedIsCompleted,
      });
      setIsEditing(false);
      onTaskUpdated();
    } catch (err: any) {
      setError(err.response?.data?.Message || 'Failed to update task.');
    }
  };

  const handleToggleCompletion = async () => {
    setError(null);
    try {
      await axiosInstance.put(`/tasks/${task.id}`, {
        title: task.title,
        dueDate: task.dueDate,
        isCompleted: !task.isCompleted,
      });
      onTaskUpdated();
    } catch (err: any) {
      setError(err.response?.data?.Message || 'Failed to toggle task completion.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete task "${task.title}"?`)) {
      try {
        await axiosInstance.delete(`/tasks/${task.id}`);
        onTaskDeleted();
      } catch (error) {
        console.error("Failed to delete task", error);
        alert("Failed to delete task.");
      }
    }
  };

  const isOverdue = !task.isCompleted && new Date(task.dueDate) < new Date();

  return (
    <div className={`group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl p-6 border transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
      isOverdue ? 'border-red-500/50 hover:border-red-400/70' : 
      task.isCompleted ? 'border-green-500/50 hover:border-green-400/70' : 
      'border-cyan-500/30 hover:border-cyan-400/50'
    }`}>
      
      {/* Animated Background Glow */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
        isOverdue ? 'bg-red-500/10' : 
        task.isCompleted ? 'bg-green-500/10' : 
        'bg-cyan-500/10'
      }`}></div>

      {/* Status Indicator */}
      <div className="absolute top-4 right-4">
        <div className={`w-3 h-3 rounded-full animate-pulse ${
          task.isCompleted ? 'bg-green-400' : 
          isOverdue ? 'bg-red-400' : 
          'bg-cyan-400'
        }`}></div>
      </div>

      <div className="relative z-10">
        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full bg-black/40 border border-cyan-500/30 rounded-xl py-3 px-4 text-cyan-100 placeholder-cyan-200/40 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 backdrop-blur-sm"
              placeholder="Enter task title"
            />
            <input
              type="date"
              value={editedDueDate}
              onChange={(e) => setEditedDueDate(e.target.value)}
              className="w-full bg-black/40 border border-cyan-500/30 rounded-xl py-3 px-4 text-cyan-100 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 backdrop-blur-sm"
            />
            <div className="flex items-center space-x-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={editedIsCompleted}
                  onChange={(e) => setEditedIsCompleted(e.target.checked)}
                  className="sr-only peer"
                />
                <div className={`w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer transition-all duration-300 ${
                  editedIsCompleted ? 'bg-green-500' : 'bg-cyan-500'
                } peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
              </label>
              <span className="text-cyan-200 text-sm font-medium">Completed</span>
            </div>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 backdrop-blur-sm">
                <p className="text-red-400 text-sm text-center">⚠️ {error}</p>
              </div>
            )}
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleUpdate}
                className="bg-green-500/10 hover:bg-green-500/20 border border-green-400/40 hover:border-green-300/60 text-green-300 hover:text-green-200 font-medium py-2 px-4 rounded-xl text-sm transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500/10 hover:bg-gray-500/20 border border-gray-400/40 hover:border-gray-300/60 text-gray-300 hover:text-gray-200 font-medium py-2 px-4 rounded-xl text-sm transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h3 className={`text-xl font-bold mb-3 leading-tight ${
              task.isCompleted ? 'line-through text-gray-400' : 'text-cyan-100'
            }`}>
              {task.title}
            </h3>
            
            <div className="flex items-center space-x-2 mb-3">
              <svg className="w-4 h-4 text-cyan-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-cyan-300/80 text-sm">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </p>
            </div>
            
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold mb-4 ${
              task.isCompleted ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 
              isOverdue ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 
              'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
            }`}>
              {task.isCompleted ? 'COMPLETED' : (isOverdue ? 'OVERDUE' : 'PENDING')}
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleToggleCompletion}
                className={`py-2 px-4 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 backdrop-blur-sm ${
                  task.isCompleted ? 
                  'bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-400/40 hover:border-yellow-300/60 text-yellow-300 hover:text-yellow-200' : 
                  'bg-green-500/10 hover:bg-green-500/20 border border-green-400/40 hover:border-green-300/60 text-green-300 hover:text-green-200'
                }`}
              >
                {task.isCompleted ? 'Mark Pending' : 'Complete'}
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/40 hover:border-cyan-300/60 text-cyan-300 hover:text-cyan-200 font-medium py-2 px-4 rounded-xl text-sm transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500/10 hover:bg-red-500/20 border border-red-400/40 hover:border-red-300/60 text-red-300 hover:text-red-200 font-medium py-2 px-4 rounded-xl text-sm transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>

      {/* Animated Border Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

export default TaskCard;