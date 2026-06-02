'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BuildForm from '@/components/BuildForm';
import LoadingAnimation from '@/components/LoadingAnimation';
import { BuildRequest } from '@/lib/types';

export default function BuilderPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (request: BuildRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      sessionStorage.setItem('buildRequest', JSON.stringify(request));

      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `API error: ${response.statusText}`);
      }

      const data = await response.json();
      sessionStorage.setItem('buildResult', JSON.stringify(data));
      router.push('/results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate recommendation.');
      console.error('Error:', err);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col">
      <Header />

      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="mb-8 text-center">
            <h1 className="text-2xl md:text-4xl font-bold mb-2 text-zinc-100">Configure Your Build</h1>
            <p className="text-surface-400 text-sm">Tell us your needs and let our AI recommend the perfect PC</p>
          </div>

          {error && (
            <div className="mb-5 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
              <p className="text-rose-400 text-sm">{error}</p>
            </div>
          )}

          {isLoading ? (
            <LoadingAnimation />
          ) : (
            <BuildForm onSubmit={handleSubmit} isLoading={isLoading} />
          )}

          {!isLoading && (
            <div className="mt-10 bg-surface-850 p-5 rounded-xl border border-surface-600/50">
              <h3 className="text-accent-light font-medium mb-3 text-xs uppercase tracking-wider">Tips</h3>
              <ul className="space-y-1.5 text-surface-400 text-sm">
                <li><span className="text-surface-300">Gaming builds</span> prioritize GPU (40-50% of budget)</li>
                <li><span className="text-surface-300">Streaming</span> balances CPU and GPU equally</li>
                <li><span className="text-surface-300">Video editing</span> focuses on CPU and RAM</li>
                <li><span className="text-surface-300">Upgradeability</span> ensures a future upgrade path</li>
              </ul>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
