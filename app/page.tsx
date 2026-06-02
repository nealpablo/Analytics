'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArchitectureSection from '@/components/ArchitectureSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-950 flex flex-col">
      <Header />

      {/* Hero */}
      <section className="flex-1 py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-16">
            <div className="inline-block mb-6 px-3.5 py-1.5 bg-accent/10 border border-accent/20 rounded-full">
              <span className="text-accent-light text-xs font-medium tracking-wide">AI-Powered PC Building</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight text-zinc-100">
              Build Your Dream PC
              <span className="block text-surface-400 text-3xl md:text-5xl font-semibold mt-2">with Artificial Intelligence</span>
            </h1>

            <p className="text-surface-400 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Let our AI agent analyze your needs, budget, and performance goals to recommend the perfect PC build.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
              <Link
                href="/builder"
                className="px-7 py-3 bg-accent text-white font-medium rounded-xl hover:bg-accent-dark transition-colors text-sm"
              >
                Build Now
              </Link>
              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-7 py-3 border border-surface-500 text-surface-300 font-medium rounded-xl hover:border-surface-400 hover:text-white transition-colors text-sm"
              >
                Learn More
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-surface-400">
              <span>Compatible Builds</span>
              <span>AI-Optimized</span>
              <span>USD & PHP Support</span>
            </div>
          </div>

          {/* Features */}
          <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            <FeatureCard title="Intelligent Analysis" description="Advanced AI reasoning for optimal component choices" />
            <FeatureCard title="Smart Budgeting" description="Intelligent allocation based on your purpose and budget" />
            <FeatureCard title="Performance Metrics" description="Estimated FPS, compatibility checks, and predictions" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-16">
            <StatCard number="1000+" label="Builds Generated" />
            <StatCard number="500+" label="PC Components" />
            <StatCard number="5" label="Use Cases" />
          </div>

          {/* How It Works */}
          <section className="py-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-zinc-100">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <ProcessCard step="1" title="Tell Us" desc="Share your budget, purpose, games & preferences" />
              <ProcessCard step="2" title="AI Analyzes" desc="Advanced reasoning & decision-making process" />
              <ProcessCard step="3" title="Select Parts" desc="Compatible components optimized for your needs" />
              <ProcessCard step="4" title="Get Results" desc="Detailed build with FPS estimates & upgrade path" />
            </div>
          </section>
        </div>
      </section>

      {/* Features Detail */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
            <div>
              <h3 className="text-xl font-bold mb-4 text-zinc-100">Multiple Currencies</h3>
              <p className="text-surface-400 text-sm mb-5 leading-relaxed">
                Get recommendations in your preferred currency. Whether you're shopping in USD or PHP, pricing adjusts automatically.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-surface-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
                  USD ($) — United States Dollar
                </li>
                <li className="flex items-center gap-2 text-sm text-surface-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
                  PHP (₱) — Philippine Peso
                </li>
              </ul>
            </div>
            <div className="bg-surface-850 p-8 rounded-xl border border-surface-600/50 text-center">
              <div className="text-4xl mb-3">💱</div>
              <p className="text-surface-400 text-sm">Multi-currency support</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1 bg-surface-850 p-8 rounded-xl border border-surface-600/50 text-center">
              <div className="text-4xl mb-3">🤖</div>
              <p className="text-surface-400 text-sm">Powered by Google Gemini AI</p>
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-xl font-bold mb-4 text-zinc-100">Gemini AI Integration</h3>
              <p className="text-surface-400 text-sm mb-5 leading-relaxed">
                Leverages Google Gemini AI for intelligent reasoning about components, budgeting, and personalized recommendations.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-surface-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
                  Advanced multi-step reasoning
                </li>
                <li className="flex items-center gap-2 text-sm text-surface-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
                  Intelligent trade-off analysis
                </li>
                <li className="flex items-center gap-2 text-sm text-surface-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
                  Goal-oriented optimization
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <div id="architecture">
        <ArchitectureSection />
      </div>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-zinc-100">Ready to Build?</h2>
          <p className="text-surface-400 text-sm mb-8 max-w-lg mx-auto">
            Let our AI analyze your needs and create a personalized PC recommendation in minutes.
          </p>
          <Link
            href="/builder"
            className="inline-block px-7 py-3 bg-accent text-white font-medium rounded-xl hover:bg-accent-dark transition-colors text-sm"
          >
            Start Building
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-surface-850 p-5 rounded-xl border border-surface-600/50 hover:border-surface-500 transition-colors">
      <h3 className="text-accent-light font-medium text-sm mb-2">{title}</h3>
      <p className="text-surface-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-surface-850 p-5 rounded-xl border border-surface-600/50">
      <div className="text-2xl md:text-3xl font-bold text-white">{number}</div>
      <p className="text-surface-400 mt-1 text-xs">{label}</p>
    </div>
  );
}

function ProcessCard({ step, title, desc }: { step: string; title: string; desc: string }) {
  return (
    <div className="bg-surface-850 p-5 rounded-xl border border-surface-600/50 hover:border-surface-500 transition-colors">
      <div className="inline-block mb-3 px-2.5 py-1 bg-accent text-white rounded-md text-xs font-medium">
        Step {step}
      </div>
      <h3 className="text-zinc-200 font-medium text-sm mb-1">{title}</h3>
      <p className="text-surface-400 text-sm">{desc}</p>
    </div>
  );
}
