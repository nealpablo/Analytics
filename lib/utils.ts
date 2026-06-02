import { BuildRequest } from './types';
import { COMPONENTS_DATABASE } from './components-database';

// ─── Currency Conversion ────────────────────────────────────

export function convertToUSD(amount: number, currency: string): number {
  if (currency === 'PHP') return Math.round(amount / 61);
  return amount;
}

// ─── Validation ─────────────────────────────────────────────

export function getBudgetLimits(currency: string): { min: number; max: number; step: number } {
  if (currency === 'PHP') {
    return { min: 10000, max: 2000000, step: 1000 };
  }
  return { min: 200, max: 40000, step: 50 };
}

export function validateBudget(budget: number, currency: string = 'USD'): boolean {
  const limits = getBudgetLimits(currency);
  return budget >= limits.min && budget <= limits.max;
}

// ─── Formatting ─────────────────────────────────────────────

export function formatCurrency(value: number, currency: string = 'USD'): string {
  if (currency === 'PHP') {
    return `₱${value.toLocaleString('en-PH')}`;
  }
  return `$${value.toLocaleString('en-US')}`;
}

export function getCurrencySymbol(currency: string): string {
  return currency === 'PHP' ? '₱' : '$';
}

export function calculatePercentage(value: number, total: number): number {
  return Math.round((value / total) * 100);
}

// ─── Price Helper ───

function formatPriceDisplay(price: number, currency: string): string {
  const symbol = getCurrencySymbol(currency);
  return `${symbol}${price.toLocaleString()}`;
}

// ─── AI Prompt Generator ────────────────────────────────────

export function generateBuildPrompt(request: BuildRequest): string {
  const gamesList = request.preferredGames.join(', ') || 'general gaming';
  const currency = request.currency;
  const currencySymbol = getCurrencySymbol(currency);

  // Convert budget to display value
  const budgetDisplay = `${currencySymbol}${request.budget.toLocaleString()}`;

  // Convert budget to USD internally for the AI to reason about
  const budgetInUSD = convertToUSD(request.budget, currency);

  const getCompList = (category: string) => {
    return COMPONENTS_DATABASE
      .filter((c) => c.category === category)
      .map((c) => {
        let specs = [];
        if (c.cores) specs.push(`${c.cores} cores`);
        if (c.vram) specs.push(c.vram);
        if (c.memory) specs.push(c.memory);
        if (c.tdp) specs.push(`${c.tdp}W TDP`);
        const price = currency === 'PHP' ? c.prices.PHP : c.prices.USD;
        return `- ${c.name} (${formatPriceDisplay(price, currency)})${specs.length ? ` - ${specs.join(', ')}` : ''}`;
      })
      .join('\n');
  };

  return `You are an expert PC builder. Based on the following user requirements, recommend a complete PC build with specific components.

USER REQUIREMENTS:
- Budget: ${budgetDisplay} (${currency})${currency === 'PHP' ? ` (approximately $${budgetInUSD.toLocaleString()} USD)` : ''}
- Primary Purpose: ${request.purpose}
- Preferred Games: ${gamesList}
- Target Resolution: ${request.preferredResolution}
- RGB Preference: ${request.rgbPreference ? 'Yes' : 'No'}
- Upgradeability Priority: ${request.upgradeability ? 'High' : 'Low'}

AVAILABLE COMPONENTS (all prices shown in ${currency}):

CPU Options:
${getCompList('cpu')}

GPU Options:
${getCompList('gpu')}

RAM Options:
${getCompList('ram')}

Storage:
${getCompList('storage')}

Motherboards:
${getCompList('motherboard')}

Power Supplies:
${getCompList('psu')}

Cases:
${getCompList('case')}

PROVIDE YOUR RECOMMENDATION IN THIS EXACT JSON FORMAT (no markdown, plain JSON):
{
  "cpu": { "name": "component name", "reason": "why chosen" },
  "gpu": { "name": "component name", "reason": "why chosen" },
  "ram": { "name": "component name", "reason": "why chosen" },
  "storage": { "name": "component name", "reason": "why chosen" },
  "motherboard": { "name": "component name", "reason": "why chosen" },
  "psu": { "name": "component name", "reason": "why chosen" },
  "case": { "name": "component name", "reason": "why chosen" },
  "totalCost": total_price_as_number_in_${currency},
  "gamesFPS": [
    { "game": "game name", "resolution": "${request.preferredResolution}", "estimatedFPS": fps_number }
  ],
  "reasoning": "comprehensive explanation of build decisions",
  "upgradeSuggestions": ["upgrade suggestion 1", "upgrade suggestion 2", "upgrade suggestion 3"]
}

IMPORTANT NOTES:
- All prices in your response must be in ${currency}
- The total cost must not exceed the user's budget of ${budgetDisplay}
- Select components from the list above that fit within the budget
- For gaming: Prioritize GPU (40-50% of budget)
- For streaming: Balance CPU and GPU (35-35%), 16-32GB RAM
- For video editing: Prioritize CPU and RAM (30-40% to CPU, 20-30% to RAM)
- For productivity: CPU and RAM focus
- For school: Budget-conscious, reliable components
- Always ensure PSU wattage is 30% higher than total system TDP
- Consider component compatibility (AM4/AM5/LGA1700, DDR4/DDR5)`;
}

// ─── FPS Estimation ─────────────────────────────────────────

