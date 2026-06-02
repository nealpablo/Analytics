# AI PC Build Recommender Agent

> **ANLYTC4 Final Project** — Building Your Own AI Agent (Agentic AI System)

---

## 1. Introduction

The **AI PC Build Recommender Agent** is an intelligent, full-stack web application that autonomously generates custom, optimized PC build recommendations. Given a user's budget, intended purpose, preferred games, and other preferences, the agent reasons through component trade-offs and returns a complete 7-part PC build — including per-component justification, estimated performance metrics, budget analysis, and upgrade suggestions.

This project was built to demonstrate the design, implementation, and evaluation of an AI agent that can perceive user input, reason about it using an LLM, and perform goal-oriented actions toward a defined objective.

---

## 2. Problem Statement

**Pain Point:** Building a custom PC is overwhelming. Users must choose from hundreds of components across 7+ categories, each with compatibility constraints, performance trade-offs, and budget implications. Mismatches (e.g., a CPU bottlenecking a GPU, or a PSU that can't handle the system's TDP) lead to wasted money and poor performance.

**Solution:** This agent eliminates the guesswork. It takes a simple set of requirements and produces an optimized, compatible build with detailed reasoning — the way an expert PC builder would.

---

## 3. Agent Definition

| Attribute | Description |
|---|---|
| **Goal / Objective** | Generate an optimal, budget-compliant PC build with 7 compatible components, performance estimates, and actionable reasoning |
| **Target Users** | Students, gamers, content creators, and professionals looking to build a custom PC without deep hardware expertise |
| **Scope of Tasks** | Accept user requirements → Reason about component trade-offs → Select 7 components → Estimate performance → Provide upgrade paths |

---

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

```
User → NLP/LLM Processing (Gemini) → Decision Logic → Component Database (Tool) → Response
```

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

---

## 5. Implementation

### Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, React 18, TypeScript |
| Styling | TailwindCSS, Custom CSS animations |
| Backend | Next.js API Routes (Node.js serverless) |
| AI Engine | Google Gemini 1.5 Flash (via REST API) |
| Component Data | Static TypeScript database (30+ parts with USD/PHP pricing) |
| Deployment | Vercel-ready |

### Libraries Used

| Library | Purpose |
|---|---|
| `next` (v14) | Full-stack React framework with API routes |
| `react` / `react-dom` (v18) | UI rendering |
| `typescript` (v5) | Type safety across the entire codebase |
| `tailwindcss` (v3.4) | Utility-first CSS framework |
| `openai` (v4) | OpenAI SDK (available as alternative LLM provider) |

### Minimum Features Checklist

| Feature | Implementation |
|---|---|
| ✅ Accepts user input | `BuildForm.tsx` — budget, purpose, games, resolution, RGB, upgradeability |
| ✅ Processes the request | `route.ts` — validates input, generates prompt, calls Gemini API |
| ✅ Generates intelligent output | Returns 7-component build with per-component reasoning |
| ✅ Performs automated decision/action | Autonomously allocates budget, selects components, estimates FPS, and generates upgrade paths — no human intervention between steps |

### Project Structure

```
Analytics/
├── app/
│   ├── layout.tsx                  # Root layout with metadata
│   ├── page.tsx                    # Landing page (hero, architecture, how-it-works)
│   ├── builder/
│   │   └── page.tsx                # PC builder form page
│   ├── results/
│   │   └── page.tsx                # Results display page
│   └── api/
│       └── recommend/
│           └── route.ts            # Core agent logic (Gemini + fallback)
├── components/
│   ├── Header.tsx                  # Navigation header
│   ├── Footer.tsx                  # Footer
│   ├── BuildForm.tsx               # User input form with validation
│   ├── ResultsDisplay.tsx          # Build results with components, FPS, reasoning
│   ├── ArchitectureSection.tsx     # Visual pipeline diagram on homepage
│   └── LoadingAnimation.tsx        # Loading spinner during AI processing
├── lib/
│   ├── types.ts                    # TypeScript interfaces (BuildRequest, BuildRecommendation, etc.)
│   ├── utils.ts                    # generateBuildPrompt(), estimateFPS(), currency helpers
│   └── components-database.ts     # 30+ real-world PC components with pricing & specs
├── styles/
│   └── globals.css                 # Global styles and animations
├── .env.local                      # Environment variables (not committed)
├── tailwind.config.ts              # TailwindCSS configuration
├── package.json                    # Dependencies
└── README.md
```

