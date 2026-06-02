# AI PC Build Recommender Agent

> **ANLYTC4 Final Project** — Agentic AI Systems

An intelligent full-stack web application that acts as an AI agent to generate custom, optimized PC build recommendations. The agent reasons about your budget, use case, preferred games, and preferences to autonomously select 7 compatible components with detailed justification.

---

## What It Does

You tell the agent your budget, what you'll use the PC for, and your preferences. It reasons through component trade-offs and returns a complete build with:

- A full 7-part component list (CPU, GPU, RAM, Storage, Motherboard, PSU, Case)
- Per-component reasoning explaining each selection
- Estimated FPS for your preferred games at your chosen resolution
- A budget breakdown by component category
- Upgrade path suggestions

---

## AI Agent Architecture

```
User Input (Budget · Purpose · Games · Resolution · Preferences)
        │
        ▼
  /api/recommend  ──── generates structured prompt ────►  Google Gemini 1.5 Flash
        │                                                         │
        │                   (JSON response)◄──────────────────────
        │
        ▼
   Component Matching  (maps AI-named parts → database entries)
        │
        ▼
   Budget Analysis  (cost totals · category breakdown · currency conversion)
        │
        ▼
   FPS Estimation  (GPU tier benchmarks · resolution scaling)
        │
        ▼
   Results Display  (components · reasoning · FPS · upgrade path)
```

**Fallback:** If Gemini is unavailable, a deterministic rule-based engine (`generateFallbackResponse`) handles the request using budget-tier decision trees and use-case priority logic — ensuring reliable output under all conditions.

### Agentic Capabilities Demonstrated

| Capability | How It's Implemented |
|---|---|
| Goal-oriented task completion | Entire build optimized toward user's primary purpose |
| Multi-step reasoning | Budget → purpose → compatibility → selection → estimation |
| Tool usage (external API) | Google Gemini AI via REST API |
| Decision-making rules | Rule-based fallback with 8 budget tiers × 5 use cases |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, React 18, TypeScript |
| Styling | TailwindCSS, Custom CSS animations |
| Backend | Next.js API Routes (Node.js serverless) |
| AI Engine | Google Gemini 1.5 Flash |
| Component Data | Static TypeScript database (30+ parts) |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18.17+
- A [Google Gemini API key](https://aistudio.google.com/app/apikey) (free tier works)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/your-username/ai-pc-build-recommender.git
cd ai-pc-build-recommender

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.local.example .env.local
```

Open `.env.local` and add your key:

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

---

## Project Structure

```
ai-pc-build-recommender/
├── app/
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Home page (hero, architecture, how-it-works)
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

---

## Key Files Explained

### `app/api/recommend/route.ts`
The brain of the agent. Handles the POST request, builds the Gemini prompt, parses the AI response, falls back to rule-based logic on failure, matches component names to database entries, and assembles the final recommendation object.

### `lib/utils.ts → generateBuildPrompt()`
Constructs the structured prompt sent to Gemini. Includes the full component database, user requirements, and an explicit JSON schema the AI must follow.

### `lib/components-database.ts`
Curated database of 30+ components across 7 categories (CPU, GPU, RAM, Storage, Motherboard, PSU, Case). Includes pricing, performance ratings, TDP, and compatibility data.

### `lib/utils.ts → generateFallbackResponse()`
Rule-based fallback agent. Maps budget tiers to component selections per use case (8 budget tiers × 5 purposes). Activates automatically when Gemini is unavailable.

---

## Usage Examples

### Gaming Build, 1080p, ₱30,000
Input: Budget ₱30,000 · Purpose: Gaming · Resolution: 1080p · Valorant, Fortnite

Output: AMD Ryzen 5 5600X + RX 7600 + 16GB DDR4 + reasoning prioritizing GPU at ~40% of budget

### Video Editing Build, $2,500
Input: Budget $2,500 · Purpose: Video Editing · Resolution: 4K

Output: Ryzen 9 7950X + 64GB DDR5 + 4TB NVMe + reasoning prioritizing CPU and RAM for render performance

---

## Supported Build Purposes

| Purpose | Component Priority |
|---|---|
| Gaming | GPU → CPU → RAM |
| Streaming | CPU = GPU → RAM |
| Video Editing | CPU → RAM → Storage → GPU |
| Productivity | CPU → RAM → GPU |
| School | Budget-balanced, value-oriented |

---

## Currency Support

The agent supports both **USD ($)** and **PHP (₱)**. Internal component prices are stored in USD; PHP builds apply a fixed conversion rate and use adjusted budget validation limits.

---

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Set `GEMINI_API_KEY` in your Vercel project environment variables.

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## Limitations

- Component prices are static and do not reflect live market rates.
- FPS estimates are tier-based approximations, not measured benchmarks.
- No persistent user memory between sessions.
- Component database covers ~30 entries; builds requiring unlisted parts will match the closest available option.

---

## Responsible AI Notes

This agent influences purchasing decisions. Users should:
- Cross-verify recommended components on PCPartPicker, Lazada, or Shopee before buying.
- Treat FPS estimates as approximations only.
- Not enter personal financial information into the form — only a budget number is needed.

See the full **Responsible AI Reflection** in the project report.

---

## License

Created for educational purposes as part of the ANLYTC4 Agentic AI Systems final project.
