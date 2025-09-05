'use client';

import { CheckCircle, XCircle, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { FeedbackDisplayProps } from '@/lib/types';

export function FeedbackDisplay({ 
  feedback, 
  outcome, 
  variant 
}: FeedbackDisplayProps) {
  const getVariantStyles = () => {
    const baseVariant = variant || outcome;
    
    switch (baseVariant) {
      case 'positive':
      case 'profit':
        return {
          containerClass: 'feedback-positive',
          icon: CheckCircle,
          iconColor: 'text-green-400',
          bgGradient: 'from-green-500/10 to-green-600/10'
        };
      case 'negative':
      case 'loss':
        return {
          containerClass: 'feedback-negative',
          icon: XCircle,
          iconColor: 'text-red-400',
          bgGradient: 'from-red-500/10 to-red-600/10'
        };
      case 'neutral':
      case 'break_even':
      default:
        return {
          containerClass: 'feedback-neutral',
          icon: AlertCircle,
          iconColor: 'text-blue-400',
          bgGradient: 'from-blue-500/10 to-blue-600/10'
        };
    }
  };

  const getOutcomeIcon = () => {
    switch (outcome) {
      case 'profit':
        return TrendingUp;
      case 'loss':
        return TrendingDown;
      default:
        return AlertCircle;
    }
  };

  const styles = getVariantStyles();
  const Icon = styles.icon;
  const OutcomeIcon = getOutcomeIcon();

  const getOutcomeText = () => {
    switch (outcome) {
      case 'profit':
        return 'Profitable Trade';
      case 'loss':
        return 'Loss Trade';
      case 'break_even':
        return 'Break Even';
      default:
        return 'Trade Complete';
    }
  };

  const getOutcomeColor = () => {
    switch (outcome) {
      case 'profit':
        return 'text-green-400';
      case 'loss':
        return 'text-red-400';
      default:
        return 'text-blue-400';
    }
  };

  return (
    <div className={`
      glass-card p-6 border-2 ${styles.containerClass} 
      bg-gradient-to-r ${styles.bgGradient}
      animate-in slide-in-from-bottom-4 duration-300
    `}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon className={`h-6 w-6 ${styles.iconColor}`} />
          <h3 className="text-lg font-semibold text-text-primary">
            Trade Feedback
          </h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <OutcomeIcon className={`h-5 w-5 ${getOutcomeColor()}`} />
          <span className={`text-sm font-medium ${getOutcomeColor()}`}>
            {getOutcomeText()}
          </span>
        </div>
      </div>

      {/* Feedback content */}
      <div className="space-y-4">
        <p className="text-text-primary leading-relaxed">
          {feedback}
        </p>

        {/* Additional insights based on outcome */}
        <div className="pt-4 border-t border-white/10">
          <div className="grid grid-cols-1 gap-3">
            {outcome === 'profit' && (
              <div className="flex items-center space-x-2 text-green-300">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Great job! Consider your exit strategy for future trades.</span>
              </div>
            )}
            
            {outcome === 'loss' && (
              <div className="flex items-center space-x-2 text-red-300">
                <XCircle className="h-4 w-4" />
                <span className="text-sm">Learning opportunity. Review your entry criteria.</span>
              </div>
            )}
            
            {outcome === 'break_even' && (
              <div className="flex items-center space-x-2 text-blue-300">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">No loss, no gain. Consider refining your strategy.</span>
              </div>
            )}
          </div>
        </div>

        {/* Action suggestions */}
        <div className="pt-4 border-t border-white/10">
          <h4 className="text-sm font-medium text-text-primary mb-2">Next Steps:</h4>
          <ul className="space-y-1 text-sm text-text-secondary">
            <li>• Review the market conditions during your trade</li>
            <li>• Practice with different position sizes</li>
            <li>• Study similar setups in the learning section</li>
            {outcome === 'loss' && (
              <li>• Consider setting stop-loss orders</li>
            )}
          </ul>
        </div>
      </div>

      {/* Dismiss button */}
      <div className="mt-6 flex justify-end">
        <button className="btn-secondary text-sm">
          Continue Learning
        </button>
      </div>
    </div>
  );
}
