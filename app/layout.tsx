import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FlashTrade - Master Trading in Minutes',
  description: 'Learn and practice trading concepts through bite-sized explainers and simulated trading. Master trading in minutes, profit in futures.',
  keywords: 'trading, education, simulation, crypto, base, miniapp',
  authors: [{ name: 'FlashTrade Team' }],
  openGraph: {
    title: 'FlashTrade - Master Trading in Minutes',
    description: 'Learn and practice trading concepts through bite-sized explainers and simulated trading.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlashTrade - Master Trading in Minutes',
    description: 'Learn and practice trading concepts through bite-sized explainers and simulated trading.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
