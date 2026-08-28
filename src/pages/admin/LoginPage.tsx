import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, AlertCircle } from 'lucide-react';
import { authService } from '../../services/authService';
import { Button } from '../../components/common/Button';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await authService.login(username, password);
      setIsLoading(false);

      if (result.success) {
        navigate('/garage/dashboard');
      } else {
        setError(result.error || 'Invalid credentials');
      }
    } catch {
      setIsLoading(false);
      setError('Login failed. Please try again.');
    }
  };

  const handleDemoFill = () => {
    setUsername('admin');
    setPassword('admin123');
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-gray-900 flex flex-col justify-center items-center px-4 py-12 relative">
      {/* Login Card */}
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 sm:p-10 shadow-lg relative z-10">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <img
            src="/images/logo.png"
            alt="Chaudhari Auto Centre Logo"
            className="h-16 w-auto object-contain mx-auto mb-3"
          />

          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-gray-900 font-sans">
            CHAUDHARI AUTO CENTRE
          </h1>

          <div className="text-xs font-black tracking-[0.25em] text-[#DFA500] uppercase mt-0.5">
            PAHUR • GARAGE PORTAL
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Internal Staff & Workshop Management
          </p>
        </div>

        {/* Demo Credentials Helper */}
        <div
          onClick={handleDemoFill}
          className="mb-6 p-3 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-between cursor-pointer hover:border-[#F5B900] transition-colors"
          title="Click to pre-fill demo credentials"
        >
          <div className="text-xs">
            <span className="font-bold text-gray-800 block">Demo Access:</span>
            <span className="text-gray-500 font-mono">User: <strong>admin</strong> | Pass: <strong>admin123</strong></span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-[#FFF9E6] px-2 py-1 rounded border border-[#FDE68A]">
            Auto-fill
          </span>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Mobile / Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username or mobile"
                className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#F5B900]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#F5B900]"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={isLoading}
            className="font-extrabold uppercase tracking-wider text-sm py-3.5 mt-2"
          >
            {isLoading ? 'Authenticating...' : 'Login to Dashboard'}
          </Button>
        </form>

        {/* Return to website */}
        <div className="pt-6 mt-6 border-t border-gray-100 text-center">
          <Link
            to="/"
            className="text-xs text-gray-500 hover:text-black transition-colors inline-flex items-center gap-1 font-medium"
          >
            <span>← Return to Public Website</span>
          </Link>
        </div>
      </div>

      <div className="mt-8 text-xs text-gray-400">
        © 2024 Chaudhari Auto, Pahur. All Rights Reserved.
      </div>
    </div>
  );
};
