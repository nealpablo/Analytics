# Copilot Instructions - AI PC Build Recommender Agent

This file provides workspace-specific guidance for working with the AI PC Build Recommender Agent project.

## Project Overview

This is a complete Next.js 14 full-stack application for an AI-powered PC build recommendation system. It's a college AI Agent final project demonstrating intelligent reasoning, decision-making, and goal-oriented planning.

## Project Setup Completed

The project has been fully scaffolded with:

- ✅ Next.js 14 application structure
- ✅ TypeScript configuration
- ✅ TailwindCSS styling setup
- ✅ Complete component library
- ✅ API integration with OpenAI
- ✅ Component database (mock data)
- ✅ Responsive gaming-themed UI
- ✅ All necessary pages and routes

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   - Copy `.env.example` to `.env.local`
   - Add your OpenAI API key

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open application**
   - Visit http://localhost:3000

## Project Structure

```
app/
  ├── page.tsx              (Home page - hero, features, architecture)
  ├── builder/page.tsx      (PC builder form page)
  ├── results/page.tsx      (Results display page)
  ├── api/recommend/        (OpenAI integration API)
  └── layout.tsx            (Root layout with metadata)

components/
  ├── Header.tsx            (Navigation)
  ├── Footer.tsx            (Footer)
  ├── BuildForm.tsx         (Configuration form)
  ├── ResultsDisplay.tsx    (Build results)
  ├── ArchitectureSection.tsx (AI agent explanation)
  └── LoadingAnimation.tsx  (Loading indicator)

lib/
  ├── types.ts              (TypeScript interfaces)
  ├── utils.ts              (Utility functions)
  └── components-database.ts (PC components data)

styles/
  └── globals.css           (Global styles & animations)
```

## Key Features Implemented

### AI Agent Capabilities
- Multi-step reasoning process
- Goal-oriented component selection
- Budget-aware decisions
- Performance estimation
- Intelligent trade-offs
- Upgrade path suggestions

### User Input
- Budget slider ($500-$20,000)
- Purpose selection (5 categories)
- Game preferences (up to 5 games)
- Resolution target (1080p, 1440p, 4K)
- Aesthetic and upgrade preferences

### PC Components Database
- 30+ components across 7 categories
- Mock pricing and specifications
- Compatibility verification
- Performance metrics

### UI/UX
- Dark gaming theme with neon accents
- Responsive mobile design
- Loading animations
- Smooth transitions
- Gradient effects

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React functional components
- Use TailwindCSS for styling
- Keep components modular and reusable

### Adding Features
1. Create component in `components/`
2. Add types to `lib/types.ts`
3. Import and use in pages
4. Test with `npm run dev`

### Modifying Components Database
Edit `lib/components-database.ts` to:
- Add new components
- Update pricing
- Change specifications
- Modify compatibility rules

### Updating AI Logic
The AI prompt is in `lib/utils.ts`:
- Modify `generateBuildPrompt()` for different reasoning
- Update FPS estimation in `estimateFPS()`
- Change decision rules as needed

## Environment Variables

Required:
```
OPENAI_API_KEY=your_key_here
```

The API supports:
- GPT-4 (best results, higher cost)
- GPT-3.5-turbo (good results, lower cost)

Currently configured for gpt-3.5-turbo in `app/api/recommend/route.ts`

## Testing the Application

### Manual Testing
1. Home page loads with features and architecture
2. Builder page accepts form input
3. Form submission sends to API
4. Results page displays build details
5. Print functionality works

### Test Scenarios
- Budget: $800 (budget gaming)
- Budget: $1500 (mid-range gaming)
- Budget: $3000 (high-end gaming)
- Purpose: Gaming, Streaming, Video Editing, etc.

## Common Tasks

### Modify UI Colors
- Update `tailwind.config.ts` for color scheme
- Modify `styles/globals.css` for animations
- Hex colors: Purple #9d4edd, Cyan #00d9ff, Pink #ff006e

### Change Component Prices
- Edit `lib/components-database.ts`
- Update COMPONENTS_DATABASE array
- Prices affect budget calculations automatically

### Add New Components
```typescript
{
  id: 'cpu-new',
  name: 'New CPU Model',
  category: 'cpu',
  price: 299,
  performance: 8,
  cores: 8,
  tdp: 105,
  compatibility: ['am5'],
}
```

### Modify AI Reasoning
Update the prompt in `generateBuildPrompt()` or adjust selection logic in `app/api/recommend/route.ts`

## Build & Deploy

### Local Build
```bash
npm run build
npm start
```

### Deployment Options
- **Vercel**: Recommended (built for Next.js)
- **Netlify**: Supports Next.js
- **Docker**: See README.md for Dockerfile
- **Traditional Server**: Node.js 18+

## Troubleshooting

### Port Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

### API Errors
- Check OPENAI_API_KEY in .env.local
- Verify API quota in OpenAI dashboard
- Check internet connection
- Review console logs for details

### Styling Issues
- Clear .next folder: `rm -rf .next`
- Rebuild: `npm run build`
- Clear browser cache

## AI Agent Demonstration Points

This project clearly demonstrates:

1. **Goal-Oriented Planning**: Builds optimized toward user's primary objective
2. **Intelligent Decision-Making**: Component selection based on constraints
3. **Multi-Step Reasoning**: Sequential analysis of requirements
4. **Adaptive Behavior**: Different recommendations for different purposes
5. **Performance Analysis**: FPS estimation and upgrade suggestions
6. **Constraint Satisfaction**: Compatible components within budget

## Next Steps / Extensions

Potential improvements:
- Add user authentication and save builds
- Implement real component pricing API
- Add component comparisons
- Create build compatibility checker
- Add real-time pricing from retailers
- Implement build sharing
- Add AI chat for follow-up questions
- Create mobile app version

## Support & Resources

- **Documentation**: See README.md
- **API Docs**: https://platform.openai.com/docs
- **Next.js Guide**: https://nextjs.org/docs
- **Component Code**: Located in `/components`
- **Types**: Defined in `/lib/types.ts`

---

**Last Updated**: 2024
**Status**: Complete & Ready for Production
**API**: OpenAI GPT-3.5-turbo / GPT-4
