import React from 'react';

export const PageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20 animate-pulse transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6 space-y-16">
        {/* Simulated Hero Section */}
        <div className="space-y-6 max-w-4xl">
          <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded-full" />
          <div className="space-y-3">
            <div className="h-12 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
            <div className="h-12 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          </div>
          <div className="h-6 w-5/6 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="flex gap-4 pt-4">
            <div className="h-14 w-48 bg-slate-200 dark:bg-slate-800 rounded-full" />
            <div className="h-14 w-36 bg-slate-200 dark:bg-slate-800 rounded-full" />
          </div>
        </div>

        {/* Simulated Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl space-y-6 shadow-sm">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
              <div className="space-y-2">
                <div className="h-6 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded-lg" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-slate-100 dark:bg-slate-800/60 rounded-lg" />
                <div className="h-4 w-full bg-slate-100 dark:bg-slate-800/60 rounded-lg" />
                <div className="h-4 w-2/3 bg-slate-100 dark:bg-slate-800/60 rounded-lg" />
              </div>
            </div>
          ))}
        </div>

        {/* Simulated Paragraph Block */}
        <div className="space-y-4 pt-12">
          <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-lg" />
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-lg" />
            <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};
