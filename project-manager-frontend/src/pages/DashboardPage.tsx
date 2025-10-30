import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { removeToken } from '../utils/auth';
import type { Project } from '../types';
import ProjectCard from '../components/ProjectCard';
import ProjectForm from '../components/ProjectForm';

const DashboardPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [quantumParticles, setQuantumParticles] = useState<Array<{id: number, x: number, y: number, size: number, speed: number}>>([]);
  const [hologramActive, setHologramActive] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize quantum particles
    const particles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 20 + 10
    }));
    setQuantumParticles(particles);

    const timer = setTimeout(() => setHologramActive(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get<Project[]>('/projects');
      setProjects(response.data);
    } catch (err: any) {
      setError(err.response?.data?.Message || 'Quantum sync failed. Neural network disrupted.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleProjectAdded = () => {
    fetchProjects();
  };

  const handleProjectDeleted = () => {
    fetchProjects();
  };

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Quantum Energy Field */}
      <div className="absolute inset-0">
        {/* Animated Particles */}
        {quantumParticles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-cyan-400/40 to-purple-400/40 animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.id * 0.5}s`,
              animationDuration: `${particle.speed}s`
            }}
          />
        ))}

        {/* Holographic Grid */}
        <div className="absolute inset-0 opacity-15 bg-[linear-gradient(90deg,transparent_99%,rgba(6,182,212,0.3)_99%),linear-gradient(transparent_99%,rgba(6,182,212,0.3)_99%)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
        
        {/* Energy Vortex */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slower" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-delayed" />

        {/* Orbital Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-cyan-400/10 rounded-full animate-spin-slow [animation-duration:40s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-purple-400/15 rounded-full animate-spin-slow [animation-duration:30s] [animation-direction:reverse]" />
      </div>

      {/* Main Interface */}
      <div className="relative z-10 container mx-auto p-6">
        {/* Header Section */}
        <div className={`mb-8 transition-all duration-1000 transform ${hologramActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-4 h-4 bg-cyan-400 rounded-full animate-ping absolute -top-1 -right-1"></div>
                <h1 className="text-6xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-tighter">
                  PATHLOCK PROJECT MANAGER
                </h1>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-cyan-400 font-mono text-sm tracking-widest">
                  {projects.length} Projects
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="group bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-400 text-red-400 hover:text-red-300 font-mono py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm flex items-center space-x-2"
            >
              <svg className="w-4 h-4 transform group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="tracking-widest">DISCONNECT</span>
            </button>
          </div>

          {/* Status Bar */}
          
            
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-2xl p-4 backdrop-blur-xl animate-pulse">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
              <p className="text-red-400 font-mono text-sm tracking-wide">⚠️ {error}</p>
            </div>
          </div>
        )}

        {/* Project Creation Matrix */}
        <div className={`mb-12 transition-all duration-1000 delay-300 transform ${hologramActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gray-900/40 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-500">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
              <h2 className="text-2xl font-black text-purple-400 font-mono tracking-widest">
                CREATING PROJECT
              </h2>
            </div>
            <ProjectForm onProjectAdded={handleProjectAdded} />
          </div>
        </div>

        {/* Projects Grid */}
        <div className={`transition-all duration-1000 delay-500 transform ${hologramActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-mono tracking-widest">
              ACTIVE PROJECTS
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent"></div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3].map(skeleton => (
                <div key={skeleton} className="bg-gray-900/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 animate-pulse">
                  <div className="h-6 bg-cyan-400/20 rounded mb-4"></div>
                  <div className="h-4 bg-cyan-400/10 rounded mb-2"></div>
                  <div className="h-4 bg-cyan-400/10 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="bg-gray-900/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-16 text-center">
              <div className="w-20 h-20 border-2 border-cyan-500/30 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-10 h-10 text-cyan-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-cyan-400 text-2xl font-mono mb-3 tracking-widest">No Projects</h3>
              <p className="text-cyan-300/60 font-mono max-w-md mx-auto">
                No active projects detected. 
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <div 
                  key={project.id}
                  className="transform hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProjectCard 
                    project={project} 
                    onProjectDeleted={handleProjectDeleted} 
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Energy Pulse */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent blur-sm animate-pulse"></div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          33% { transform: translateY(-30px) rotate(120deg) scale(1.1); }
          66% { transform: translateY(15px) rotate(240deg) scale(0.9); }
        }
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.05; transform: scale(1); }
          50% { opacity: 0.1; transform: scale(1.1); }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.03; transform: scale(1); }
          50% { opacity: 0.08; transform: scale(1.05); }
        }
        @keyframes pulse-delayed {
          0%, 100% { opacity: 0.02; transform: scale(1); }
          50% { opacity: 0.06; transform: scale(1.08); }
        }
        .animate-float { animation: float linear infinite; }
        .animate-spin-slow { animation: spin-slow linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        .animate-pulse-slower { animation: pulse-slower 12s ease-in-out infinite; }
        .animate-pulse-delayed { animation: pulse-delayed 10s ease-in-out infinite 2s; }
      `}</style>
    </div>
  );
};

export default DashboardPage;