import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 space-y-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-5 w-24 bg-slate-200 rounded-xl" />
        <div className="h-6 w-6 bg-slate-200 rounded-lg" />
      </div>
      <div className="space-y-2">
        <div className="h-6 w-3/4 bg-slate-200 rounded-lg" />
        <div className="h-4 w-1/2 bg-slate-100 rounded-lg" />
      </div>
      <div className="space-y-1.5 pt-2">
        <div className="h-3.5 w-full bg-slate-100 rounded" />
        <div className="h-3.5 w-5/6 bg-slate-100 rounded" />
      </div>
      <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
        <div className="h-4 w-28 bg-slate-100 rounded" />
        <div className="h-4 w-16 bg-slate-100 rounded" />
      </div>
      <div className="h-11 w-full bg-slate-200 rounded-2xl mt-2" />
    </div>
  );
};

