import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Format currency values
export function formatCurrency(value: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// Format percentage values
export function formatPercentage(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

// Format large numbers
export function formatNumber(value: number): string {
  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(1)}B`;
  }
  if (value >= 1e6) {
    return `${(value / 1e6).toFixed(1)}M`;
  }
  if (value >= 1e3) {
    return `${(value / 1e3).toFixed(1)}K`;
  }
  return value.toFixed(2);
}

// Calculate profit/loss
export function calculateProfitLoss(
  entryPrice: number,
  exitPrice: number,
  quantity: number,
  tradeType: 'buy' | 'sell'
): { profitLoss: number; percentage: number } {
  let profitLoss: number;
  
  if (tradeType === 'buy') {
    profitLoss = (exitPrice - entryPrice) * quantity;
  } else {
    profitLoss = (entryPrice - exitPrice) * quantity;
  }
  
  const percentage = (profitLoss / (entryPrice * quantity)) * 100;
  
  return { profitLoss, percentage };
}

// Generate random price movement
export function generatePriceMovement(currentPrice: number, volatility: number = 0.02): number {
  const change = (Math.random() - 0.5) * volatility;
  return currentPrice * (1 + change);
}

// Validate trade parameters
export function validateTrade(
  price: number,
  quantity: number,
  balance: number
): { isValid: boolean; error?: string } {
  if (price <= 0) {
    return { isValid: false, error: 'Price must be greater than 0' };
  }
  
  if (quantity <= 0) {
    return { isValid: false, error: 'Quantity must be greater than 0' };
  }
  
  const totalCost = price * quantity;
  if (totalCost > balance) {
    return { isValid: false, error: 'Insufficient balance' };
  }
  
  return { isValid: true };
}

// Generate trading feedback using AI-like logic
export function generateTradeFeedback(
  trade: {
    entryPrice: number;
    exitPrice?: number;
    tradeType: 'buy' | 'sell';
    profitLoss?: number;
  }
): string {
  if (!trade.exitPrice || trade.profitLoss === undefined) {
    return "Trade executed successfully. Monitor the market for exit opportunities.";
  }
  
  const isProfit = trade.profitLoss > 0;
  const profitPercentage = Math.abs((trade.profitLoss / (trade.entryPrice * 1)) * 100);
  
  if (isProfit) {
    if (profitPercentage > 5) {
      return "Excellent trade! You captured a significant price movement. Consider taking partial profits on such strong moves.";
    } else if (profitPercentage > 2) {
      return "Good trade execution. You successfully identified the market direction. Keep practicing risk management.";
    } else {
      return "Profitable trade, though modest gains. Consider holding for larger moves or tightening your entry criteria.";
    }
  } else {
    if (profitPercentage > 5) {
      return "Significant loss. Review your entry criteria and consider using stop-losses to limit downside risk.";
    } else if (profitPercentage > 2) {
      return "Small loss - part of trading. Analyze what went wrong and adjust your strategy accordingly.";
    } else {
      return "Minor loss. Good risk management if you used a stop-loss. Keep practicing your timing.";
    }
  }
}

// Debounce function for search/input
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Local storage helpers
export const storage = {
  get: <T>(key: string): T | null => {
    if (typeof window === 'undefined') return null;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  
  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Handle storage errors silently
    }
  },
  
  remove: (key: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(key);
    } catch {
      // Handle storage errors silently
    }
  }
};
