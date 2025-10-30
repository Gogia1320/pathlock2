import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [energyFields, setEnergyFields] = useState<Array<{id: number, x: number, y: number, size: number}>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Create pathlock energy fields
    const fields = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 100 + 50
    }));
    setEnergyFields(fields);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError('pathlock signature mismatch. Waveforms do not align.');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Encryption key must contain at least 6 pathlock bits.');
      setIsLoading(false);
      return;
    }

    try {
      await axiosInstance.post('/auth/register', { username, password });
      setSuccess('Neural interface established! pathlock identity synchronized.');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      
      setTimeout(() => {
        navigate('/login');
      }, 2500);
    } catch (err: any) {
      setError(err.response?.data?.Message || 'pathlock entanglement failed. Temporal anomaly detected.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black overflow-hidden relative">
      {/* pathlock Energy Grid */}
      <div className="absolute inset-0">
        {/* Pulsing Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full animate-pulse-slow" />
        
        {/* Energy Fields */}
        {energyFields.map(field => (
          <div
            key={field.id}
            className="absolute rounded-full border border-cyan-400/20 animate-energy-pulse"
            style={{
              left: `${field.x}%`,
              top: `${field.y}%`,
              width: `${field.size}px`,
              height: `${field.size}px`,
              animationDelay: `${field.id * 0.5}s`,
              animationDuration: `${8 + field.id}s`
            }}
          />
        ))}

        {/* Binary Rain */}
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-cyan-400/40 font-mono text-xs animate-binary-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>

        {/* Holographic Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_99%,rgba(6,182,212,0.1)_99%),linear-gradient(transparent_99%,rgba(6,182,212,0.1)_99%)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
        
        {/* Orbital Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-cyan-400/10 rounded-full animate-spin-slow [animation-duration:40s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-purple-500/15 rounded-full animate-spin-slow [animation-duration:30s] [animation-direction:reverse]" />
      </div>

      {/* Main Registration Interface */}
      <div className="relative z-10 bg-black/40 backdrop-blur-2xl border border-cyan-500/30 rounded-3xl p-8 w-full max-w-md mx-4 shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-500">
        {/* Neural Interface Header */}
        <div className="text-center mb-8 relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-sm" />
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-3xl blur-xl" />
          <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-3 tracking-tighter">
            pathlock CORE
          </h1>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <p className="text-cyan-200/70 text-sm font-light tracking-[0.3em]">
              IDENTITY SYNTHESIS
            </p>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Neural Signature Input */}
          <div className="group">
            <label className="block text-cyan-200 text-xs font-semibold mb-3 tracking-widest uppercase">
              USERNAME
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full bg-black/50 border border-cyan-500/40 rounded-xl py-4 px-6 text-cyan-100 placeholder-cyan-200/30 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 group-hover:border-cyan-400/60 backdrop-blur-sm font-mono"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter user"
                required
                disabled={isLoading}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse group-hover:animate-ping" />
              </div>
            </div>
          </div>

          {/* Encryption Matrix Input */}
          <div className="group">
            <label className="block text-cyan-200 text-xs font-semibold mb-3 tracking-widest uppercase">
              PASSWORD
            </label>
            <div className="relative">
              <input
                type="password"
                className="w-full bg-black/50 border border-cyan-500/40 rounded-xl py-4 px-6 text-cyan-100 placeholder-cyan-200/30 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 group-hover:border-cyan-400/60 backdrop-blur-sm font-mono"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="enter password"
                required
                disabled={isLoading}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="flex space-x-1">
                  {[1, 2, 3].map(dot => (
                    <div
                      key={dot}
                      className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
                      style={{ animationDelay: `${dot * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* pathlock Verification */}
          <div className="group">
            <label className="block text-cyan-200 text-xs font-semibold mb-3 tracking-widest uppercase">
              PASSWORD VERIFICATION
            </label>
            <div className="relative">
              <input
                type="password"
                className="w-full bg-black/50 border border-cyan-500/40 rounded-xl py-4 px-6 text-cyan-100 placeholder-cyan-200/30 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 group-hover:border-cyan-400/60 backdrop-blur-sm font-mono"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="confirm password"
                required
                disabled={isLoading}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="w-3 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 animate-pulse" />
              </div>
            </div>
          </div>

          {/* pathlock Status Messages */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 animate-pulse backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-ping" />
                <p className="text-red-400 text-sm font-mono tracking-wide">
                  ⚡ {error}
                </p>
              </div>
            </div>
          )}

          {success && (
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 animate-pulse backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                <p className="text-cyan-400 text-sm font-mono tracking-wide">
                  ✅ {success}
                </p>
              </div>
            </div>
          )}

          {/* pathlock Initiation Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-cyan-500/90 to-purple-600/90 hover:from-cyan-400 hover:to-purple-500 text-white font-black py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden shadow-2xl shadow-cyan-500/30"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <div className="relative z-10 flex items-center justify-center space-x-3">
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="font-mono tracking-widest text-sm">
                    SYNCHRONIZING pathlock STATE...
                  </span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                  <span className="font-mono tracking-widest text-sm">
                    ENTER
                  </span>
                  <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                </>
              )}
            </div>
          </button>

          {/* Neural Link */}
          <div className="text-center pt-6 border-t border-cyan-500/20">
            <Link 
              to="/login" 
              className="inline-flex items-center space-x-2 text-cyan-300/70 hover:text-cyan-200 font-mono text-sm tracking-widest transition-all duration-300 hover:tracking-[0.4em] group"
            >
              <span>EXISTING USER</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </form>

        {/* pathlock Signature Footer */}
        <div className="mt-8 text-center">
          <p className="text-cyan-200/40 text-xs font-mono tracking-widest">
            pathlock SECURITY PROTOCOL v2.4.8
          </p>
        </div>

        {/* Energy Pulse Effect */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-cyan-400/20 blur-lg rounded-full animate-pulse" />
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes energy-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.1; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.3; }
        }
        @keyframes binary-fall {
          0% { transform: translateY(-100px) rotate(0deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.1); }
        }
        .animate-spin-slow { animation: spin-slow linear infinite; }
        .animate-energy-pulse { animation: energy-pulse ease-in-out infinite; }
        .animate-binary-fall { animation: binary-fall linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default RegisterPage;