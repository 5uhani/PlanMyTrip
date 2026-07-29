import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send, CheckCircle2, AlertCircle, Compass } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth.js';
import Button from '../components/Button.jsx';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setError('');
    setLoading(true);

    const res = await resetPassword(email);
    setLoading(false);

    if (res.success) {
      setSubmitted(true);
      toast.success(res.message || "Password reset email sent!");
    } else {
      setError(res.error || "Failed to send reset email.");
      toast.error(res.error || "Error sending email");
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
            Reset Password
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            We will send a recovery link to your registered email address
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 flex items-center gap-2 text-xs font-medium text-red-700 dark:text-red-300">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {submitted ? (
          <div className="p-6 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/80 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-teal-600 dark:text-teal-400 mx-auto" />
            <div>
              <h4 className="text-base font-bold text-slate-800 dark:text-slate-100">Check Your Inbox</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                If an account exists for <span className="font-semibold text-teal-600 dark:text-teal-400">{email}</span>, you will receive password reset instructions shortly.
              </p>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline pt-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Login
            </Link>
          </div>
        ) : (
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

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full py-3.5 mt-2 shadow-lg"
              loading={loading}
              icon={Send}
            >
              Send Recovery Link
            </Button>
          </form>
        )}

        <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
