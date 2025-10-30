import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

interface ProjectFormProps {
  onProjectAdded: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onProjectAdded }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await axiosInstance.post('/projects', { title, description });
      setTitle('');
      setDescription('');
      onProjectAdded();
    } catch (err: any) {
      setError(err.response?.data?.Message || 'Failed to add project.');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mb-6">
      <h3 className="text-xl font-bold mb-4">Add New Project</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="projectTitle" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            id="projectTitle"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="projectDescription" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            id="projectDescription"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Project
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
