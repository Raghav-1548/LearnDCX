import { motion } from 'framer-motion';
import { BookOpen, Users, TrendingUp, Shield } from 'lucide-react';

export function LearnMore() {
  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Learning',
      description: 'Access detailed courses on crypto trading, technical analysis, and risk management.'
    },
    {
      icon: Users,
      title: 'Team-Based Learning',
      description: 'Join or create teams to learn and grow together with fellow traders.'
    },
    {
      icon: TrendingUp,
      title: 'Real-Time Practice',
      description: 'Practice trading with real market data in a risk-free environment.'
    },
    {
      icon: Shield,
      title: 'Safe Learning Environment',
      description: 'Learn and practice trading strategies without risking real money.'
    }
  ];

  return (
    <div className="min-h-screen bg-gemini-dark py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to <span className="gradient-text">LearnDCX</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your gateway to mastering cryptocurrency trading through collaborative learning
            and hands-on practice.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gemini-card rounded-xl p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-accent-blue/20 rounded-lg">
                  <feature.icon className="w-6 h-6 text-accent-blue" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
              </div>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Start?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="px-8 py-4 bg-accent-blue hover:bg-accent-blue/90 text-white rounded-lg font-semibold transition-colors"
            >
              Create Account
            </a>
            <a
              href="/signin"
              className="px-8 py-4 bg-gemini-accent hover:bg-gemini-accent/80 text-white rounded-lg font-semibold transition-colors"
            >
              Sign In
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}