'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, CandlestickChart } from 'recharts';
import { TradingChartProps } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

export function TradingChart({ data, variant = 'simulated', height = 300 }: TradingChartProps) {
  const [chartType, setChartType] = useState<'line' | 'candlestick'>('line');
  const [timeframe, setTimeframe] = useState<'1h' | '4h' | '1d'>('1h');

  // Process data for line chart
  const lineData = data.map(point => ({
    time: new Date(point.time).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    price: point.close,
    volume: point.volume
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 border border-white/20">
          <p className="text-text-primary font-medium">{label}</p>
          <p className="text-accent">
            Price: {formatCurrency(payload[0].value)}
          </p>
          {variant === 'simulated' && (
            <p className="text-text-secondary text-sm">Simulated Data</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="trading-chart">
      {/* Chart controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-text-primary">
            Price Chart
            {variant === 'simulated' && (
              <span className="ml-2 text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
                Simulation
              </span>
            )}
          </h3>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Timeframe selector */}
          <div className="flex bg-surface/60 rounded-lg p-1">
            {['1h', '4h', '1d'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf as any)}
                className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
                  timeframe === tf
                    ? 'bg-primary text-white'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
          
          {/* Chart type selector */}
          <div className="flex bg-surface/60 rounded-lg p-1">
            {['line', 'candlestick'].map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type as any)}
                className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 capitalize ${
                  chartType === type
                    ? 'bg-primary text-white'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="time" 
                stroke="rgba(255,255,255,0.5)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.5)"
                fontSize={12}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="hsl(40 90% 55%)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "hsl(40 90% 55%)" }}
              />
            </LineChart>
          ) : (
            // Simplified candlestick representation using line chart
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="time" 
                stroke="rgba(255,255,255,0.5)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.5)"
                fontSize={12}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="stepAfter" 
                dataKey="price" 
                stroke="hsl(180 60% 45%)"
                strokeWidth={1}
                dot={{ r: 2, fill: "hsl(180 60% 45%)" }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Chart info */}
      <div className="mt-4 flex items-center justify-between text-sm text-text-secondary">
        <div>
          Last updated: {new Date().toLocaleTimeString()}
        </div>
        <div className="flex items-center space-x-4">
          <span>Volume: {formatCurrency(lineData[lineData.length - 1]?.volume || 0)}</span>
          <span>Points: {data.length}</span>
        </div>
      </div>
    </div>
  );
}
