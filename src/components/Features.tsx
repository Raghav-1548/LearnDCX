import { BarChart3, Users, Zap, BookOpen } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

export function Features() {
  const features = [
    {
      icon: BarChart3,
      title: 'Real-time Market Data',
      description: 'Access professional-grade L1/L2 market data visualization tools to make informed trading decisions.',
    },
    {
      icon: Zap,
      title: 'Advanced Simulation',
      description: 'Practice with our realistic trading simulator featuring leverage and real market conditions.',
    },
    {
      icon: Users,
      title: 'Team Learning',
      description: 'Join or create trading teams to learn, share strategies, and grow together in a collaborative environment.',
    },
    {
      icon: BookOpen,
      title: 'Interactive Education',
      description: 'Master futures trading through our comprehensive, interactive learning modules and real-time mentorship.',
    },
  ];

  return (
    <div className="bg-dark py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Why Choose Us</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with collaborative learning to provide
            the most effective trading education experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </div>
  );
}