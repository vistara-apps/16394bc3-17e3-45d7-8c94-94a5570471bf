'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('FlashTrade Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="glass-card p-8 max-w-md w-full text-center">
        <div className="space-y-6">
          {/* Error icon */}
          <div className="h-16 w-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto">
            <AlertTriangle className="h-8 w-8 text-red-400" />
          </div>
          
          {/* Error message */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-text-primary">
              Oops! Something went wrong
            </h2>
            <p className="text-text-secondary">
              We encountered an unexpected error while loading FlashTrade. Don't worry, your progress is saved.
            </p>
          </div>
          
          {/* Error details (in development) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-surface/40 rounded-lg p-4 text-left">
              <p className="text-red-400 text-sm font-mono">
                {error.message}
              </p>
            </div>
          )}
          
          {/* Action buttons */}
          <div className="flex flex-col space-y-3">
            <button
              onClick={reset}
              className="btn-primary flex items-center justify-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Try Again</span>
            </button>
            
            <button
              onClick={() => window.location.href = '/'}
              className="btn-secondary flex items-center justify-center space-x-2"
            >
              <Home className="h-4 w-4" />
              <span>Go Home</span>
            </button>
          </div>
          
          {/* Support info */}
          <div className="pt-4 border-t border-white/10">
            <p className="text-text-secondary text-sm">
              If this problem persists, please refresh the page or try again later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
