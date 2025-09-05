'use client';

import { useState, useEffect } from 'react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { Menu, X, TrendingUp, BookOpen, Zap, Settings2 } from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
  variant?: 'default' | 'minimizable';
}

export function AppShell({ children, variant = 'default' }: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const { setFrameReady } = useMiniKit();

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  const navigation = [
    { name: 'Learn', icon: BookOpen, href: '#learn', current: true },
    { name: 'Practice', icon: TrendingUp, href: '#practice', current: false },
    { name: 'Signals', icon: Zap, href: '#signals', current: false },
    { name: 'Settings', icon: Settings2, href: '#settings', current: false },
  ];

  if (variant === 'minimizable' && isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="btn-primary p-3 rounded-full shadow-lg"
        >
          <TrendingUp className="h-6 w-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ease-in-out lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:static lg:inset-0
      `}>
        <div className="flex h-full flex-col glass-card rounded-none lg:rounded-r-lg">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-accent to-secondary flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-gray-900" />
              </div>
              <span className="text-xl font-bold text-gradient">FlashTrade</span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-text-secondary hover:text-text-primary"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`
                  flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                  ${item.current
                    ? 'bg-primary/20 text-primary border-l-2 border-primary'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                  }
                `}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </a>
            ))}
          </nav>

          {/* User section */}
          <div className="border-t border-white/10 p-4">
            <Wallet>
              <ConnectWallet className="w-full">
                <div className="flex items-center space-x-3 p-2">
                  <Avatar className="h-8 w-8" />
                  <div className="flex-1 min-w-0">
                    <Name className="text-sm font-medium text-text-primary truncate" />
                  </div>
                </div>
              </ConnectWallet>
            </Wallet>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-30 flex h-16 items-center justify-between bg-surface/80 backdrop-blur-sm border-b border-white/10 px-4 lg:px-6">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden text-text-secondary hover:text-text-primary"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-text-secondary">
              Master trading in minutes, profit in futures.
            </div>
            
            {variant === 'minimizable' && (
              <button
                onClick={() => setIsMinimized(true)}
                className="btn-secondary p-2"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="max-w-sm mx-auto px-4 py-6 lg:max-w-7xl lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
