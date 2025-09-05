// Trading Concepts Data
export const TRADING_CONCEPTS: Array<{
  conceptId: string;
  title: string;
  description: string;
  contentType: 'video' | 'infographic';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  category: string;
}> = [
  {
    conceptId: 'candlestick-basics',
    title: 'Candlestick Patterns',
    description: 'Learn to read candlestick charts and identify key patterns that signal market movements.',
    contentType: 'video',
    difficulty: 'beginner',
    estimatedTime: 3,
    category: 'Technical Analysis'
  },
  {
    conceptId: 'order-book',
    title: 'Understanding Order Books',
    description: 'Master the order book to see market depth and predict price movements.',
    contentType: 'infographic',
    difficulty: 'beginner',
    estimatedTime: 2,
    category: 'Market Structure'
  },
  {
    conceptId: 'support-resistance',
    title: 'Support & Resistance',
    description: 'Identify key price levels where assets tend to bounce or break through.',
    contentType: 'video',
    difficulty: 'intermediate',
    estimatedTime: 4,
    category: 'Technical Analysis'
  },
  {
    conceptId: 'risk-management',
    title: 'Risk Management',
    description: 'Learn position sizing, stop-losses, and how to protect your capital.',
    contentType: 'video',
    difficulty: 'intermediate',
    estimatedTime: 5,
    category: 'Risk Management'
  },
  {
    conceptId: 'market-psychology',
    title: 'Market Psychology',
    description: 'Understand fear, greed, and how emotions drive market movements.',
    contentType: 'infographic',
    difficulty: 'advanced',
    estimatedTime: 6,
    category: 'Psychology'
  }
];

// Mock Market Data
export const MOCK_MARKET_DATA = [
  {
    symbol: 'BTC/USD',
    price: 43250.00,
    change24h: 2.45,
    volume: 28500000000,
    high24h: 44100.00,
    low24h: 42800.00
  },
  {
    symbol: 'ETH/USD',
    price: 2650.00,
    change24h: -1.23,
    volume: 15200000000,
    high24h: 2720.00,
    low24h: 2580.00
  },
  {
    symbol: 'BASE/USD',
    price: 1.85,
    change24h: 5.67,
    volume: 850000000,
    high24h: 1.92,
    low24h: 1.74
  }
];

// Mock Chart Data
export const generateMockChartData = (days: number = 30) => {
  const data = [];
  let basePrice = 43000;
  
  for (let i = 0; i < days * 24; i++) {
    const time = new Date(Date.now() - (days * 24 - i) * 60 * 60 * 1000).toISOString();
    const volatility = (Math.random() - 0.5) * 0.02;
    const open = basePrice;
    const close = open * (1 + volatility);
    const high = Math.max(open, close) * (1 + Math.random() * 0.01);
    const low = Math.min(open, close) * (1 - Math.random() * 0.01);
    
    data.push({
      time,
      open,
      high,
      low,
      close,
      volume: Math.random() * 1000000
    });
    
    basePrice = close;
  }
  
  return data;
};

// Premium Features
export const PREMIUM_FEATURES = [
  {
    id: 'advanced-signals',
    name: 'Advanced Trading Signals',
    description: 'AI-powered signals with 85% accuracy rate',
    price: 0.001, // in ETH
    duration: '1 day'
  },
  {
    id: 'unlimited-simulation',
    name: 'Unlimited Simulations',
    description: 'Practice with unlimited virtual trades',
    price: 0.002,
    duration: '7 days'
  },
  {
    id: 'expert-feedback',
    name: 'Expert AI Feedback',
    description: 'Detailed analysis of your trading decisions',
    price: 0.0015,
    duration: '3 days'
  }
];

// App Configuration
export const APP_CONFIG = {
  name: 'FlashTrade',
  tagline: 'Master trading in minutes, profit in futures.',
  version: '1.0.0',
  maxFreeSimulations: 5,
  maxFreeConcepts: 3,
  simulationStartingBalance: 10000,
  supportedAssets: ['BTC/USD', 'ETH/USD', 'BASE/USD', 'SOL/USD', 'AVAX/USD']
};