export function estimateFPS(gpuName: string, resolution: string, game: string): number {
  const baselineMap: { [key: string]: number } = {
    'RTX 6000 Ada': 250,
    'RTX 4090': 200,
    'RTX 4080 SUPER': 165,
    'RTX 4080': 160,
    'RTX 4070 Ti': 135,
    'RTX 4070': 120,
    'RTX 4060 Ti': 100,
    'RTX 4060': 85,
    'RX 7900 XTX': 170,
    'RX 7800 XT': 125,
    'RX 7700 XT': 105,
    'RX 7600': 75,
    'RX 6600': 65,
    'RX 6500 XT': 40,
    'GTX 1650': 45,
    'Arc A380': 30,
    'Integrated': 20,
  };

  const resolutionMultiplier: { [key: string]: number } = {
    '1080p': 1.0,
    '1440p': 0.65,
    '4k': 0.35,
  };

  let baseline = 60;
  for (const [gpu, fps] of Object.entries(baselineMap)) {
    if (gpuName.includes(gpu) || (gpuName.toLowerCase().includes('integrated') && gpu === 'Integrated')) {
      baseline = fps;
      break;
    }
  }

  // Make FPS dynamic based on the game
  const g = game.toLowerCase();
  let gameMultiplier = 1.0;
  
  if (g.includes('valorant') || g.includes('csgo') || g.includes('cs:go') || g.includes('counter-strike') || g.includes('league')) {
    gameMultiplier = 2.5; // Esports titles
  } else if (g.includes('fortnite') || g.includes('apex') || g.includes('overwatch')) {
    gameMultiplier = 1.6; // Light shooters
  } else if (g.includes('cyberpunk') || g.includes('alan wake') || g.includes('starfield')) {
    gameMultiplier = 0.55; // Extremely demanding
  } else if (g.includes('red dead') || g.includes('witcher') || g.includes('hogwarts')) {
    gameMultiplier = 0.75; // Demanding RPGs
  } else if (g.includes('gta v') || g.includes('minecraft')) {
    gameMultiplier = 1.8; // Older/easier games
  }

  // Add a tiny bit of random variance so similar games don't have the EXACT same FPS
  const hash = game.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const variance = 0.95 + ((hash % 10) / 100); // 0.95x to 1.04x variance

  const resMult = resolutionMultiplier[resolution.toLowerCase()] || 1.0;
  
  return Math.round(baseline * resMult * gameMultiplier * variance);
}

// ─── Workload Benchmarks ────────────────────────────────────

export function estimateWorkloadMetrics(cpuName: string, gpuName: string, ramName: string, purpose: string) {
  const metrics = [];
  
  const hasNVENC = gpuName.toLowerCase().includes('rtx') || gpuName.toLowerCase().includes('gtx');
  const ramMatch = ramName.match(/(\d+)GB/);
  const ramGB = ramMatch ? parseInt(ramMatch[1], 10) : 16;
  
  let cpuScore = 50;
  if (cpuName.includes('Threadripper') || cpuName.includes('i9') || cpuName.includes('Ryzen 9')) cpuScore = 95;
  else if (cpuName.includes('i7') || cpuName.includes('Ryzen 7')) cpuScore = 80;
  else if (cpuName.includes('i5') || cpuName.includes('Ryzen 5')) cpuScore = 65;
  else if (cpuName.includes('i3') || cpuName.includes('Ryzen 3')) cpuScore = 40;

  if (purpose === 'streaming') {
    metrics.push({
      label: 'OBS Encoding Quality',
      score: hasNVENC ? 'Excellent (NVENC)' : (cpuScore > 70 ? 'Good (x264)' : 'Basic'),
    });
    metrics.push({
      label: 'Multitasking Score',
      score: Math.min(100, Math.round((ramGB / 32) * 50 + (cpuScore / 2))),
      unit: '/ 100'
    });
  } else if (purpose === 'video-editing') {
    metrics.push({
      label: '4K Timeline Playback',
      score: (ramGB >= 32 && cpuScore >= 70) ? 'Smooth' : (ramGB >= 16 ? 'Playable' : 'Stuttery'),
    });
    metrics.push({
      label: 'Render Speed Index',
      score: Math.round(cpuScore * 1.5 + ramGB),
      unit: 'pts'
    });
  } else if (purpose === 'productivity') {
    metrics.push({
      label: 'Cinebench Multi-Core',
      score: cpuScore * 250 + (ramGB > 16 ? 2000 : 1000),
      unit: 'pts'
    });
    metrics.push({
      label: 'Compile Time Index',
      score: Math.max(1, 15 - Math.round(cpuScore / 10)),
      unit: 'mins'
    });
  } else if (purpose === 'school') {
    metrics.push({
      label: 'Browser Tab Capacity',
      score: ramGB * 5,
      unit: 'tabs'
    });
    metrics.push({
      label: 'Office Load Time',
      score: cpuScore > 50 ? '< 1' : '2-3',
      unit: 'sec'
    });
  } else {
    // default (gaming)
    let gpuScore = 5000;
    if (gpuName.includes('4090')) gpuScore = 28000;
    else if (gpuName.includes('4080') || gpuName.includes('7900')) gpuScore = 22000;
    else if (gpuName.includes('4070') || gpuName.includes('7800')) gpuScore = 17000;
    else if (gpuName.includes('4060') || gpuName.includes('7600')) gpuScore = 10000;
    
    metrics.push({
      label: '3DMark TimeSpy',
      score: gpuScore + (cpuScore * 50),
      unit: 'pts'
    });
  }
  
  return metrics;
}
