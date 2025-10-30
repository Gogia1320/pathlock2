import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import type { Project, TaskItem } from '../types';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard.tsx';

interface ProjectDetails extends Project {
  tasks: TaskItem[];
}

const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hologramParticles, setHologramParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);

  useEffect(() => {
    // Initialize hologram particles
    const particles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }));
    setHologramParticles(particles);
  }, []);

  const fetchProjectDetails = async () => {
    if (!id) return;
    try {
      const response = await axiosInstance.get<ProjectDetails>(`/projects/${id}`);
      setProject(response.data);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError("Quantum project matrix not found.");
      } else {
        setError(err.response?.data?.Message || 'Neural network connection failed.');
      }
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const handleTaskAdded = () => {
    fetchProjectDetails();
  };

  const handleTaskUpdated = () => {
    fetchProjectDetails();
  };

  const handleTaskDeleted = () => {
    fetchProjectDetails();
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-cyan-900/20"></div>
        <div className="relative z-10 bg-red-500/10 border border-red-500/30 rounded-2xl p-8 backdrop-blur-xl">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <h2 className="text-red-400 text-xl font-mono font-bold">QUANTUM ERROR</h2>
          </div>
          <p className="text-red-300 mt-2 font-mono">{error}</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          {hologramParticles.map(particle => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                animationDelay: `${particle.delay}s`
              }}
            />
          ))}
        </div>
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-cyan-400 text-xl font-mono font-bold tracking-widest">LOADING QUANTUM MATRIX</h2>
          <p className="text-cyan-300 mt-2 font-mono">Initializing project hologram...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(6,182,212,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.3)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        
        {/* Floating Particles */}
        {hologramParticles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${15 + particle.delay * 2}s`
            }}
          />
        ))}

        {/* Gradient Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse-slower"></div>
      </div>

      <div className="relative z-10 container mx-auto p-6">
        {/* Navigation */}
        <button
          onClick={() => navigate('/dashboard')}
          className="group bg-gray-800/50 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 hover:text-cyan-200 font-mono py-3 px-6 rounded-xl mb-8 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm flex items-center space-x-2"
        >
          <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>RETURN TO DASHBOARD</span>
        </button>

        {/* Project Header */}
        <div className="bg-gray-900/40 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 mb-8 shadow-2xl shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-500">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3 tracking-tight">
                {project.title}
              </h1>
              <p className="text-cyan-100/80 text-lg mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-cyan-300/70">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-mono text-sm">
                    PROJECT CREATED: {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-purple-300/70">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="font-mono text-sm">
                    {project.tasks.length} TASKS
                  </span>
                </div>
              </div>
            </div>
            <div className="ml-6">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>

        {/* Task Form Section */}
        <div className="mb-12">
          <div className="bg-gray-900/40 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 shadow-2xl shadow-purple-500/10">
            <h2 className="text-2xl font-bold text-purple-400 mb-4 font-mono tracking-widest">
              TASK INITIALISATION
            </h2>
            <TaskForm projectId={project.id} onTaskAdded={handleTaskAdded} />
          </div>
        </div>

        {/* Tasks Section */}
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-mono tracking-widest">
              All TASKS
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent"></div>
          </div>

          {project.tasks.length === 0 ? (
            <div className="bg-gray-900/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 border-2 border-cyan-500/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-cyan-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-cyan-400 text-xl font-mono mb-2">NO TASKS DETECTED</h3>
              <p className="text-cyan-300/60 font-mono">NO ACTIVE TASKS</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {project.tasks.map((task) => (
                <div 
                  key={task.id}
                  className="transform hover:scale-105 transition-transform duration-300"
                >
                  <TaskCard
                    task={task}
                    onTaskUpdated={handleTaskUpdated}
                    onTaskDeleted={handleTaskDeleted}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.15; }
        }
        .animate-float { animation: float linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        .animate-pulse-slower { animation: pulse-slower 12s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default ProjectDetailsPage;