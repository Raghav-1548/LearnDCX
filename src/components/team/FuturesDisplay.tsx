import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';

// Types for our futures data
interface FutureData {
  symbol: string;
  price: number;
  fundingRate: number;
  indexPrice: number;
  openInterest: number;
  change24h: number;
}

interface FuturesDisplayProps {
  className?: string;
}

const SYMBOLS = ['BTC', 'ETH', 'BNB', 'SOL'];

export function FuturesDisplay({ className = '' }: FuturesDisplayProps) {
  const [futuresData, setFuturesData] = useState<
    Record<string, FutureData | null>
  >({});
  const [loading, setLoading] = useState(true);

  // Simulate fetching data - replace with your actual API call
  const fetchFuturesData = async () => {
    try {
      // Simulated API response - replace with your actual API endpoint
      const data = {
        BTC: {
          symbol: 'BTC',
          price: 98784.39,
          fundingRate: 0.01,
          indexPrice: 98741.53,
          openInterest: 1250000,
          change24h: -2.5,
        },
        ETH: {
          symbol: 'ETH',
          price: 3382.4,
          fundingRate: 0.034,
          indexPrice: 3379.77,
          openInterest: 850000,
          change24h: 1.8,
        },
        BNB: {
          symbol: 'BNB',
          price: 634.44,
          fundingRate: 0.0278,
          indexPrice: 634.12,
          openInterest: 450000,
          change24h: -0.5,
        },
        SOL: {
          symbol: 'SOL',
          price: 262.38,
          fundingRate: 0.0355,
          indexPrice: 262.15,
          openInterest: 320000,
          change24h: 3.2,
        },
      };

      setFuturesData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching futures data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFuturesData();
    // Set up polling every 5 seconds
    const interval = setInterval(fetchFuturesData, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number, decimals = 2) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  };

  const formatUSD = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}
    >
      {SYMBOLS.map((symbol) => {
        const data = futuresData[symbol];

        return (
          <div key={symbol} className="bg-gemini-card rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent-red/20 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-accent-red" />
                </div>
                <div>
                  <h3 className="font-bold">{symbol} Perpetual</h3>
                  <p className="text-sm text-gray-400">USDT Margined</p>
                </div>
              </div>
              {loading ? (
                <div className="animate-pulse bg-gray-700 h-6 w-16 rounded" />
              ) : (
                data?.change24h !== undefined && (
                  <span
                    className={`text-sm ${
                      data.change24h >= 0
                        ? 'text-accent-green'
                        : 'text-accent-red'
                    }`}
                  >
                    {data.change24h >= 0 ? '↑' : '↓'} {Math.abs(data.change24h)}
                    %
                  </span>
                )
              )}
            </div>

            {loading ? (
              <div className="space-y-4">
                <div className="animate-pulse bg-gray-700 h-8 w-32 rounded" />
                <div className="animate-pulse bg-gray-700 h-6 w-24 rounded" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="animate-pulse bg-gray-700 h-16 rounded" />
                  <div className="animate-pulse bg-gray-700 h-16 rounded" />
                </div>
              </div>
            ) : data ? (
              <>
                <div className="text-2xl font-bold">
                  {formatUSD(data.price)}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">Funding Rate:</span>
                  <span className="text-accent-green">
                    {formatNumber(data.fundingRate * 100, 4)}%
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gemini-accent rounded-lg p-3">
                    <div className="text-sm text-gray-400 mb-1">
                      Index Price
                    </div>
                    <div className="font-medium">
                      {formatUSD(data.indexPrice)}
                    </div>
                  </div>
                  <div className="bg-gemini-accent rounded-lg p-3">
                    <div className="text-sm text-gray-400 mb-1">
                      Open Interest
                    </div>
                    <div className="font-medium">
                      {formatNumber(data.openInterest / 1000)}K
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-400">
                Error loading data
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
