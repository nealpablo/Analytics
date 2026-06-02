'use client';

import React from 'react';

const steps = [
  { number: 1, title: 'User Input', description: 'Collect budget, purpose, preferred games, resolution, and preferences' },
  { number: 2, title: 'AI Processing', description: 'Gemini AI processes requirements using structured prompting' },
  { number: 3, title: 'Budget Analysis', description: 'Analyze budget allocation and performance requirements based on use case' },
  { number: 4, title: 'Component Selection', description: 'Apply decision-making rules: prioritize GPU for gaming, CPU for editing, etc.' },
  { number: 5, title: 'Compatibility Check', description: 'Generate compatible build with all components verified' },
  { number: 6, title: 'Recommendations', description: 'Estimate FPS, provide reasoning, and suggest future upgrade paths' },
];

const features = [
  { title: 'Goal-Oriented Planning', description: 'AI optimizes the entire build toward the user\'s primary goal.' },
  { title: 'Intelligent Decision-Making', description: 'AI reasons through component choices, budget allocation, and compatibility.' },
  { title: 'Multi-Step Reasoning', description: 'Systematic analysis of requirements, performance needs, and upgradeability.' },
  { title: 'Adaptive Recommendations', description: 'Builds adapt to different budgets and use cases with intelligent trade-offs.' },
];

export default function ArchitectureSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-zinc-100">
          AI Agent Architecture
        </h2>
        <p className="text-surface-400 text-center mb-10 text-sm max-w-xl mx-auto">
          Our intelligent PC build recommender uses a multi-step reasoning pipeline
        </p>

        {/* Pipeline */}
        <div className="bg-surface-850 p-6 rounded-xl border border-surface-600/50 mb-8">
          <div className="space-y-0">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-white text-sm font-semibold shrink-0">
                    {step.number}
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="w-px h-10 bg-surface-600"></div>
                  )}
                </div>
                <div className="pb-5">
                  <h3 className="font-medium text-zinc-200 text-sm mb-0.5">{step.title}</h3>
                  <p className="text-surface-400 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature) => (
            <div key={feature.title} className="bg-surface-850 p-5 rounded-xl border border-surface-600/50 hover:border-surface-500 transition-colors">
              <h3 className="text-accent-light font-medium text-sm mb-1.5">{feature.title}</h3>
              <p className="text-surface-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
