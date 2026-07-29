import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, Sparkles, MapPin } from 'lucide-react';
import Button from '../components/Button.jsx';

const NotFound = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200/80 dark:border-slate-800 shadow-2xl space-y-6 animate-scale-up">
        
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 bg-teal-500/20 rounded-full animate-ping" />
          <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-xl">
            <Compass className="w-12 h-12 animate-spin-slow" />
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-full border border-teal-200 dark:border-teal-800">
            Error 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 font-poppins">
            Off The Beaten Path!
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            We couldn't find the page you're looking for. Looks like your coordinates led to an uncharted destination.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Link to="/" className="w-full">
            <Button variant="primary" size="md" className="w-full shadow-md" icon={ArrowLeft}>
              Back to Home
            </Button>
          </Link>
          <Link to="/destinations" className="w-full">
            <Button variant="secondary" size="md" className="w-full" icon={MapPin}>
              Explore Destinations
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFound;
