'use client';

import React from 'react';

export default function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[350px] gap-5 animate-fade-in">
      <div className="spinner"></div>
      <div className="text-center">
        <h3 className="text-base font-semibold text-zinc-200 mb-1">Analyzing your requirements...</h3>
        <p className="text-surface-400 text-sm">Selecting optimal components for your build</p>
      </div>
    </div>
  );
}
