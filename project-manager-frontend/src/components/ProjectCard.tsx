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
    <div className="group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
      {/* Animated Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Floating Particles */}
      <div className="absolute top-3 right-3 flex space-x-1">
        <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
        <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
      </div>

      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-3">
          <Link 
            to={`/projects/${project.id}`} 
            className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent hover:from-cyan-300 hover:to-purple-300 transition-all duration-300"
          >
            {project.title}
          </Link>
        </h3>
        
        <p className="text-gray-300 mb-4 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-200 transition-colors duration-300">
          {project.description}
        </p>
        
        <div className="flex items-center space-x-2 mb-6">
          <svg className="w-4 h-4 text-cyan-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-xs text-cyan-300/60 font-mono">
            Created: {new Date(project.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="relative z-10 flex justify-between items-center space-x-3">
        <Link
          to={`/projects/${project.id}`}
          className="flex-1 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/40 hover:border-cyan-300/60 text-cyan-300 hover:text-cyan-200 font-medium py-2 px-4 rounded-xl text-sm transition-all duration-300 transform hover:scale-105 text-center backdrop-blur-sm"
        >
          View Task
        </Link>
        
        <button
          onClick={handleDelete}
          className="flex-1 bg-red-500/10 hover:bg-red-500/20 border border-red-400/40 hover:border-red-300/60 text-red-300 hover:text-red-200 font-medium py-2 px-4 rounded-xl text-sm transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
        >
          Delete
        </button>
      </div>

      {/* Animated Border Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

export default ProjectCard;