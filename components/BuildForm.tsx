'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { BuildRequest } from '@/lib/types';
import { getCurrencySymbol, getBudgetLimits, convertToUSD } from '@/lib/utils';

interface BuildFormProps {
  onSubmit: (request: BuildRequest) => Promise<void>;
  isLoading: boolean;
}

export default function BuildForm({ onSubmit, isLoading }: BuildFormProps) {
  const [formData, setFormData] = useState<BuildRequest>({
    budget: 1500,
    currency: 'USD',
    purpose: 'gaming',
    preferredGames: [],
    preferredResolution: '1440p',
    rgbPreference: true,
    upgradeability: true,
  });

  const [customGame, setCustomGame] = useState('');
  const currencySymbol = getCurrencySymbol(formData.currency);
  const limits = getBudgetLimits(formData.currency);

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value);
    if (isNaN(val)) val = 0;
    if (val > limits.max) val = limits.max;
    setFormData({ ...formData, budget: val });
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCurrency = e.target.value as 'USD' | 'PHP';
    const oldCurrency = formData.currency;

    // Convert current budget to the new currency
    let newBudget: number;
    if (oldCurrency === 'USD' && newCurrency === 'PHP') {
      newBudget = Math.round(formData.budget * 61);
    } else if (oldCurrency === 'PHP' && newCurrency === 'USD') {
      newBudget = convertToUSD(formData.budget, 'PHP');
    } else {
      newBudget = formData.budget;
    }

    // Clamp to the new currency limits
    const newLimits = getBudgetLimits(newCurrency);
    newBudget = Math.max(newLimits.min, Math.min(newLimits.max, newBudget));
    // Round to step
    newBudget = Math.round(newBudget / newLimits.step) * newLimits.step;

    setFormData({ ...formData, currency: newCurrency, budget: newBudget });
  };

  const handlePurposeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, purpose: e.target.value as BuildRequest['purpose'] });
  };

  const handleResolutionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, preferredResolution: e.target.value as '1080p' | '1440p' | '4k' });
  };

  const handleAddGame = () => {
    if (customGame.trim() && formData.preferredGames.length < 5) {
      setFormData({
        ...formData,
        preferredGames: [...formData.preferredGames, customGame.trim()],
      });
      setCustomGame('');
    }
  };

  const handleRemoveGame = (game: string) => {
    setFormData({
      ...formData,
      preferredGames: formData.preferredGames.filter((g) => g !== game),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl mx-auto">
      {/* Currency & Budget */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Currency */}
        <div className="bg-surface-850 p-5 rounded-xl border border-surface-600/50 hover:border-surface-500 transition-colors">
          <label className="block">
            <span className="text-xs font-semibold text-surface-300 uppercase tracking-wider">Currency</span>
            <select
              value={formData.currency}
              onChange={handleCurrencyChange}
              disabled={isLoading}
              className="w-full mt-2 px-4 py-2.5 bg-surface-900 border border-surface-600 rounded-lg text-surface-300 cursor-pointer hover:border-surface-400 focus:border-accent focus:outline-none transition-colors text-sm"
            >
              <option value="USD">USD ($)</option>
              <option value="PHP">PHP (₱)</option>
            </select>
          </label>
        </div>

        {/* Budget */}
        <div className="bg-surface-850 p-5 rounded-xl border border-surface-600/50 hover:border-surface-500 transition-colors">
          <label className="block">
            <span className="text-xs font-semibold text-surface-300 uppercase tracking-wider">Total Budget</span>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-2xl font-bold text-surface-400">{currencySymbol}</span>
              <input
                type="number"
                min={limits.min}
                max={limits.max}
                step={limits.step}
                value={formData.budget}
                onChange={handleBudgetChange}
                disabled={isLoading}
                className="w-full bg-transparent text-2xl font-bold text-white border-b-2 border-transparent hover:border-surface-600 focus:border-accent focus:outline-none transition-colors px-1"
              />
            </div>
            <input
              type="range"
              min={limits.min}
              max={limits.max}
              step={limits.step}
              value={formData.budget}
              onChange={handleBudgetChange}
              disabled={isLoading}
              className="w-full mt-3"
            />
            <div className="flex justify-between text-xs text-surface-400 mt-1.5">
              <span>{currencySymbol}{limits.min.toLocaleString()}</span>
              <span>{currencySymbol}{limits.max.toLocaleString()}</span>
            </div>
          </label>
        </div>
      </div>

      {/* Purpose & Resolution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-surface-850 p-5 rounded-xl border border-surface-600/50 hover:border-surface-500 transition-colors">
          <label className="block">
            <span className="text-xs font-semibold text-surface-300 uppercase tracking-wider">Primary Purpose</span>
            <select
              value={formData.purpose}
              onChange={handlePurposeChange}
              disabled={isLoading}
              className="w-full mt-2 px-4 py-2.5 bg-surface-900 border border-surface-600 rounded-lg text-surface-300 cursor-pointer hover:border-surface-400 focus:border-accent focus:outline-none transition-colors text-sm"
            >
              <option value="gaming">Gaming</option>
              <option value="streaming">Streaming</option>
              <option value="video-editing">Video Editing</option>
              <option value="productivity">Productivity</option>
              <option value="school">School / Study</option>
            </select>
          </label>
        </div>

        <div className="bg-surface-850 p-5 rounded-xl border border-surface-600/50 hover:border-surface-500 transition-colors">
          <label className="block">
            <span className="text-xs font-semibold text-surface-300 uppercase tracking-wider">Target Resolution</span>
            <select
              value={formData.preferredResolution}
              onChange={handleResolutionChange}
              disabled={isLoading}
              className="w-full mt-2 px-4 py-2.5 bg-surface-900 border border-surface-600 rounded-lg text-surface-300 cursor-pointer hover:border-surface-400 focus:border-accent focus:outline-none transition-colors text-sm"
            >
              <option value="1080p">1080p</option>
              <option value="1440p">1440p</option>
              <option value="4k">4K</option>
            </select>
          </label>
        </div>
      </div>

      {/* Preferred Games */}
      <div className="bg-surface-850 p-5 rounded-xl border border-surface-600/50 hover:border-surface-500 transition-colors">
        <span className="text-xs font-semibold text-surface-300 uppercase tracking-wider">Preferred Games (Optional)</span>
        <div className="flex gap-2 mt-3">
          <input
            type="text"
            value={customGame}
            onChange={(e) => setCustomGame(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddGame())}
            placeholder="Add a game (max 5)..."
            disabled={isLoading || formData.preferredGames.length >= 5}
            className="flex-1 px-4 py-2 bg-surface-900 border border-surface-600 rounded-lg text-surface-300 placeholder-surface-500 hover:border-surface-400 focus:border-accent focus:outline-none transition-colors text-sm"
          />
          <button
            type="button"
            onClick={handleAddGame}
            disabled={isLoading || formData.preferredGames.length >= 5 || !customGame.trim()}
            className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Add
          </button>
        </div>

        {formData.preferredGames.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.preferredGames.map((game) => (
              <div
                key={game}
                className="px-3 py-1 bg-accent/10 border border-accent/30 rounded-full text-sm text-accent-light flex items-center gap-1.5"
              >
                <span>{game}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveGame(game)}
                  className="text-surface-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preferences */}
      <div className="bg-surface-850 p-5 rounded-xl border border-surface-600/50 hover:border-surface-500 transition-colors">
        <span className="text-xs font-semibold text-surface-300 uppercase tracking-wider block mb-3">Preferences</span>
        <div className="space-y-3">
          <label className="flex items-center cursor-pointer group">
            <input
              type="checkbox"
              checked={formData.rgbPreference}
              onChange={(e) => setFormData({ ...formData, rgbPreference: e.target.checked })}
              disabled={isLoading}
            />
            <span className="ml-3 text-surface-300 group-hover:text-white transition-colors text-sm">
              RGB Lighting & Aesthetics
            </span>
          </label>
          <label className="flex items-center cursor-pointer group">
            <input
              type="checkbox"
              checked={formData.upgradeability}
              onChange={(e) => setFormData({ ...formData, upgradeability: e.target.checked })}
              disabled={isLoading}
            />
            <span className="ml-3 text-surface-300 group-hover:text-white transition-colors text-sm">
              Prioritize Upgradeability
            </span>
          </label>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 px-6 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 text-sm"
      >
        {isLoading ? (
          <>
            <span className="spinner w-4 h-4 border-2"></span>
            Building...
          </>
        ) : (
          'Generate My Build'
        )}
      </button>
    </form>
  );
}
