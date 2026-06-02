import { NextRequest, NextResponse } from 'next/server';
import { BuildRequest, BuildRecommendation, AIResponse } from '@/lib/types';
import { generateBuildPrompt, estimateFPS, estimateWorkloadMetrics, getBudgetLimits, convertToUSD, formatCurrency } from '@/lib/utils';
import { getComponentsByCategory, COMPONENTS_DATABASE } from '@/lib/components-database';

// ─── Gemini Client ──────────────────────────────────────────

async function callGeminiAPI(prompt: string): Promise<string | null> {
  if (!process.env.GEMINI_API_KEY) {
    console.warn('GEMINI_API_KEY not found');
    return null;
  }

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      if (error?.error?.status !== 'PERMISSION_DENIED') {
        console.error('Gemini API Error:', error);
      }
      throw new Error(`Gemini API Error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (err: any) {
    if (!err.message.includes('unregistered callers') && !err.message.includes('PERMISSION_DENIED')) {
      console.error('Gemini API Call Failed:', err.message);
    }
    return null;
  }
}

// ─── Types ──────────────────────────────────────────────────

interface AIRecommendation {
  cpu: { name: string; reason: string };
  gpu: { name: string; reason: string };
  ram: { name: string; reason: string };
  storage: { name: string; reason: string };
  motherboard: { name: string; reason: string };
  psu: { name: string; reason: string };
  case: { name: string; reason: string };
  totalCost: number;
  gamesFPS: Array<{ game: string; resolution: string; estimatedFPS: number }>;
  reasoning: string;
  upgradeSuggestions: string[];
}

// ─── Component Matching ─────────────────────────────────────

function findBestComponent(name: string, category: string) {
  const components = getComponentsByCategory(category);
  const search = name.toLowerCase();

  // Exact substring match
  let found = components.find((c) => search.includes(c.name.toLowerCase()) || c.name.toLowerCase().includes(search));

  // Partial keyword match
  if (!found) {
    const keywords = search.split(/[\s,]+/).filter((w) => w.length > 2);
    found = components.find((c) => {
      const cName = c.name.toLowerCase();
      return keywords.some((kw) => cName.includes(kw));
    });
  }

  return found || components[0];
}

// ─── Build from AI Response ─────────────────────────────────

function buildFromAIResponse(ai: AIRecommendation, req: BuildRequest): BuildRecommendation {
  const currency = req.currency || 'USD';
  
  const getComp = (name: string, category: string) => {
    return findBestComponent(name, category);
  };

  const cpu = getComp(ai.cpu.name, 'cpu');
  const gpu = getComp(ai.gpu.name, 'gpu');
  const ram = getComp(ai.ram.name, 'ram');
  const storage = getComp(ai.storage.name, 'storage');
  const motherboard = getComp(ai.motherboard.name, 'motherboard');
  const psu = getComp(ai.psu.name, 'psu');
  const pcCase = getComp(ai.case.name, 'case');

  const getPrice = (comp: any) => currency === 'PHP' ? comp.prices.PHP : comp.prices.USD;

  const totalCost = getPrice(cpu) + getPrice(gpu) + getPrice(ram) + getPrice(storage) + getPrice(motherboard) + getPrice(psu) + getPrice(pcCase);

  const games = req.preferredGames.length > 0 ? req.preferredGames : ['Cyberpunk 2077', 'The Witcher 3', 'Fortnite', 'Valorant', 'GTA V', 'NBA 2K26'];

  const estimatedFPS = games.map((game) => ({
    game,
    resolution: req.preferredResolution,
    fps: estimateFPS(gpu.name, req.preferredResolution, game),
  }));

  const parts = [
    { category: 'CPU', cost: getPrice(cpu) },
    { category: 'GPU', cost: getPrice(gpu) },
    { category: 'RAM', cost: getPrice(ram) },
    { category: 'Storage', cost: getPrice(storage) },
    { category: 'Motherboard', cost: getPrice(motherboard) },
    { category: 'PSU', cost: getPrice(psu) },
    { category: 'Case', cost: getPrice(pcCase) },
  ];

  const budgetBreakdown = parts.map((p) => ({
    category: p.category,
    cost: p.cost,
    percentage: Math.round((p.cost / totalCost) * 100),
  }));

  return {
    cpu, gpu, ram, storage, motherboard, psu,
    case: pcCase,
    totalCost,
    estimatedFPS,
    workloadMetrics: estimateWorkloadMetrics(cpu.name, gpu.name, ram.name, req.purpose),
    reasoning: ai.reasoning,
    upgradeSuggestions: ai.upgradeSuggestions,
    budgetBreakdown,
  };
}

// ─── Fallback AI Logic ──────────────────────────────────────

function getFallbackTiers(req: BuildRequest): AIRecommendation[] {
  const p = req.purpose;
  const games = req.preferredGames.length > 0 ? req.preferredGames : ['Cyberpunk 2077', 'The Witcher 3', 'Fortnite'];

  const tiers = [
    {
      cpuName: 'AMD Athlon 3000G', gpuName: 'Integrated Graphics', ramName: '8GB DDR4 3200MHz', storageName: '128GB SATA SSD', moboName: 'MSI A520M-A PRO', psuName: '400W 80+ White PSU', caseName: 'Keytech T100'
    },
    {
      cpuName: 'Intel Pentium Gold G7400', gpuName: 'Intel Arc A380', ramName: '8GB DDR4 3200MHz', storageName: '128GB SATA SSD', moboName: 'Gigabyte H610M S2H', psuName: '400W 80+ White PSU', caseName: 'Keytech T100'
    },
    {
      cpuName: p === 'productivity' ? 'Intel Core i3-12100F' : 'AMD Ryzen 3 4100',
      gpuName: p === 'gaming' ? 'AMD Radeon RX 6500 XT' : 'NVIDIA GTX 1650',
      ramName: '16GB DDR4 3200MHz',
      storageName: '256GB NVMe SSD',
      moboName: p === 'productivity' ? 'Gigabyte H610M S2H' : 'MSI A520M-A PRO',
      psuName: '450W 80+ White PSU',
      caseName: 'Cougar MX330-G'
    },
    {
      cpuName: 'AMD Ryzen 5 5600X',
      gpuName: p === 'gaming' ? 'AMD Radeon RX 7600' : 'NVIDIA RTX 4060',
      ramName: '16GB DDR4 3600MHz',
      storageName: '500GB NVMe SSD',
      moboName: 'MSI B550-A PRO',
      psuName: '650W 80+ Bronze PSU',
      caseName: 'Fractal Design Focus G'
    },
    {
      cpuName: p === 'video-editing' || p === 'productivity' ? 'Intel Core i5-13600K' : 'AMD Ryzen 5 7600',
      gpuName: p === 'gaming' || p === 'streaming' ? 'NVIDIA RTX 4070' : 'NVIDIA RTX 4060',
      ramName: p === 'video-editing' ? '32GB DDR5 6000MHz' : '16GB DDR5 6000MHz',
      storageName: '1TB NVMe SSD',
      moboName: p === 'gaming' ? 'ASUS ROG STRIX X670E-E' : 'MSI PRO B760-A EDGE',
      psuName: '750W 80+ Gold PSU',
      caseName: 'NZXT H510 Flow'
    },
    {
      cpuName: p === 'video-editing' ? 'AMD Ryzen 9 7950X' : 'AMD Ryzen 7 7700X',
      gpuName: p === 'gaming' ? 'NVIDIA RTX 4080' : 'AMD Radeon RX 7900 XTX',
      ramName: '32GB DDR5 6000MHz',
      storageName: '2TB NVMe SSD',
      moboName: 'ASUS ROG STRIX X670E-E',
      psuName: '850W 80+ Gold PSU',
      caseName: req.rgbPreference ? 'Corsair 5000T RGB' : 'Lian Li O11 Dynamic EVO'
    },
    {
      cpuName: 'AMD Ryzen 9 7950X',
      gpuName: 'NVIDIA RTX 4090',
      ramName: '64GB DDR5 6000MHz',
      storageName: '4TB NVMe SSD',
      moboName: 'ASUS ROG STRIX X670E-E',
      psuName: '1000W 80+ Platinum PSU',
      caseName: req.rgbPreference ? 'Corsair 5000T RGB' : 'Lian Li O11 Dynamic EVO'
    },
    {
      cpuName: 'AMD Threadripper PRO 7995WX',
      gpuName: '2x NVIDIA RTX 6000 Ada',
      ramName: '256GB DDR5 ECC Registered',
      storageName: '16TB (4x4TB) Gen5 NVMe RAID',
      moboName: 'ASUS Pro WS WRX90E-SAGE SE',
      psuName: '1600W 80+ Titanium PSU',
      caseName: 'Corsair Obsidian 1000D'
    }
  ];

  return tiers.map(tier => {
    const reasoningParts = [
      `**AI Agent Analysis:** This build is optimized for ${p} with a budget of ${formatCurrency(req.budget, req.currency)}.`,
      '',
      `**Decision-Making Process:**`,
    ];

    if (p === 'gaming') {
      reasoningParts.push(
        `• GPU Priority: Allocated ~40-50% of budget to the GPU for maximum frame rates at ${req.preferredResolution}.`,
        `• CPU Selection: Chose ${tier.cpuName} for excellent gaming single-thread performance.`,
        `• The ${tier.gpuName} delivers strong ${req.preferredResolution} gaming performance across modern titles.`
      );
    } else if (p === 'streaming') {
      reasoningParts.push(
        `• Balanced CPU/GPU: Both receive ~35% of budget for smooth streaming + gaming.`,
        `• ${tier.cpuName} handles encoding while ${tier.gpuName} maintains high frame rates.`,
        `• 16-32GB RAM ensures smooth multitasking between OBS and games.`
      );
    } else if (p === 'video-editing') {
      reasoningParts.push(
        `• CPU Priority: Allocated ~30-40% to CPU for fast render times.`,
        `• RAM Priority: ${tier.ramName} for handling large project files.`,
        `• ${tier.storageName} provides fast read/write for video assets.`
      );
    } else if (p === 'productivity') {
      reasoningParts.push(
        `• CPU & RAM Focus: Prioritized multi-threaded performance and memory.`,
        `• ${tier.cpuName} excels at compilation, virtualization, and productivity tasks.`,
        `• GPU kept at a reasonable level for display output and light acceleration.`
      );
    } else {
      reasoningParts.push(
        `• Budget-Conscious: Selected reliable, value-oriented components.`,
        `• ${tier.cpuName} offers excellent performance per dollar for school workloads.`,
        `• Sufficient GPU for light gaming and accelerated tasks.`
      );
    }

    if (req.upgradeability) {
      reasoningParts.push('', `**Upgradeability:** Selected AM5/LGA1700 platform for future CPU upgrade paths.`);
    }
    if (req.rgbPreference) {
      reasoningParts.push(`**Aesthetics:** Included RGB-capable case for visual appeal.`);
    }

    return {
      cpu: { name: tier.cpuName, reason: 'Balanced performance for your budget and use case' },
      gpu: { name: tier.gpuName, reason: `Optimized for ${p} at ${req.preferredResolution}` },
      ram: { name: tier.ramName, reason: 'Sufficient capacity for multitasking' },
      storage: { name: tier.storageName, reason: 'Fast NVMe storage for OS and applications' },
      motherboard: { name: tier.moboName, reason: 'Compatible with selected CPU, good VRM' },
      psu: { name: tier.psuName, reason: 'Safe wattage headroom for all components' },
      case: { name: tier.caseName, reason: 'Good airflow and build quality' },
      totalCost: 0,
      gamesFPS: games.map((game) => ({ game, resolution: req.preferredResolution, estimatedFPS: estimateFPS(tier.gpuName, req.preferredResolution, game) })),
      reasoning: reasoningParts.join('\n'),
      upgradeSuggestions: [
        `Upgrade GPU to a higher tier for better ${req.preferredResolution} performance`,
        'Add more RAM if multitasking or content creation demands increase',
        'Expand storage with an additional NVMe or SATA SSD',
        req.upgradeability ? 'Platform supports next-gen CPU drop-in upgrades' : 'Consider a platform upgrade for next-gen CPU support',
      ],
    };
  });
}

// ─── POST Handler ───────────────────────────────────────────

export async function POST(request: NextRequest) {
  let buildRequest: BuildRequest;

  try {
    buildRequest = await request.json();
  } catch (err) {
    console.error('Failed to parse request body:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  // Validate budget using currency-aware limits
  const currency = buildRequest.currency || 'USD';
  const limits = getBudgetLimits(currency);
  if (!buildRequest.budget || buildRequest.budget < limits.min || buildRequest.budget > limits.max) {
    const minDisplay = formatCurrency(limits.min, currency);
    const maxDisplay = formatCurrency(limits.max, currency);
    return NextResponse.json(
      { error: `Budget must be between ${minDisplay} and ${maxDisplay}` },
      { status: 400 }
    );
  }

  // Try Gemini AI first
  const useGemini = process.env.GEMINI_API_KEY;

  if (useGemini) {
    try {
      const prompt = generateBuildPrompt(buildRequest);
      const response = await callGeminiAPI(prompt);

      if (response) {
        // Parse JSON from response (Gemini might include markdown code blocks)
        const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/) || response.match(/```\n([\s\S]*?)\n```/) || response.match(/({[\s\S]*})/);
        const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : response;

        try {
          const aiResponse: any = JSON.parse(jsonStr);
          const build = buildFromAIResponse(aiResponse, buildRequest);
          
          if (build.totalCost <= buildRequest.budget) {
            return NextResponse.json({ build, explanation: aiResponse.reasoning } as AIResponse);
          } else {
            console.warn(`Gemini build over budget: ${build.totalCost} > ${buildRequest.budget}`);
            // Fall through to fallback
          }
        } catch (parseErr) {
          console.error('Failed to parse Gemini JSON response:', parseErr);
          // Fall through to fallback
        }
      }
    } catch (err: any) {
      const errorMsg = err?.message || 'Unknown error';
      console.warn('Gemini API call failed, using fallback logic:', errorMsg);
      // Fall through to use fallback logic
    }
  }

  // Fallback: use local AI logic
  try {
    const fallbackTiers = getFallbackTiers(buildRequest);
    
    let bestBuild = null;
    let bestExplanation = '';

    // Iterate from most expensive to cheapest
    for (let i = fallbackTiers.length - 1; i >= 0; i--) {
      const tier = fallbackTiers[i];
      const build = buildFromAIResponse(tier, buildRequest);
      
      if (build.totalCost <= buildRequest.budget) {
        bestBuild = build;
        bestExplanation = tier.reasoning;
        break;
      }
    }
    
    // If no build fits (e.g. extremely low budget), use the absolute cheapest one
    if (!bestBuild) {
      const cheapestTier = fallbackTiers[0];
      bestBuild = buildFromAIResponse(cheapestTier, buildRequest);
      bestExplanation = cheapestTier.reasoning;
    }

    return NextResponse.json({
      build: bestBuild,
      explanation: bestExplanation,
    } as AIResponse);
  } catch (err) {
    console.error('Fallback build generation failed:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Failed to generate build recommendation' }, { status: 500 });
  }
}
