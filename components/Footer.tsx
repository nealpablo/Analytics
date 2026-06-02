'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-surface-700/50 mt-auto bg-surface-900/50 print:hidden">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center">
                <span className="text-white font-bold text-xs">PC</span>
              </div>
              <h3 className="font-semibold text-zinc-200 text-sm">PC Builder AI</h3>
            </div>
            <p className="text-surface-400 text-sm leading-relaxed">
              Intelligent PC build recommendations powered by AI agent reasoning and goal-oriented planning.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-surface-300 mb-3 text-xs uppercase tracking-wider">Features</h4>
            <ul className="text-surface-400 text-sm space-y-1.5">
              <li>AI-powered recommendations</li>
              <li>Performance estimation</li>
              <li>Budget optimization</li>
              <li>Upgrade suggestions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-surface-300 mb-3 text-xs uppercase tracking-wider">About</h4>
            <p className="text-surface-400 text-sm leading-relaxed">
              Built as a college AI Agent final project demonstrating intelligent reasoning, decision-making, and agentic behavior.
            </p>
          </div>
        </div>
        <div className="border-t border-surface-700/50 pt-6">
          <p className="text-center text-surface-500 text-xs">
            © 2026 AI PC Build Recommender Agent — Ishmael Neal D. Pablo
          </p>
        </div>
      </div>
    </footer>
  );
}
