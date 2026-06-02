'use client';

import React from 'react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-surface-950/80 backdrop-blur-md border-b border-surface-700/50 print:hidden">
      <nav className="max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-white font-bold text-sm">PC</span>
          </div>
          <span className="font-semibold text-sm text-zinc-200 group-hover:text-white transition-colors">
            PC Builder AI
          </span>
        </a>
        <div className="flex items-center gap-5">
          <a
            href="/"
            className="text-surface-400 hover:text-zinc-200 transition-colors text-sm hidden sm:block"
          >
            Home
          </a>
          <a
            href="/builder"
            className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors"
          >
            Build Now
          </a>
        </div>
      </nav>
    </header>
  );
}
