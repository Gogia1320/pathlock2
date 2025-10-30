import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, speed: number, color: string}>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Create advanced floating particles with different colors and speeds
    const newParticles = Array.from({ length: 25 }, (_, i) => {
      const colors = ['rgba(34,211,238,0.6)', 'rgba(192,132,252,0.6)', 'rgba(74,222,128,0.6)', 'rgba(248,113,113,0.6)'];
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 30 + 20,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
    });
    setParticles(newParticles);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      const response = await axiosInstance.post('/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      await new Promise(resolve => setTimeout(resolve, 800));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.Message || 'pathlock authentication failed. Verify your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden relative">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-10 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl animate-pulse-slower" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse-delayed" />
        
        {/* Floating Particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              animationDelay: `${particle.id * 0.3}s`,
              animationDuration: `${particle.speed}s`,
              filter: 'blur(1px)'
            }}
          />
        ))}
        
        {/* Advanced Grid System */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(34,211,238,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.3)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
        
        {/* Hexagon Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(30deg,transparent_45%,rgba(34,211,238,0.1)_45%,rgba(34,211,238,0.1)_55%,transparent_0%),linear-gradient(-30deg,transparent_45%,rgba(192,132,252,0.1)_45%,rgba(192,132,252,0.1)_55%,transparent_0%)] bg-[size:80px_80px]" />
        
        {/* Dynamic Orbital System */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-cyan-400/20 rounded-full animate-spin-slow [animation-duration:25s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-purple-500/30 rounded-full animate-spin-slow [animation-duration:18s] [animation-direction:reverse]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-blue-400/25 rounded-full animate-spin-slow [animation-duration:12s]" />
        
        {/* Pulsing Energy Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-cyan-400/10 rounded-full animate-ping-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-purple-500/5 rounded-full animate-ping-slower" />
        
        {/* Data Stream Lines */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-0.5 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-data-stream"
              style={{
                top: `${(i + 1) * 12}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + i * 0.5}s`
              }}
            />
          ))}
        </div>

        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 right-20 w-8 h-8 border border-cyan-400/30 rotate-45 animate-float-slow" />
        <div className="absolute bottom-32 left-32 w-6 h-6 border border-purple-400/40 rounded-lg animate-float-delayed" />
        <div className="absolute top-40 left-40 w-4 h-4 bg-cyan-400/20 rounded-full animate-pulse" />
        <div className="absolute bottom-40 right-40 w-3 h-3 bg-purple-400/30 rounded-full animate-ping" />
      </div>

      {/* Main Login Card */}
      <div className="relative z-10 bg-gray-800/30 backdrop-blur-2xl border border-cyan-500/20 rounded-3xl p-8 w-full max-w-md mx-4 shadow-2xl shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-500 hover:border-cyan-500/40">
        {/* Holographic Header with Enhanced Effects */}
        <div className="text-center mb-8 relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-sm" />
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-2xl blur-sm opacity-50" />
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-2 relative">
            PATHLOCK ACCESS
          </h2>
          <p className="text-cyan-200/60 text-sm font-light tracking-widest relative">
            IDENTIFY YOURSELF
          </p>
          {/* Animated Scanner Line */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-cyan-400 blur-sm animate-scan" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div className="group">
            <label htmlFor="username" className="block text-cyan-200 text-sm font-semibold mb-3 tracking-wide">
              USER IDENTIFIER
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                className="w-full bg-gray-900/40 border border-cyan-500/30 rounded-xl py-4 px-6 text-cyan-100 placeholder-cyan-200/40 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 group-hover:border-cyan-400/60 backdrop-blur-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse group-hover:animate-ping" />
              </div>
            </div>
          </div>

          {/* Password Field */}
          <div className="group">
            <label htmlFor="password" className="block text-cyan-200 text-sm font-semibold mb-3 tracking-wide">
              ENCRYPTION KEY
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="w-full bg-gray-900/40 border border-cyan-500/30 rounded-xl py-4 px-6 text-cyan-100 placeholder-cyan-200/40 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 group-hover:border-cyan-400/60 backdrop-blur-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse group-hover:animate-ping" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 animate-pulse backdrop-blur-sm">
              <p className="text-red-400 text-sm text-center font-medium tracking-wide">
                ⚠️ {error}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-cyan-500/90 to-blue-600/90 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
          >
            <div className="relative z-10 flex items-center justify-center">
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                  INITIATING pathlock User...
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-white rounded-full animate-ping mr-3" />
                  ACCESS pathlock NETWORK
                </>
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </button>

          {/* Register Link */}
          <div className="text-center pt-4">
            <Link 
              to="/register" 
              className="inline-block text-cyan-300/70 hover:text-cyan-200 font-semibold text-sm tracking-wide transition-all duration-300 hover:tracking-widest group"
            >
              <span className="flex items-center justify-center">
                CREATE pathlock IDENTITY
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </Link>
          </div>
        </form>

        {/* Enhanced Bottom Glow Effect */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-cyan-400/20 blur-lg rounded-full animate-pulse" />
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          33% { transform: translateY(-30px) rotate(120deg) scale(1.1); }
          66% { transform: translateY(15px) rotate(240deg) scale(0.9); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-25px); }
        }
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.1); }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.05); }
        }
        @keyframes pulse-delayed {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.08); }
        }
        @keyframes ping-slow {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
        @keyframes ping-slower {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
        }
        @keyframes data-stream {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        @keyframes scan {
          0%, 100% { transform: translateX(-50%) scaleX(0); opacity: 0; }
          50% { transform: translateX(-50%) scaleX(1); opacity: 1; }
        }
        .animate-float { animation: float infinite linear; }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite 1s; }
        .animate-spin-slow { animation: spin-slow linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        .animate-pulse-slower { animation: pulse-slower 12s ease-in-out infinite; }
        .animate-pulse-delayed { animation: pulse-delayed 10s ease-in-out infinite 2s; }
        .animate-ping-slow { animation: ping-slow 4s ease-out infinite; }
        .animate-ping-slower { animation: ping-slower 6s ease-out infinite; }
        .animate-data-stream { animation: data-stream infinite linear; }
        .animate-scan { animation: scan 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default LoginPage;