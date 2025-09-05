'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '@/components/AppShell';
import { ConceptCard } from '@/components/ConceptCard';
import { TradingChart } from '@/components/TradingChart';
import { TradeExecutionForm } from '@/components/TradeExecutionForm';
import { FeedbackDisplay } from '@/components/FeedbackDisplay';
import { TRADING_CONCEPTS, MOCK_MARKET_DATA, generateMockChartData, APP_CONFIG } from '@/lib/constants';
import { generateTradeFeedback, calculateProfitLoss, storage } from '@/lib/utils';
import { Concept, SimulationTrade, User } from '@/lib/types';
import { Play, BookOpen, TrendingUp, Zap, Star, Award, Target } from 'lucide-react';

export default function HomePage() {
  const [currentView, setCurrentView] = useState<'learn' | 'practice' | 'signals'>('learn');
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [activeTrades, setActiveTrades] = useState<SimulationTrade[]>([]);
  const [completedConcepts, setCompletedConcepts] = useState<string[]>([]);
  const [currentTradeFeedback, setCurrentTradeFeedback] = useState<{
    feedback: string;
    outcome: 'profit' | 'loss' | 'break_even';
  } | null>(null);
  const [chartData] = useState(() => generateMockChartData(7));
  const [selectedAsset, setSelectedAsset] = useState('BTC/USD');

  // Initialize user data
  useEffect(() => {
    const savedUser = storage.get<User>('flashtrade_user');
    const savedConcepts = storage.get<string[]>('flashtrade_completed_concepts') || [];
    const savedTrades = storage.get<SimulationTrade[]>('flashtrade_trades') || [];

    if (savedUser) {
      setUser(savedUser);
    } else {
      const newUser: User = {
        userId: `user_${Date.now()}`,
        username: 'Trader',
        createdAt: new Date(),
        portfolioBalance: APP_CONFIG.simulationStartingBalance,
        completedConcepts: savedConcepts,
        isPremium: false
      };
      setUser(newUser);
      storage.set('flashtrade_user', newUser);
    }

    setCompletedConcepts(savedConcepts);
    setActiveTrades(savedTrades);
  }, []);

  // Handle concept selection
  const handleConceptSelect = (concept: Concept) => {
    setSelectedConcept(concept);
    
    // Mark as completed after viewing
    setTimeout(() => {
      if (!completedConcepts.includes(concept.conceptId)) {
        const updated = [...completedConcepts, concept.conceptId];
        setCompletedConcepts(updated);
        storage.set('flashtrade_completed_concepts', updated);
        
        if (user) {
          const updatedUser = { ...user, completedConcepts: updated };
          setUser(updatedUser);
          storage.set('flashtrade_user', updatedUser);
        }
      }
    }, 3000); // Mark as completed after 3 seconds of viewing
  };

  // Handle trade execution
  const handleTradeExecution = async (tradeData: Partial<SimulationTrade>) => {
    if (!user) return;

    const newTrade: SimulationTrade = {
      tradeId: `trade_${Date.now()}`,
      userId: user.userId,
      entryPrice: tradeData.entryPrice!,
      asset: tradeData.asset!,
      quantity: tradeData.quantity!,
      tradeType: tradeData.tradeType!,
      timestamp: new Date(),
      isActive: true
    };

    // Simulate trade execution with random outcome
    setTimeout(() => {
      const currentPrice = MOCK_MARKET_DATA.find(m => m.symbol === selectedAsset)?.price || newTrade.entryPrice;
      const priceChange = (Math.random() - 0.5) * 0.1; // ±10% random change
      const exitPrice = currentPrice * (1 + priceChange);
      
      const { profitLoss, percentage } = calculateProfitLoss(
        newTrade.entryPrice,
        exitPrice,
        newTrade.quantity,
        newTrade.tradeType
      );

      const outcome: 'profit' | 'loss' | 'break_even' = 
        profitLoss > 0 ? 'profit' : profitLoss < 0 ? 'loss' : 'break_even';

      const completedTrade: SimulationTrade = {
        ...newTrade,
        exitPrice,
        outcome,
        profitLoss,
        isActive: false,
        feedback: generateTradeFeedback({
          entryPrice: newTrade.entryPrice,
          exitPrice,
          tradeType: newTrade.tradeType,
          profitLoss
        })
      };

      setActiveTrades(prev => {
        const updated = [...prev, completedTrade];
        storage.set('flashtrade_trades', updated);
        return updated;
      });

      // Update user balance
      if (user) {
        const updatedUser = {
          ...user,
          portfolioBalance: user.portfolioBalance + profitLoss
        };
        setUser(updatedUser);
        storage.set('flashtrade_user', updatedUser);
      }

      // Show feedback
      setCurrentTradeFeedback({
        feedback: completedTrade.feedback!,
        outcome
      });
    }, 2000); // Simulate 2-second execution delay

    setActiveTrades(prev => [...prev, newTrade]);
  };

  // Get current asset price
  const getCurrentPrice = () => {
    return MOCK_MARKET_DATA.find(m => m.symbol === selectedAsset)?.price || 43250;
  };

  // Render learning view
  const renderLearningView = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-accent to-secondary flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-gray-900" />
          </div>
          <h1 className="text-3xl font-bold text-gradient">Learn Trading</h1>
        </div>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Master trading concepts through bite-sized, engaging content designed for quick comprehension and retention.
        </p>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="metric-card text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Star className="h-5 w-5 text-accent" />
            <span className="text-2xl font-bold text-text-primary">
              {completedConcepts.length}
            </span>
          </div>
          <p className="text-text-secondary text-sm">Concepts Completed</p>
        </div>
        
        <div className="metric-card text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Award className="h-5 w-5 text-secondary" />
            <span className="text-2xl font-bold text-text-primary">
              {Math.round((completedConcepts.length / TRADING_CONCEPTS.length) * 100)}%
            </span>
          </div>
          <p className="text-text-secondary text-sm">Progress</p>
        </div>
        
        <div className="metric-card text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Target className="h-5 w-5 text-primary" />
            <span className="text-2xl font-bold text-text-primary">
              {TRADING_CONCEPTS.length - completedConcepts.length}
            </span>
          </div>
          <p className="text-text-secondary text-sm">Remaining</p>
        </div>
      </div>

      {/* Concept Selection */}
      {!selectedConcept ? (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-text-primary">Choose a Concept</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TRADING_CONCEPTS.map((concept) => (
              <ConceptCard
                key={concept.conceptId}
                concept={concept}
                isCompleted={completedConcepts.includes(concept.conceptId)}
                onSelect={handleConceptSelect}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Concept Detail View */
        <div className="space-y-6">
          <button
            onClick={() => setSelectedConcept(null)}
            className="btn-secondary"
          >
            ← Back to Concepts
          </button>
          
          <div className="glass-card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Play className="h-8 w-8 text-accent" />
              <div>
                <h2 className="text-2xl font-bold text-text-primary">{selectedConcept.title}</h2>
                <p className="text-text-secondary">{selectedConcept.category} • {selectedConcept.estimatedTime} min</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-text-primary leading-relaxed text-lg">
                {selectedConcept.description}
              </p>
              
              {/* Simulated content */}
              <div className="bg-surface/40 rounded-lg p-6 border border-white/10">
                <div className="text-center space-y-4">
                  <div className="h-48 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Play className="h-12 w-12 text-accent mx-auto mb-2" />
                      <p className="text-text-primary">Interactive {selectedConcept.contentType} content</p>
                      <p className="text-text-secondary text-sm">Simulated for demo purposes</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setCurrentView('practice')}
                    className="btn-accent"
                  >
                    Practice This Concept
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Render practice view
  const renderPracticeView = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gradient">Practice Trading</h1>
        </div>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Practice your skills in a risk-free simulation environment with real-time feedback.
        </p>
      </div>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="metric-card text-center">
          <div className="text-2xl font-bold text-accent mb-1">
            ${user?.portfolioBalance.toLocaleString() || '10,000'}
          </div>
          <p className="text-text-secondary text-sm">Portfolio Balance</p>
        </div>
        
        <div className="metric-card text-center">
          <div className="text-2xl font-bold text-text-primary mb-1">
            {activeTrades.length}
          </div>
          <p className="text-text-secondary text-sm">Total Trades</p>
        </div>
        
        <div className="metric-card text-center">
          <div className="text-2xl font-bold text-secondary mb-1">
            {activeTrades.filter(t => t.outcome === 'profit').length}
          </div>
          <p className="text-text-secondary text-sm">Profitable Trades</p>
        </div>
      </div>

      {/* Asset Selection */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Select Asset</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_MARKET_DATA.map((asset) => (
            <button
              key={asset.symbol}
              onClick={() => setSelectedAsset(asset.symbol)}
              className={`
                p-4 rounded-lg border transition-all duration-200 text-left
                ${selectedAsset === asset.symbol
                  ? 'bg-primary/20 border-primary/50'
                  : 'bg-surface/40 border-white/20 hover:border-white/40'
                }
              `}
            >
              <div className="font-medium text-text-primary">{asset.symbol}</div>
              <div className="text-accent font-semibold">${asset.price.toLocaleString()}</div>
              <div className={`text-sm ${asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Trading Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TradingChart data={chartData} variant="simulated" />
        <TradeExecutionForm
          asset={selectedAsset}
          currentPrice={getCurrentPrice()}
          onExecute={handleTradeExecution}
        />
      </div>

      {/* Feedback Display */}
      {currentTradeFeedback && (
        <FeedbackDisplay
          feedback={currentTradeFeedback.feedback}
          outcome={currentTradeFeedback.outcome}
        />
      )}
    </div>
  );

  // Render signals view
  const renderSignalsView = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-accent to-yellow-500 flex items-center justify-center">
            <Zap className="h-6 w-6 text-gray-900" />
          </div>
          <h1 className="text-3xl font-bold text-gradient">Trading Signals</h1>
        </div>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Get AI-powered trading signals and alerts for potential opportunities.
        </p>
      </div>

      {/* Premium Unlock */}
      <div className="glass-card p-8 text-center">
        <div className="space-y-6">
          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-accent to-yellow-500 flex items-center justify-center mx-auto">
            <Zap className="h-8 w-8 text-gray-900" />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">Premium Feature</h3>
            <p className="text-text-secondary">
              Unlock real-time trading signals with AI-powered analysis and 85% accuracy rate.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-1">0.001 ETH</div>
              <div className="text-text-secondary text-sm">24-hour access</div>
            </div>
            
            <button className="btn-accent">
              Unlock Signals
            </button>
          </div>
          
          <div className="text-left space-y-2 text-sm text-text-secondary">
            <p>✓ Real-time market analysis</p>
            <p>✓ Entry and exit recommendations</p>
            <p>✓ Risk assessment for each signal</p>
            <p>✓ 24/7 automated monitoring</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AppShell>
      {/* Navigation */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-surface/60 rounded-lg p-1">
          {[
            { key: 'learn', label: 'Learn', icon: BookOpen },
            { key: 'practice', label: 'Practice', icon: TrendingUp },
            { key: 'signals', label: 'Signals', icon: Zap }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setCurrentView(key as any)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200
                ${currentView === key
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface/40'
                }
              `}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {currentView === 'learn' && renderLearningView()}
      {currentView === 'practice' && renderPracticeView()}
      {currentView === 'signals' && renderSignalsView()}
    </AppShell>
  );
}
