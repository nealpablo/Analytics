'use client';

import React from 'react';
import { BuildRecommendation } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

interface ResultsDisplayProps {
  build: BuildRecommendation;
  explanation: string;
  currency?: 'USD' | 'PHP';
}

export default function ResultsDisplay({ build, explanation, currency = 'USD' }: ResultsDisplayProps) {
  const avgFps = build.estimatedFPS.length > 0
    ? Math.round(build.estimatedFPS.reduce((s, f) => s + f.fps, 0) / build.estimatedFPS.length)
    : 0;

  const components = [
    { label: 'CPU', name: build.cpu.name, price: build.cpu.prices[currency], specs: `${build.cpu.cores} Cores · ${build.cpu.tdp}W` },
    { label: 'GPU', name: build.gpu.name, price: build.gpu.prices[currency], specs: `${build.gpu.vram} VRAM` },
    { label: 'RAM', name: build.ram.name, price: build.ram.prices[currency], specs: build.ram.memory || '' },
    { label: 'Storage', name: build.storage.name, price: build.storage.prices[currency], specs: build.storage.storage || '' },
    { label: 'Motherboard', name: build.motherboard.name, price: build.motherboard.prices[currency], specs: build.motherboard.formFactor || '' },
    { label: 'PSU', name: build.psu.name, price: build.psu.prices[currency], specs: '' },
    { label: 'Case', name: build.case.name, price: build.case.prices[currency], specs: build.case.formFactor || '' },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      {/* AI Reasoning */}
      <div className="bg-surface-850 p-6 rounded-xl border border-surface-600/50">
        <h2 className="text-base font-semibold text-zinc-200 mb-3">AI Analysis</h2>
        <p className="text-surface-300 text-sm leading-relaxed whitespace-pre-wrap bg-surface-900 p-4 rounded-lg border border-surface-700/50">{explanation}</p>
      </div>

      {/* Summary + Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-surface-850 p-5 rounded-xl border border-surface-600/50">
          <h3 className="text-xs font-semibold text-surface-300 uppercase tracking-wider mb-4">Build Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-surface-700/50">
              <span className="text-surface-400 text-sm">Total Cost</span>
              <span className="font-semibold text-accent-light">{formatCurrency(build.totalCost, currency)}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-surface-700/50">
              <span className="text-surface-400 text-sm">Components</span>
              <span className="font-medium text-zinc-300 text-sm">7 Parts</span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="text-surface-400 text-sm">Avg Performance</span>
              <span className="font-semibold text-white">{avgFps} FPS</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-850 p-5 rounded-xl border border-surface-600/50">
          <h3 className="text-xs font-semibold text-surface-300 uppercase tracking-wider mb-4">Gaming Performance</h3>
          <div className="space-y-2.5">
            {build.estimatedFPS.slice(0, 4).map((fps, i) => (
              <div key={i} className="flex justify-between items-center pb-2 border-b border-surface-700/30 last:border-b-0">
                <span className="text-surface-400 text-sm truncate mr-2">{fps.game} <span className="text-surface-500">({fps.resolution})</span></span>
                <span className={`text-sm font-medium px-2 py-0.5 rounded ${
                  fps.fps >= 100 ? 'bg-emerald-500/10 text-emerald-400'
                  : fps.fps >= 60 ? 'bg-accent/10 text-accent-light'
                  : 'bg-rose-500/10 text-rose-400'
                }`}>
                  {fps.fps} FPS
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Workload Performance */}
      {build.workloadMetrics && build.workloadMetrics.length > 0 && (
        <div className="bg-surface-850 p-6 rounded-xl border border-accent/15">
          <h3 className="text-base font-semibold text-zinc-200 mb-5">Workload Performance</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {build.workloadMetrics.map((metric, i) => {
              const isNumeric = typeof metric.score === 'number';
              let barColor = 'bg-accent';
              let barWidth = 0;
              if (isNumeric) {
                const numScore = metric.score as number;
                if (metric.unit === '/ 100') {
                  barWidth = numScore;
                } else if (metric.unit === 'pts') {
                  barWidth = Math.min(100, Math.round((numScore / 25000) * 100));
                } else if (metric.unit === 'mins') {
                  barWidth = Math.min(100, Math.round(((15 - numScore) / 14) * 100));
                } else if (metric.unit === 'tabs') {
                  barWidth = Math.min(100, Math.round((numScore / 300) * 100));
                } else {
                  barWidth = Math.min(100, numScore);
                }
                if (barWidth >= 70) barColor = 'bg-emerald-500';
                else if (barWidth >= 40) barColor = 'bg-accent';
                else barColor = 'bg-amber-500';
              }

              const qualityColor = typeof metric.score === 'string'
                ? metric.score.toLowerCase().includes('excellent') || metric.score.toLowerCase().includes('smooth')
                  ? 'text-emerald-400 bg-emerald-500/10'
                  : metric.score.toLowerCase().includes('good') || metric.score.toLowerCase().includes('playable') || metric.score.toLowerCase().includes('< 1')
                    ? 'text-accent-light bg-accent/10'
                    : 'text-amber-400 bg-amber-500/10'
                : '';

              return (
                <div key={i} className="bg-surface-900 border border-surface-700/50 rounded-lg p-4">
                  <div className="text-[11px] font-semibold text-surface-400 uppercase tracking-wider mb-2">{metric.label}</div>
                  {isNumeric ? (
                    <>
                      <div className="flex items-baseline gap-1.5 mb-2.5">
                        <span className="text-xl font-bold text-zinc-100">{(metric.score as number).toLocaleString()}</span>
                        {metric.unit && <span className="text-xs text-surface-400">{metric.unit}</span>}
                      </div>
                      <div className="w-full bg-surface-700 rounded-full h-1.5 overflow-hidden">
                        <div className={`${barColor} h-full rounded-full transition-all duration-700`} style={{ width: `${barWidth}%` }}></div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold px-2.5 py-1 rounded ${qualityColor}`}>
                        {metric.score}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Components Grid */}
      <div className="bg-surface-850 p-6 rounded-xl border border-surface-600/50">
        <h3 className="text-base font-semibold text-zinc-200 mb-5">Components</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {components.map((comp) => (
            <div key={comp.label} className="bg-surface-900 border border-surface-700/50 rounded-lg p-4 hover:border-surface-500 transition-colors">
              <div className="text-[11px] font-semibold text-surface-400 uppercase tracking-wider mb-1.5">{comp.label}</div>
              <h4 className="font-medium text-zinc-200 text-sm mb-1 leading-snug">{comp.name}</h4>
              {comp.specs && <p className="text-xs text-surface-500 mb-2.5">{comp.specs}</p>}
              <div className="text-sm font-semibold text-accent-light">{formatCurrency(comp.price, currency)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Breakdown */}
      <div className="bg-surface-850 p-6 rounded-xl border border-surface-600/50">
        <h3 className="text-base font-semibold text-zinc-200 mb-5">Budget Breakdown</h3>
        <div className="space-y-3.5">
          {build.budgetBreakdown.map((item, i) => (
            <div key={i}>
              <div className="flex justify-between mb-1.5 text-sm">
                <span className="text-surface-300">{item.category}</span>
                <div className="flex gap-3 items-center">
                  <span className="text-zinc-300 text-sm">{formatCurrency(item.cost, currency)}</span>
                  <span className="text-accent-light text-xs font-medium bg-accent/10 px-1.5 py-0.5 rounded">{item.percentage}%</span>
                </div>
              </div>
              <div className="w-full bg-surface-700 rounded-full h-1.5 overflow-hidden">
                <div className="bg-accent h-full rounded-full animate-progress" style={{ width: `${item.percentage}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade Suggestions */}
      <div className="bg-surface-850 p-6 rounded-xl border border-accent/15">
        <h3 className="text-base font-semibold text-zinc-200 mb-4">Future Upgrade Path</h3>
        <ul className="space-y-2.5">
          {build.upgradeSuggestions.map((s, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-surface-300">
              <span className="text-accent mt-0.5 shrink-0">→</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2 print:hidden">
        <button
          onClick={() => window.print()}
          className="flex-1 px-5 py-2.5 bg-accent text-white font-medium rounded-lg hover:bg-accent-dark transition-colors text-sm"
        >
          Print Build
        </button>
        <a
          href="/builder"
          className="flex-1 px-5 py-2.5 border border-surface-500 text-surface-300 font-medium rounded-lg hover:border-surface-400 hover:text-white transition-colors text-center text-sm"
        >
          Build Again
        </a>
      </div>
    </div>
  );
}
