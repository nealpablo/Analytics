export interface PCComponent {
  id: string;
  name: string;
  category: string;
  prices: {
    USD: number;
    PHP: number;
  };
  performance: number; // 1-10 scale
  tdp?: number;
  memory?: string;
  cores?: number;
  vram?: string;
  storage?: string;
  formFactor?: string;
  compatibility: string[];
}

export interface BuildRecommendation {
  cpu: PCComponent;
  gpu: PCComponent;
  ram: PCComponent;
  storage: PCComponent;
  motherboard: PCComponent;
  psu: PCComponent;
  case: PCComponent;
  totalCost: number;
  estimatedFPS: {
    game: string;
    resolution: string;
    fps: number;
  }[];
  workloadMetrics: {
    label: string;
    score: number | string;
    unit?: string;
  }[];
  reasoning: string;
  upgradeSuggestions: string[];
  budgetBreakdown: {
    category: string;
    cost: number;
    percentage: number;
  }[];
}

export interface BuildRequest {
  budget: number;
  currency: 'USD' | 'PHP';
  purpose: 'gaming' | 'streaming' | 'school' | 'productivity' | 'video-editing';
  preferredGames: string[];
  preferredResolution: '1080p' | '1440p' | '4k';
  rgbPreference: boolean;
  upgradeability: boolean;
}

export interface AIResponse {
  build: BuildRecommendation;
  explanation: string;
}