### Key Files Explained

- **`app/api/recommend/route.ts`** — The brain of the agent. Handles the POST request, builds the Gemini prompt, parses the AI response, falls back to rule-based logic on failure, matches component names to database entries, and assembles the final recommendation.
- **`lib/utils.ts → generateBuildPrompt()`** — Constructs the structured prompt sent to Gemini. Includes the full component database, user requirements, and an explicit JSON schema the AI must follow.
- **`lib/components-database.ts`** — Curated database of 30+ components across 7 categories (CPU, GPU, RAM, Storage, Motherboard, PSU, Case) with pricing in USD and PHP, performance ratings, TDP, and compatibility data.
- **`lib/utils.ts → generateFallbackResponse()`** — Rule-based fallback engine. Maps budget tiers to component selections per use case (8 tiers × 5 purposes). Activates automatically when Gemini is unavailable.

---

## 6. Agent Behavior (Agentic Features)

This agent demonstrates the following agentic capabilities:

### ✅ Goal-Oriented Task Completion
The entire pipeline is driven by a single goal: produce the best possible PC build within the user's budget and purpose. Every component selection is evaluated against this objective.

### ✅ Multi-Step Reasoning
The agent follows a structured reasoning chain:
1. **Parse** user requirements (budget, purpose, resolution, games)
2. **Allocate** budget across 7 categories based on purpose-specific priorities (e.g., 40–50% GPU for gaming, 30–40% CPU for video editing)
3. **Select** individual components considering compatibility, performance, and price
4. **Validate** total cost does not exceed budget; if it does, iterate
5. **Estimate** performance (FPS per game, workload metrics)
6. **Suggest** upgrade paths for future improvements

This is a Chain-of-Thought (CoT) prompting strategy — the prompt explicitly instructs Gemini to reason through trade-offs before outputting its recommendation.

### ✅ Tool Usage (External API Call)
The agent connects to the **Google Gemini 1.5 Flash API** as its external reasoning tool. The prompt includes:
- The full component catalog with prices and specs
- User constraints (budget, purpose, resolution)
- A strict JSON output schema
- Priority allocation rules per use case

### ✅ Decision-Making Rules
When the LLM is unavailable, the agent autonomously switches to a **rule-based fallback engine** (`getFallbackTiers`) that uses:
- 8 predefined budget tiers
- 5 purpose-specific component priority rules
- Compatibility-aware selection logic

This ensures the agent **always produces a result**, regardless of external API availability.

### ✅ Autonomy (Multi-Step Without Human Intervention)
Once the user submits their requirements, the agent autonomously:
1. Validates the input
2. Generates the LLM prompt
3. Calls the Gemini API
4. Parses and validates the response
5. Falls back to rule-based logic if needed
6. Matches component names to the database
7. Calculates costs and FPS estimates
8. Returns the complete recommendation

**No human intervention is required between any of these steps.**

### Summary Table

| Agentic Capability | How It's Implemented |
|---|---|
| Goal-oriented task completion | Entire build optimized toward user's primary purpose and budget |
| Multi-step reasoning (CoT) | Budget → purpose priority → compatibility → selection → estimation → suggestions |
| Tool usage (external API) | Google Gemini 1.5 Flash via REST API |
| Decision-making rules | Rule-based fallback with 8 budget tiers × 5 use cases |
| Autonomy | 8-step pipeline executes end-to-end without human intervention |

---

## 7. Testing and Evaluation

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

- **Static pricing:** Component prices are hardcoded and do not reflect live market rates. Users should verify prices on PCPartPicker, Lazada, or Shopee.
- **FPS estimates are approximations:** Based on GPU-tier baselines and game-difficulty multipliers, not actual measured benchmarks.
- **No persistent memory:** The agent does not retain context between sessions. Each build request is independent.
- **Limited component catalog:** ~30 entries across 7 categories. Builds requiring unlisted parts will match the closest available option.
- **Gemini response parsing:** If the LLM returns malformed JSON, the agent falls back to rule-based logic rather than retrying.

---

## 8. Responsible AI Reflection

### Ethical Risks
This agent directly influences **purchasing decisions** that involve real money. A poor recommendation could lead to wasted spending on incompatible or underperforming hardware. The agent mitigates this by validating component compatibility, enforcing budget constraints, and providing transparent per-component reasoning — but it is not a substitute for professional advice on high-budget builds.

