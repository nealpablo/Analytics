# ANLYTC4 Final Project Report: AI PC Build Recommender Agent

## 1. Introduction
The **AI PC Build Recommender Agent** is an intelligent, full-stack web application that autonomously generates custom, optimized PC build recommendations. Given a user's budget, intended purpose, preferred games, and other preferences, the agent reasons through component trade-offs and returns a complete 7-part PC build — including per-component justification, estimated performance metrics, budget analysis, and upgrade suggestions.

This project was built to demonstrate the design, implementation, and evaluation of an AI agent that can perceive user input, reason about it using an LLM, and perform goal-oriented actions toward a defined objective.

## 2. Problem Statement
**Pain Point:** Building a custom PC is overwhelming. Users must choose from hundreds of components across 7+ categories, each with compatibility constraints, performance trade-offs, and budget implications. Mismatches (e.g., a CPU bottlenecking a GPU, or a PSU that can't handle the system's TDP) lead to wasted money and poor performance.

**Solution:** This agent eliminates the guesswork. It takes a simple set of requirements and produces an optimized, compatible build with detailed reasoning — the way an expert PC builder would.

## 3. Agent Design
| Attribute | Description |
|---|---|
| **Goal / Objective** | Generate an optimal, budget-compliant PC build with 7 compatible components, performance estimates, and actionable reasoning |
| **Target Users** | Students, gamers, content creators, and professionals looking to build a custom PC without deep hardware expertise |
| **Scope of Tasks** | Accept user requirements → Reason about component trade-offs → Select 7 components → Estimate performance → Provide upgrade paths |

## 4. System Architecture

### Architecture Diagram
```
User Input (Budget · Purpose · Games · Resolution · Preferences)
        │
        ▼
  ┌─────────────────────────────────────────────────────────────┐
  │                    INPUT / PERCEPTION                       │
  │  BuildForm.tsx collects and validates user requirements     │
  │  Constructs a BuildRequest object                          │
  └─────────────────┬───────────────────────────────────────────┘
                    │
                    ▼
  ┌─────────────────────────────────────────────────────────────┐
  │                 REASONING / PROCESSING                      │
  │                                                             │
  │  1. generateBuildPrompt() constructs a structured prompt    │
  │     with the full component database, user constraints,     │
  │     and a strict JSON output schema                         │
  │                                                             │
  │  2. Google Gemini 1.5 Flash (LLM) reasons about:           │
  │     • Budget allocation across 7 categories                 │
  │     • Component compatibility (AM4/AM5/LGA, DDR4/DDR5)      │
  │     • Use-case-specific priority (GPU for gaming,           │
  │       CPU+RAM for video editing, etc.)                      │
  │     • Performance-per-dollar optimization                   │
  │                                                             │
  │  3. Fallback Decision Logic: If Gemini is unavailable,      │
  │     a rule-based engine (8 budget tiers × 5 use cases)      │
  │     handles the request deterministically                   │
  └─────────────────┬───────────────────────────────────────────┘
                    │
                    ▼
  ┌─────────────────────────────────────────────────────────────┐
  │                    ACTION / OUTPUT                           │
  │                                                             │
  │  • Component Matching: Maps AI-named parts → database       │
  │  • Budget Analysis: Cost totals, category breakdown (%)     │
  │  • FPS Estimation: GPU-tier benchmarks × resolution scaling │
  │  • Workload Metrics: OBS encoding, render speed, etc.       │
  │  • Upgrade Suggestions: Future improvement paths            │
  │                                                             │
  │  Final output: BuildRecommendation object displayed in UI   │
  └─────────────────────────────────────────────────────────────┘
```

**Simplified Flow:**
User → NLP/LLM Processing (Gemini) → Decision Logic → Component Database (Tool) → Response

### Architecture Components
| Layer | Component | Role |
|---|---|---|
| **Input / Perception** | `BuildForm.tsx` | Collects budget, purpose, games, resolution, RGB, and upgradeability preferences with validation |
| **Input / Perception** | `lib/types.ts` | Defines `BuildRequest` interface with typed constraints |
| **Reasoning / Processing** | `lib/utils.ts → generateBuildPrompt()` | Constructs a structured prompt including the full component catalog, budget constraints, and JSON output schema |
| **Reasoning / Processing** | Google Gemini 1.5 Flash API | LLM that performs multi-step reasoning about component selection |
| **Reasoning / Processing** | `route.ts → getFallbackTiers()` | Rule-based fallback with 8 budget tiers × 5 purposes |
| **Action / Output** | `lib/components-database.ts` | Static database of 30+ real-world components with pricing and specs |
| **Action / Output** | `route.ts → buildFromAIResponse()` | Matches AI selections to database, calculates costs, estimates FPS |
| **Action / Output** | `ResultsDisplay.tsx` | Renders the complete build with reasoning, FPS charts, and budget breakdown |

## 5. Implementation
### Tech Stack
| Layer | Technology |
|---|---|
| Frontend | Next.js 14, React 18, TypeScript |
| Styling | TailwindCSS, Custom CSS animations |
| Backend | Next.js API Routes (Node.js serverless) |
| AI Engine | Google Gemini 1.5 Flash (via REST API) |
| Component Data | Static TypeScript database (30+ parts with USD/PHP pricing) |

### Minimum Features Checklist
- ✅ **Accepts user input**: `BuildForm.tsx` collects budget, purpose, games, resolution, RGB, upgradeability.
- ✅ **Processes the request**: `route.ts` validates input, generates prompt, calls Gemini API.
- ✅ **Generates intelligent output**: Returns a 7-component build with per-component reasoning.
- ✅ **Performs automated decision/action**: Autonomously allocates budget, selects components, estimates FPS, and generates upgrade paths — no human intervention between steps.

