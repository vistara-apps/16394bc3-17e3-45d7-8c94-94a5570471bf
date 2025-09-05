# FlashTrade - Base MiniApp

Master trading in minutes, profit in futures. A comprehensive trading education platform built as a Base MiniApp.

## Features

### 🎓 Bite-sized Learning
- Interactive concept explainers covering essential trading topics
- Video and infographic content designed for quick comprehension
- Progress tracking and completion rewards

### 📈 Practice Simulation
- Risk-free trading environment with real-time feedback
- Multiple asset support (BTC, ETH, BASE, and more)
- AI-powered trade analysis and suggestions

### ⚡ Premium Signals (Coming Soon)
- Real-time trading alerts with 85% accuracy
- Customizable signal preferences
- Advanced market analysis

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via OnchainKit & MiniKit)
- **Styling**: Tailwind CSS with custom design system
- **Charts**: Recharts for trading visualizations
- **State**: React hooks with localStorage persistence
- **AI**: OpenAI integration for trade feedback

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   # Add your OnchainKit API key
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:3000`

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main application page
│   ├── providers.tsx      # MiniKit provider setup
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── AppShell.tsx       # Main app layout
│   ├── ConceptCard.tsx    # Learning concept cards
│   ├── TradingChart.tsx   # Interactive price charts
│   ├── TradeExecutionForm.tsx # Trade simulation form
│   └── FeedbackDisplay.tsx # AI feedback component
├── lib/                   # Utilities and types
│   ├── types.ts           # TypeScript definitions
│   ├── constants.ts       # App constants and mock data
│   └── utils.ts           # Helper functions
└── public/                # Static assets
```

## Key Components

### AppShell
Main application layout with navigation, wallet integration, and responsive design.

### ConceptCard
Interactive cards for trading concepts with progress tracking and difficulty indicators.

### TradingChart
Real-time price charts with multiple timeframes and chart types using Recharts.

### TradeExecutionForm
Comprehensive trading interface with market/limit orders and validation.

### FeedbackDisplay
AI-powered feedback system providing personalized trading insights.

## Design System

The app uses a custom design system with:
- **Colors**: Dark theme with purple/blue gradients and accent colors
- **Typography**: Inter font with semantic text sizes
- **Components**: Glass morphism cards with consistent spacing
- **Animations**: Smooth transitions and micro-interactions

## Base MiniApp Integration

- **MiniKitProvider**: Handles wallet connection and Base chain integration
- **OnchainKit Components**: Identity and wallet components for seamless UX
- **Frame Ready**: Proper MiniKit initialization for Farcaster integration

## Data Persistence

- **Local Storage**: User progress, completed concepts, and trade history
- **Mock Data**: Realistic market data and trading scenarios
- **State Management**: React hooks with TypeScript for type safety

## Future Enhancements

- [ ] Real-time market data integration
- [ ] Advanced charting with technical indicators
- [ ] Social features and leaderboards
- [ ] Mobile app version
- [ ] Multi-language support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

---

Built with ❤️ for the Base ecosystem
