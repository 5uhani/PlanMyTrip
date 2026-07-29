import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn, Sparkles, Compass, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth.js';
import Button from '../components/Button.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/profile';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      toast.success("Welcome back to PlanMyTrip!");
      navigate(from, { replace: true });
    } else {
      setError(res.error || "Failed to sign in. Check your credentials.");
      toast.error(res.error || "Login failed");
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    const res = await login("demo.traveler@planmytrip.io", "demoPassword123");
    setLoading(false);
    if (res.success) {
      toast.success("Signed in with Instant Demo Traveler Account!");
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-100 via-slate-50 to-teal-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950/20">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-10 space-y-6 animate-scale-up">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-teal-500/25">
            <Compass className="w-7 h-7 animate-spin-slow" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 font-poppins">
            Welcome Back
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Sign in to access your saved itineraries and budgets
          </p>
        </div>

        {/* Quick Demo Button for Evaluators */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-teal-500/10 border border-amber-500/30 dark:border-amber-500/20 text-center">
          <p className="text-xs text-amber-800 dark:text-amber-300 font-medium mb-2.5">
            ⚡ Quick Test? Sign in instantly without typing:
          </p>
          <Button
            onClick={handleDemoLogin}
            variant="primary"
            size="sm"
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white shadow-amber-500/20"
            icon={Sparkles}
          >
            1-Click Demo Account Login
          </Button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 flex items-center gap-2 text-xs font-medium text-red-700 dark:text-red-300">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Password</label>
              <Link
                to="/forgot-password"
                className="text-xs font-medium text-teal-600 dark:text-teal-400 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full py-3.5 mt-2 shadow-lg"
            loading={loading}
            icon={LogIn}
          >
            Sign In to Account
          </Button>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Don't have an account yet?{' '}
            <Link to="/signup" className="font-semibold text-teal-600 dark:text-teal-400 hover:underline">
              Create free account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
