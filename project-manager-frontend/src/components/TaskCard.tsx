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
    <div className={`bg-white p-6 rounded shadow-md ${isOverdue ? 'border-l-4 border-red-500' : ''}`}>
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              id={`task-completed-${task.id}`}
              checked={editedIsCompleted}
              onChange={(e) => setEditedIsCompleted(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor={`task-completed-${task.id}`} className="text-gray-700 text-sm">Completed</label>
          </div>
          {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleUpdate}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded text-sm focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3 className={`text-xl font-bold mb-2 ${task.isCompleted ? 'line-through text-gray-500' : ''}`}>
            {task.title}
          </h3>
          <p className="text-gray-700 mb-2">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
          <p className={`text-sm mb-4 ${task.isCompleted ? 'text-green-600' : (isOverdue ? 'text-red-600' : 'text-yellow-600')}`}>
            Status: {task.isCompleted ? 'Completed' : (isOverdue ? 'Overdue' : 'Pending')}
          </p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleToggleCompletion}
              className={`py-1 px-3 rounded text-sm focus:outline-none focus:shadow-outline ${
                task.isCompleted ? 'bg-yellow-500 hover:bg-yellow-700' : 'bg-green-500 hover:bg-green-700'
              } text-white font-bold`}
            >
              {task.isCompleted ? 'Mark Pending' : 'Mark Complete'}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm focus:outline-none focus:shadow-outline"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm focus:outline-none focus:shadow-outline"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;