### Agent Behavior (Agentic Features)
This agent demonstrates the following agentic capabilities:

1. **Goal-Oriented Task Completion**: The entire pipeline is driven by a single goal: produce the best possible PC build within the user's budget and purpose. Every component selection is evaluated against this objective.
2. **Multi-Step Reasoning (Chain-of-Thought)**: The agent follows a structured reasoning chain: Parse user requirements → Allocate budget across 7 categories based on purpose-specific priorities → Select individual components considering compatibility, performance, and price → Validate total cost does not exceed budget → Estimate performance → Suggest upgrade paths.
3. **Tool Usage (External API Call)**: The agent connects to the **Google Gemini 1.5 Flash API** as its external reasoning tool.
4. **Decision-Making Rules**: When the LLM is unavailable, the agent autonomously switches to a **rule-based fallback engine** that uses 8 predefined budget tiers, 5 purpose-specific component priority rules, and compatibility-aware selection logic.
5. **Autonomy**: Once the user submits their requirements, the 8-step pipeline executes end-to-end without human intervention.

## 6. Testing and Evaluation

### Test Scenarios

| # | Test Case | Input | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| 1 | Budget gaming build (PHP) | ₱30,000 · Gaming · 1080p · Valorant, Fortnite | Budget-tier GPU (RX 7600 or GTX 1650), total ≤ ₱30,000 | Selected RX 7600 + Ryzen 5 5600X, total within budget | ✅ Pass |
| 2 | Mid-range gaming (USD) | $1,200 · Gaming · 1440p · Cyberpunk, GTA V | RTX 4060/4070 tier GPU, ~40–50% GPU allocation | Selected RTX 4070 with 42% GPU allocation | ✅ Pass |
| 3 | Video editing workstation | $2,500 · Video Editing · 4K | CPU+RAM priority (Ryzen 9 / 32–64GB), large storage | Ryzen 9 7950X + 64GB DDR5 + 4TB NVMe | ✅ Pass |
| 4 | School build (lowest budget) | ₱15,000 · School · 1080p | Cheapest viable components, integrated or low-end GPU | AMD Athlon 3000G + integrated graphics, within budget | ✅ Pass |
| 5 | Streaming build | $1,500 · Streaming · 1080p · Apex Legends | Balanced CPU/GPU (~35% each), NVENC-capable GPU | RTX 4060 (NVENC) + Ryzen 5 7600, balanced allocation | ✅ Pass |
| 6 | Maximum budget build | $40,000 · Gaming · 4K | Top-tier components (RTX 4090 / Threadripper) | Threadripper PRO + dual RTX 6000 Ada | ✅ Pass |
| 7 | Minimum budget (USD) | $200 · School · 1080p | Cheapest possible build, integrated graphics | AMD Athlon 3000G + integrated, total near $200 | ✅ Pass |
| 8 | Gemini API unavailable | Any valid input, no API key | Graceful fallback to rule-based engine, still produces build | Fallback activates, returns valid recommendation | ✅ Pass |
| 9 | Invalid budget (below min) | ₱5,000 · Gaming · 1080p | Error: "Budget must be between ₱10,000 and ₱2,000,000" | Returns 400 error with correct message | ✅ Pass |
| 10 | RGB and upgradeability flags | $1,000 · Gaming · 1080p · RGB: Yes, Upgrade: Yes | RGB case selected, AM5/LGA1700 platform mentioned in reasoning | Corsair 5000T RGB selected, upgrade path noted | ✅ Pass |

### Identified Limitations
- **Static pricing:** Component prices are hardcoded and do not reflect live market rates.
- **FPS estimates are approximations:** Based on GPU-tier baselines and game-difficulty multipliers, not actual measured benchmarks.
- **No persistent memory:** The agent does not retain context between sessions. Each build request is independent.
- **Limited component catalog:** ~30 entries across 7 categories.

## 7. Responsible AI Reflection

**Ethical Risks**
This agent directly influences purchasing decisions that involve real money. A poor recommendation could lead to wasted spending on incompatible or underperforming hardware. The agent mitigates this by validating component compatibility, enforcing budget constraints, and providing transparent per-component reasoning — but it is not a substitute for professional advice on high-budget builds.

**Bias and Misinformation Risks**
The component database is manually curated and inherently reflects the author's selection. Some brands or components may be overrepresented (e.g., AMD Ryzen, NVIDIA RTX) while others are absent. FPS estimates are based on generalized benchmarks and may not match real-world performance in all scenarios, which could mislead users into expecting specific frame rates. The agent addresses this by clearly labeling FPS values as "estimated."

**Transparency**
The agent provides full transparency into its decision-making. Every component selection includes a `reason` field explaining why it was chosen. The overall `reasoning` section describes the budget allocation strategy, priority trade-offs, and any constraints that shaped the build. Users can see exactly how their budget was distributed across categories via the budget breakdown visualization. When the Gemini API is unavailable, the agent does not pretend to use AI — the fallback logic produces its own reasoning that reflects the rule-based approach used.

**Safe Interaction Guidelines**
Users should:
- Cross-verify recommended components on PCPartPicker, Lazada, or Shopee before purchasing.
- Treat FPS estimates as approximations, not guarantees of real-world performance.
- Not enter personal financial information — the form only requires a budget number.
- Understand that prices are static and may differ significantly from current market rates.

The agent does not collect, store, or transmit any personal data. All processing happens server-side within the API route, and no user data is persisted between sessions.

## 8. Conclusion
The AI PC Build Recommender Agent demonstrates a complete agentic AI system that perceives user input, reasons through complex hardware trade-offs using an LLM (Google Gemini), makes autonomous decisions across multiple steps, and produces actionable output — all without human intervention between steps. The rule-based fallback ensures reliability, and the transparent reasoning gives users confidence in the recommendations.
