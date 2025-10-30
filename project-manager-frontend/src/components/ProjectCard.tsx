import React from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../types';
import axiosInstance from '../api/axiosInstance';

interface ProjectCardProps {
  project: Project;
  onProjectDeleted: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onProjectDeleted }) => {
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete project "${project.title}"?`)) {
      try {
        await axiosInstance.delete(`/projects/${project.id}`);
        onProjectDeleted();
      } catch (error) {
        console.error("Failed to delete project", error);
        alert("Failed to delete project.");
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h3 className="text-xl font-bold mb-2">
        <Link to={`/projects/${project.id}`} className="text-blue-600 hover:underline">
          {project.title}
        </Link>
      </h3>
      <p className="text-gray-700 mb-4">{project.description}</p>
      <p className="text-sm text-gray-500 mb-4">Created: {new Date(project.createdAt).toLocaleDateString()}</p>
      <button
        onClick={handleDelete}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm focus:outline-none focus:shadow-outline"
      >
        Delete
      </button>
    </div>
  );
};

export default ProjectCard;
