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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
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
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mb-6">
      <h3 className="text-xl font-bold mb-4">Add New Task</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="taskTitle" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            id="taskTitle"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dueDate" className="block text-gray-700 text-sm font-bold mb-2">Due Date</label>
          <input
            type="date"
            id="dueDate"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
