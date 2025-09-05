'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Hash } from 'lucide-react';
import { TradeExecutionFormProps } from '@/lib/types';
import { formatCurrency, validateTrade } from '@/lib/utils';

export function TradeExecutionForm({ 
  asset, 
  currentPrice, 
  onExecute, 
  variant = 'buy' 
}: TradeExecutionFormProps) {
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>(variant);
  const [quantity, setQuantity] = useState<string>('1');
  const [price, setPrice] = useState<string>(currentPrice.toString());
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  const simulatedBalance = 10000; // Mock balance for simulation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const numQuantity = parseFloat(quantity);
      const numPrice = orderType === 'market' ? currentPrice : parseFloat(price);

      // Validate trade
      const validation = validateTrade(numPrice, numQuantity, simulatedBalance);
      if (!validation.isValid) {
        setError(validation.error || 'Invalid trade parameters');
        return;
      }

      // Execute trade
      const trade = {
        asset,
        entryPrice: numPrice,
        quantity: numQuantity,
        tradeType,
        timestamp: new Date(),
        isActive: true
      };

      await onExecute(trade);
      
      // Reset form
      setQuantity('1');
      setPrice(currentPrice.toString());
      
    } catch (err) {
      setError('Failed to execute trade. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalValue = parseFloat(quantity || '0') * (orderType === 'market' ? currentPrice : parseFloat(price || '0'));

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Execute Trade</h3>
        <div className="text-sm text-text-secondary">
          Balance: {formatCurrency(simulatedBalance)}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Trade Type */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Trade Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setTradeType('buy')}
              className={`
                flex items-center justify-center space-x-2 p-3 rounded-lg border transition-all duration-200
                ${tradeType === 'buy'
                  ? 'bg-green-500/20 border-green-500/50 text-green-300'
                  : 'bg-surface/40 border-white/20 text-text-secondary hover:border-white/40'
                }
              `}
            >
              <TrendingUp className="h-4 w-4" />
              <span>Buy</span>
            </button>
            <button
              type="button"
              onClick={() => setTradeType('sell')}
              className={`
                flex items-center justify-center space-x-2 p-3 rounded-lg border transition-all duration-200
                ${tradeType === 'sell'
                  ? 'bg-red-500/20 border-red-500/50 text-red-300'
                  : 'bg-surface/40 border-white/20 text-text-secondary hover:border-white/40'
                }
              `}
            >
              <TrendingDown className="h-4 w-4" />
              <span>Sell</span>
            </button>
          </div>
        </div>

        {/* Order Type */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Order Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setOrderType('market')}
              className={`
                p-3 rounded-lg border transition-all duration-200 text-center
                ${orderType === 'market'
                  ? 'bg-primary/20 border-primary/50 text-primary'
                  : 'bg-surface/40 border-white/20 text-text-secondary hover:border-white/40'
                }
              `}
            >
              Market
            </button>
            <button
              type="button"
              onClick={() => setOrderType('limit')}
              className={`
                p-3 rounded-lg border transition-all duration-200 text-center
                ${orderType === 'limit'
                  ? 'bg-primary/20 border-primary/50 text-primary'
                  : 'bg-surface/40 border-white/20 text-text-secondary hover:border-white/40'
                }
              `}
            >
              Limit
            </button>
          </div>
        </div>

        {/* Asset and Current Price */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Asset
            </label>
            <div className="p-3 bg-surface/40 rounded-lg border border-white/20">
              <div className="text-text-primary font-medium">{asset}</div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Current Price
            </label>
            <div className="p-3 bg-surface/40 rounded-lg border border-white/20">
              <div className="text-accent font-medium">{formatCurrency(currentPrice)}</div>
            </div>
          </div>
        </div>

        {/* Price Input (for limit orders) */}
        {orderType === 'limit' && (
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Limit Price
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                step="0.01"
                min="0"
                className="w-full pl-10 pr-4 py-3 bg-surface/40 border border-white/20 rounded-lg text-text-primary placeholder-text-secondary focus:border-primary focus:outline-none transition-colors duration-200"
                placeholder="Enter limit price"
                required
              />
            </div>
          </div>
        )}

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Quantity
          </label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              step="0.01"
              min="0.01"
              className="w-full pl-10 pr-4 py-3 bg-surface/40 border border-white/20 rounded-lg text-text-primary placeholder-text-secondary focus:border-primary focus:outline-none transition-colors duration-200"
              placeholder="Enter quantity"
              required
            />
          </div>
        </div>

        {/* Total Value */}
        <div className="p-4 bg-surface/20 rounded-lg border border-white/10">
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Total Value:</span>
            <span className="text-text-primary font-semibold">
              {formatCurrency(totalValue || 0)}
            </span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !quantity || (orderType === 'limit' && !price)}
          className={`
            w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2
            ${tradeType === 'buy'
              ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
              : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              {tradeType === 'buy' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span>{tradeType === 'buy' ? 'Buy' : 'Sell'} {asset}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