### Bias and Misinformation Risks
The component database is manually curated and inherently reflects the author's selection. Some brands or components may be overrepresented (e.g., AMD Ryzen, NVIDIA RTX) while others are absent. FPS estimates are based on generalized benchmarks and may not match real-world performance in all scenarios, which could mislead users into expecting specific frame rates. The agent addresses this by clearly labeling FPS values as "estimated."

### Transparency
The agent provides full transparency into its decision-making. Every component selection includes a `reason` field explaining why it was chosen. The overall `reasoning` section describes the budget allocation strategy, priority trade-offs, and any constraints that shaped the build. Users can see exactly how their budget was distributed across categories via the budget breakdown visualization.

When the Gemini API is unavailable, the agent does **not** pretend to use AI — the fallback logic produces its own reasoning that reflects the rule-based approach used.

### Safe Interaction Guidelines
Users should:
- **Cross-verify** recommended components on PCPartPicker, Lazada, or Shopee before purchasing.
- **Treat FPS estimates as approximations**, not guarantees of real-world performance.
- **Not enter personal financial information** — the form only requires a budget number.
- **Understand that prices are static** and may differ significantly from current market rates.
- **Use the upgrade suggestions** as starting points for future research, not definitive instructions.

The agent does not collect, store, or transmit any personal data. All processing happens server-side within the API route, and no user data is persisted between sessions.

---

## 9. Setup Instructions

### Prerequisites

- **Node.js** 18.17 or higher
- A [Google Gemini API key](https://aistudio.google.com/app/apikey) (free tier works)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/nealpablo/Analytics.git
cd Analytics

# 2. Install dependencies
npm install

# 3. Set up environment variables
# Create a .env.local file with your Gemini API key:
```

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

```bash
# 4. Start the development server
npm run dev

# 5. Open in browser
# http://localhost:3000
```

> **Note:** If `GEMINI_API_KEY` is not set, the agent automatically falls back to the rule-based recommendation engine. The app still works — you just won't get Gemini AI reasoning.

### Deployment (Vercel)

```bash
npm install -g vercel
vercel
```

Set `GEMINI_API_KEY` in your Vercel project environment variables.

---

## 10. Usage Examples

### Example 1: Gaming Build — ₱30,000, 1080p

**Input:** Budget ₱30,000 · Purpose: Gaming · Resolution: 1080p · Games: Valorant, Fortnite

**Agent Output:** AMD Ryzen 5 5600X + RX 7600 + 16GB DDR4 + 500GB NVMe — reasoning prioritizes GPU at ~40% of budget for maximum frame rates.

### Example 2: Video Editing Workstation — $2,500, 4K

**Input:** Budget $2,500 · Purpose: Video Editing · Resolution: 4K

**Agent Output:** Ryzen 9 7950X + 64GB DDR5 + 4TB NVMe + RTX 4060 — reasoning prioritizes CPU and RAM for render performance, with GPU as secondary for timeline acceleration.

### Example 3: School Build — ₱15,000, 1080p

**Input:** Budget ₱15,000 · Purpose: School · Resolution: 1080p

**Agent Output:** AMD Athlon 3000G + Integrated Graphics + 8GB DDR4 + 128GB SSD — budget-conscious selection prioritizing reliability for everyday school tasks.

---

## 11. Supported Build Purposes

| Purpose | Component Priority | Budget Allocation Strategy |
|---|---|---|
| Gaming | GPU → CPU → RAM | 40–50% GPU, 20–25% CPU |
| Streaming | CPU = GPU → RAM | 35% CPU, 35% GPU, balanced |
| Video Editing | CPU → RAM → Storage → GPU | 30–40% CPU, 20–30% RAM |
| Productivity | CPU → RAM → GPU | CPU and RAM focus |
| School | Budget-balanced | Value-oriented, reliable components |

---

## 12. Currency Support

The agent supports both **USD ($)** and **PHP (₱)**. Internal component prices are stored in both currencies. PHP builds use adjusted budget validation limits (₱10,000 – ₱2,000,000 vs $200 – $40,000 for USD).

---

## 13. Conclusion

The AI PC Build Recommender Agent demonstrates a complete agentic AI system that perceives user input, reasons through complex hardware trade-offs using an LLM (Google Gemini), makes autonomous decisions across multiple steps, and produces actionable output — all without human intervention between steps. The rule-based fallback ensures reliability, and the transparent reasoning gives users confidence in the recommendations.

---

## License

Created for educational purposes as part of the **ANLYTC4 Agentic AI Systems** final project.
