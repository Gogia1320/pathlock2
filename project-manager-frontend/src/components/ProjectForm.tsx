import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

interface ProjectFormProps {
  onProjectAdded: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onProjectAdded }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      await axiosInstance.post('/projects', { title, description });
      setTitle('');
      setDescription('');
      onProjectAdded();
    } catch (err: any) {
      setError(err.response?.data?.Message || 'Failed to add project.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative group">
      {/* Animated Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
      
      <div className="relative bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 transition-all duration-500 group-hover:border-cyan-400/50">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
          <h3 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-mono tracking-widest">
            ADD PROJECT
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div className="space-y-2">
            <label htmlFor="projectTitle" className="block text-cyan-200 text-sm font-semibold tracking-widest uppercase">
              Title
            </label>
            <input
              type="text"
              id="projectTitle"
              className="w-full bg-black/40 border border-cyan-500/30 rounded-xl py-4 px-6 text-cyan-100 placeholder-cyan-200/40 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 backdrop-blur-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              required
              disabled={isLoading}
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label htmlFor="projectDescription" className="block text-cyan-200 text-sm font-semibold tracking-widest uppercase">
             Description
            </label>
            <textarea
              id="projectDescription"
              className="w-full bg-black/40 border border-cyan-500/30 rounded-xl py-4 px-6 text-cyan-100 placeholder-cyan-200/40 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 backdrop-blur-sm resize-none"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              disabled={isLoading}
            ></textarea>
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
            className="w-full bg-gradient-to-r from-cyan-500/90 to-purple-600/90 hover:from-cyan-400 hover:to-purple-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <div className="relative z-10 flex items-center justify-center space-x-2">
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-mono tracking-widest text-sm">INITIALIZING MATRIX...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="font-mono tracking-widest text-sm">ADD PROJECT</span>
                </>
              )}
            </div>
          </button>
        </form>

        {/* Bottom Glow */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-cyan-400/20 blur-lg rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default ProjectForm;