// User Types
export interface User {
  userId: string;
  username: string;
  createdAt: Date;
  portfolioBalance: number;
  completedConcepts: string[];
  isPremium: boolean;
}

// Concept Types
export interface Concept {
  conceptId: string;
  title: string;
  description: string;
  contentType: 'video' | 'infographic';
  contentUrl: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
  category: string;
}

// Simulation Trade Types
export interface SimulationTrade {
  tradeId: string;
  userId: string;
  entryPrice: number;
  exitPrice?: number;
  asset: string;
  quantity: number;
  tradeType: 'buy' | 'sell';
  outcome?: 'profit' | 'loss' | 'break_even';
  feedback?: string;
  timestamp: Date;
  isActive: boolean;
  profitLoss?: number;
}

// Market Data Types
export interface MarketData {
  symbol: string;
  price: number;
  change24h: number;
  volume: number;
  high24h: number;
  low24h: number;
  timestamp: Date;
}

// Chart Data Types
export interface ChartDataPoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Signal Types
export interface TradingSignal {
  signalId: string;
  asset: string;
  type: 'buy' | 'sell';
  price: number;
  confidence: number;
  reason: string;
  timestamp: Date;
  isActive: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Component Props Types
export interface ConceptCardProps {
  concept: Concept;
  isCompleted: boolean;
  onSelect: (concept: Concept) => void;
  variant?: 'video' | 'infographic';
}

export interface TradingChartProps {
  data: ChartDataPoint[];
  variant?: 'simulated';
  height?: number;
}

export interface TradeExecutionFormProps {
  asset: string;
  currentPrice: number;
  onExecute: (trade: Partial<SimulationTrade>) => void;
  variant?: 'buy' | 'sell';
}

export interface FeedbackDisplayProps {
  feedback: string;
  outcome: 'profit' | 'loss' | 'break_even';
  variant?: 'positive' | 'negative' | 'neutral';
}

// App State Types
export interface AppState {
  user: User | null;
  currentConcept: Concept | null;
  activeTrades: SimulationTrade[];
  marketData: MarketData[];
  isLoading: boolean;
  error: string | null;
}
