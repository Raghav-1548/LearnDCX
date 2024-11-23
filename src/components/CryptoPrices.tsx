import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const CRYPTO_PAIRS = ['bitcoin', 'ethereum', 'binancecoin', 'solana', 'cardano'];

export function CryptoPrices() {
  const { data, error } = useSWR(
    `https://api.coingecko.com/api/v3/simple/price?ids=${CRYPTO_PAIRS.join(',')}&vs_currencies=usd&include_24hr_change=true`,
    fetcher,
    { refreshInterval: 30000 }
  );

  if (error) return null;

  return (
    <section className="py-12 bg-gemini-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/10 to-accent-purple/10 animate-gradient" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {CRYPTO_PAIRS.map((crypto, index) => {
            const price = data?.[crypto]?.usd;
            const change = data?.[crypto]?.usd_24h_change;
            const isPositive = change > 0;

            return (
              <motion.div
                key={crypto}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-gemini-card border border-gemini-accent/50 rounded-xl p-4 hover:border-accent-blue/50 transition-colors duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold capitalize">{crypto}</h3>
                    {data ? (
                      <span className={`flex items-center gap-1 text-sm ${isPositive ? 'text-accent-green' : 'text-accent-red'}`}>
                        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {Math.abs(change).toFixed(2)}%
                      </span>
                    ) : (
                      <div className="h-4 w-16 bg-gemini-accent animate-pulse rounded" />
                    )}
                  </div>
                  <div className="text-2xl font-bold">
                    {data ? (
                      `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    ) : (
                      <div className="h-8 w-24 bg-gemini-accent animate-pulse rounded" />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}