import React from 'react';
import { Compass } from 'lucide-react';

const LoadingSpinner = ({ message = "Loading...", size = "md", fullScreen = false }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24"
  };

  const content = (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className="relative flex items-center justify-center">
        <div className={`${sizeClasses[size]} border-4 border-teal-500/20 border-t-teal-600 dark:border-t-teal-400 rounded-full animate-spin`} />
        <Compass className={`absolute text-teal-600 dark:text-teal-400 animate-pulse ${size === 'lg' ? 'w-6 h-6' : size === 'xl' ? 'w-10 h-10' : 'w-4 h-4'}`} />
      </div>
      {message && (
        <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-400 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full py-12">
      {content}
    </div>
  );
};

export default LoadingSpinner;
