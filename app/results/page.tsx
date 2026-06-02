'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ResultsDisplay from '@/components/ResultsDisplay';
import { BuildRecommendation, BuildRequest } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

interface BuildResult {
  build: BuildRecommendation;
  explanation: string;
}

export default function ResultsPage() {
  const [result, setResult] = useState<BuildResult | null>(null);
  const [request, setRequest] = useState<BuildRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const buildResult = sessionStorage.getItem('buildResult');
    const buildRequest = sessionStorage.getItem('buildRequest');

    if (buildResult && buildRequest) {
      try {
        setResult(JSON.parse(buildResult));
        setRequest(JSON.parse(buildRequest));
      } catch {
        setError('Failed to load results');
      }
    } else {
      setError('No build results found. Please generate a build first.');
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-950 flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-surface-950 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md px-4">
            <p className="text-rose-400 text-sm font-medium mb-5">{error}</p>
            <Link href="/builder" className="inline-block px-5 py-2.5 bg-accent text-white font-medium rounded-lg hover:bg-accent-dark transition-colors text-sm">
              Generate New Build
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currency = request?.currency || 'USD';
  const avgFps = result.build.estimatedFPS.length > 0
    ? Math.round(result.build.estimatedFPS.reduce((s, f) => s + f.fps, 0) / result.build.estimatedFPS.length)
    : 0;

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-1 text-zinc-100">Your PC Build</h1>
                <p className="text-surface-400 text-sm">
                  {request && <span className="text-surface-300 capitalize">{request.purpose}</span>}
                  <span className="text-surface-500"> · AI-Optimized · {currency}</span>
                </p>
              </div>
              <div className="text-right">
                <div className="text-xs text-surface-500 uppercase tracking-wider mb-0.5">Total Cost</div>
                <div className="text-2xl md:text-3xl font-bold text-white">{formatCurrency(result.build.totalCost, currency)}</div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <QuickStat label="Budget" value={request ? formatCurrency(request.budget, currency) : 'N/A'} />
              <QuickStat label="Components" value="7 Parts" />
              <QuickStat label="Avg FPS" value={`${avgFps} FPS`} />
              {result.build.workloadMetrics && result.build.workloadMetrics.length > 0 ? (
                <QuickStat
                  label={result.build.workloadMetrics[0].label}
                  value={`${result.build.workloadMetrics[0].score}${result.build.workloadMetrics[0].unit ? ' ' + result.build.workloadMetrics[0].unit : ''}`}
                />
              ) : (
                <QuickStat label="Currency" value={currency} />
              )}
            </div>
          </div>

          {/* Results */}
          <ResultsDisplay build={result.build} explanation={result.explanation} currency={request?.currency} />

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center print:hidden">
            <Link href="/builder" className="px-6 py-2.5 bg-accent text-white font-medium rounded-lg hover:bg-accent-dark transition-colors text-sm text-center">
              Generate New Build
            </Link>
            <button onClick={() => window.print()} className="px-6 py-2.5 border border-surface-500 text-surface-300 font-medium rounded-lg hover:border-surface-400 hover:text-white transition-colors text-sm">
              Print Build
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function QuickStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface-850 p-3.5 rounded-xl border border-surface-600/50">
      <div className="text-[11px] font-semibold text-surface-400 uppercase tracking-wider mb-1">{label}</div>
      <div className="text-sm font-semibold text-zinc-200">{value}</div>
    </div>
  );
}
