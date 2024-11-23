import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  TrendingUp,
  MessageSquare,
  BookOpen,
  Activity,
  Swords,
  Target,
  HelpCircle,
  Info,
  BookOpenCheck,
  Shield,
} from 'lucide-react';
import { useState } from 'react';
import { TEAM_LOGOS } from './TeamCreation';
import { Tooltip } from '../ui/Tooltip';
import { FuturesDisplay } from './FuturesDisplay';
import { useNavigate } from 'react-router-dom';

interface TeamMember {
  email: string;
  tradingStats?: {
    winRate: number;
    totalTrades: number;
  };
}

interface TeamDashboardProps {
  team: {
    name: string;
    logo: number;
    inviteCode: string;
    members: TeamMember[];
    createdAt: Date;
  };
}

interface CryptoGuide {
  title: string;
  content: string;
  icon: typeof BookOpen;
}

export function TeamDashboard({ team }: TeamDashboardProps) {
  const [showGuide, setShowGuide] = useState(false);
  const navigate = useNavigate();
  const TeamLogo = TEAM_LOGOS[team.logo].icon;
  const totalMembers = team.members.length + 1;
  
  const membersWithTrades = team.members.filter(
    (member) => member.tradingStats && member.tradingStats.totalTrades > 0
  );
  
  const hasTradeData = membersWithTrades.length > 0;

  const teamStats = hasTradeData ? {
    winRate: membersWithTrades.reduce(
      (acc, member) => acc + (member.tradingStats?.winRate ?? 0),
      0
    ) / (membersWithTrades.length || 1),
    totalTrades: membersWithTrades.reduce(
      (acc, member) => acc + (member.tradingStats?.totalTrades ?? 0),
      0
    ),
  } : null;

  const handleWarRoomClick = () => {
    navigate('/btc');
  };

  const tradingGuides: CryptoGuide[] = [
    {
      title: 'Futures Trading Basics',
      content: 'Learn about leverage, margin, and position sizing in futures trading.',
      icon: BookOpenCheck,
    },
    {
      title: 'Risk Management',
      content: 'Advanced risk management techniques for futures trading.',
      icon: Shield,
    },
    {
      title: 'Technical Analysis',
      content: 'Master chart patterns and indicators for futures markets.',
      icon: Target,
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gemini-card rounded-2xl p-8 shadow-xl"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-6">
            <div className={`p-6 bg-${TEAM_LOGOS[team.logo].color}/20 rounded-xl`}>
              <TeamLogo className={`w-12 h-12 text-${TEAM_LOGOS[team.logo].color}`} />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{team.name}</h1>
              <p className="text-gray-400">Team Code: {team.inviteCode}</p>
            </div>
          </div>

          <Tooltip content="Join your team's trading room">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
              onClick={handleWarRoomClick}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-red to-accent-purple rounded-lg blur-lg group-hover:blur-xl transition-all duration-300 opacity-75" />
              <div className="relative px-8 py-4 bg-gradient-to-r from-accent-red to-accent-purple rounded-lg font-semibold text-white flex items-center gap-2 z-10">
                <Swords className="w-5 h-5" />
                Enter War Room
              </div>
            </motion.button>
          </Tooltip>
        </div>
      </motion.div>

      <FuturesDisplay />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gemini-card rounded-xl p-6"
        >
          <Tooltip content="Total number of team members including the creator">
            <div className="w-12 h-12 rounded-lg bg-accent-blue/20 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-accent-blue" />
            </div>
          </Tooltip>
          <div className="text-2xl font-bold mb-1">{totalMembers}</div>
          <div className="text-gray-400">Team Size</div>
        </motion.div>

        {hasTradeData && teamStats && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gemini-card rounded-xl p-6"
            >
              <Tooltip content="Percentage of profitable trades">
                <div className="w-12 h-12 rounded-lg bg-accent-green/20 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-accent-green" />
                </div>
              </Tooltip>
              <div className="text-2xl font-bold mb-1">
                {teamStats.winRate.toFixed(1)}%
              </div>
              <div className="text-gray-400">Win Rate</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gemini-card rounded-xl p-6"
            >
              <Tooltip content="Total number of trades executed by the team">
                <div className="w-12 h-12 rounded-lg bg-accent-yellow/20 flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6 text-accent-yellow" />
                </div>
              </Tooltip>
              <div className="text-2xl font-bold mb-1">{teamStats.totalTrades}</div>
              <div className="text-gray-400">Total Trades</div>
            </motion.div>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-gemini-card rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Futures Trading Guide
            </h2>
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="text-accent-blue hover:text-accent-blue/80 transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>

          <AnimatePresence>
            {showGuide && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 mb-6"
              >
                {tradingGuides.map((guide, index) => (
                  <motion.div
                    key={guide.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gemini-accent rounded-lg p-4"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <guide.icon className="w-5 h-5 text-accent-blue" />
                      <h3 className="font-medium">{guide.title}</h3>
                    </div>
                    <p className="text-gray-400">{guide.content}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gemini-accent rounded-lg p-4">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Info className="w-4 h-4 text-accent-blue" />
                Market Analysis
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Trend Strength</span>
                  <span className="text-accent-green">Strong Bullish</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Volatility</span>
                  <span className="text-accent-yellow">Moderate</span>
                </div>
              </div>
            </div>

            <div className="bg-gemini-accent rounded-lg p-4">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Activity className="w-4 h-4 text-accent-blue" />
                Trading Activity
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Active Positions</span>
                  <span className="text-white">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Avg. Position Size</span>
                  <span className="text-white">$2.5K</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gemini-card rounded-xl p-6"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Trading Signals
          </h2>
          <div className="space-y-4">
            {[
              'BTC/USDT: Support level at 65,800',
              'ETH/USDT: Breakout confirmed',
              'SOL/USDT: RSI divergence alert',
              'BNB/USDT: Resistance test at 420',
            ].map((signal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gemini-accent rounded-lg text-gray-300"
              >
                {signal}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}