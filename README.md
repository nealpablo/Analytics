# AI PC Build Recommender

An intelligent full-stack web application that acts as an AI agent to generate custom, optimized PC build recommendations. The agent reasons about your budget, use case, preferred games, and preferences to autonomously select 7 compatible components with detailed justification.

Created for the ANLYTC4 Agentic AI Systems final project.

## Features

- **Full PC Build Generation**: Suggests CPU, GPU, RAM, Storage, Motherboard, PSU, and Case.
- **AI-Powered Reasoning**: Uses Google Gemini 1.5 Flash to explain why each component was chosen and how the budget was allocated.
- **Performance Estimation**: Provides estimated FPS for selected games and resolution.
- **Rule-Based Fallback**: A deterministic fallback engine ensures the app works even if the AI API is unavailable.
- **Currency Support**: Supports both USD ($) and PHP (₱).

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes (Node.js serverless)
- **AI Engine**: Google Gemini 1.5 Flash
- **Component Data**: Static TypeScript database with 30+ real-world PC parts

## Getting Started

### Prerequisites

- Node.js 18.17+
- A [Google Gemini API key](https://aistudio.google.com/app/apikey) (free tier works)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nealpablo/Analytics.git
   cd Analytics
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

> **Note:** If `GEMINI_API_KEY` is not set, the agent automatically falls back to the rule-based recommendation engine.

## Project Structure

```
Analytics/
├── app/                  # Next.js App Router (Pages, API routes)
├── components/           # React UI Components
├── lib/                  # Utilities, Types, Component Database
└── styles/               # Global CSS
```

## Documentation

For the detailed academic project report covering architecture, agentic features, evaluation, and responsible AI reflection, see the `Project Report.md` file included in this repository.

## License

Created for educational purposes.
