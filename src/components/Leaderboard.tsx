import { motion } from 'framer-motion';
import { Trophy, Users, TrendingUp } from 'lucide-react';

const teams = [
  { id: 1, name: 'Alpha Traders', members: 8, roi: 287.5, streak: 12 },
  { id: 2, name: 'Crypto Knights', members: 6, roi: 245.2, streak: 8 },
  { id: 3, name: 'Future Masters', members: 5, roi: 198.7, streak: 6 },
  { id: 4, name: 'DeFi Dragons', members: 7, roi: 176.4, streak: 5 },
];

export function Leaderboard() {
  return (
    <section className="py-20 bg-gemini-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Top Trading Teams</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join the ranks of our most successful trading teams and learn from the best
          </p>
        </motion.div>
        
        <div className="grid gap-6">
          {teams.map((team, index) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gemini-card rounded-xl p-6 hover:bg-gemini-accent transition-colors duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${
                    index === 0 ? 'bg-accent-yellow/20 text-accent-yellow' :
                    index === 1 ? 'bg-accent-blue/20 text-accent-blue' :
                    'bg-accent-purple/20 text-accent-purple'
                  }`}>
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{team.name}</h3>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{team.members} members</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-accent-green">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-bold">{team.roi}% ROI</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    {team.streak} day streak
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}