import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Copy, Shield, Zap, Target, Rocket } from 'lucide-react';

export const TEAM_LOGOS = [
  { icon: Shield, color: 'accent-blue' },
  { icon: Zap, color: 'accent-yellow' },
  { icon: Target, color: 'accent-red' },
  { icon: Rocket, color: 'accent-purple' },
  { icon: Users, color: 'accent-green' },
] as const;

interface TeamMember {
  email: string;
  tradingStats?: {
    winRate: number;
    totalTrades: number;
  };
}

interface TeamCreationProps {
  onTeamCreate: (data: {
    name: string;
    logo: number;
    members: TeamMember[];
    inviteCode: string;
    createdAt: Date;
  }) => void;
}

export function TeamCreation({ onTeamCreate }: TeamCreationProps) {
  const [step, setStep] = useState(1);
  const [teamName, setTeamName] = useState('');
  const [selectedLogo, setSelectedLogo] = useState(0);
  const [members, setMembers] = useState<TeamMember[]>([{ email: '' }]);
  const [inviteCode, setInviteCode] = useState('');

  const generateInviteCode = () => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    setInviteCode(code);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      if (step === 1) generateInviteCode();
    } else {
      onTeamCreate({
        name: teamName,
        logo: selectedLogo,
        members: members.filter(member => member.email),
        inviteCode,
        createdAt: new Date(),
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-gemini-card rounded-2xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Create Your Team</h2>
          <p className="text-gray-400">Step {step} of 3</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Team Name
                  </label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full bg-gemini-accent text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
                    placeholder="Enter team name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Select Team Logo
                  </label>
                  <div className="grid grid-cols-5 gap-4">
                    {TEAM_LOGOS.map((logo, index) => {
                      const Icon = logo.icon;
                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setSelectedLogo(index)}
                          className={`p-4 rounded-lg transition-all duration-300 ${
                            selectedLogo === index
                              ? `bg-${logo.color}/20 ring-2 ring-${logo.color}`
                              : 'bg-gemini-accent hover:bg-gemini-accent/80'
                          }`}
                        >
                          <Icon className={`w-8 h-8 ${selectedLogo === index ? `text-${logo.color}` : 'text-white'}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Team Members (up to 4)
                  </label>
                  {members.map((member, index) => (
                    <div key={index} className="mb-2">
                      <input
                        type="email"
                        value={member.email}
                        onChange={(e) => {
                          const newMembers = [...members];
                          newMembers[index] = { email: e.target.value };
                          setMembers(newMembers);
                        }}
                        className="w-full bg-gemini-accent text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 mb-2"
                        placeholder="Enter member email"
                      />
                    </div>
                  ))}
                  {members.length < 4 && (
                    <button
                      type="button"
                      onClick={() => setMembers([...members, { email: '' }])}
                      className="text-accent-blue hover:text-accent-blue/80"
                    >
                      + Add another member
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Team Invite Code
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={inviteCode}
                      readOnly
                      className="w-full bg-gemini-accent text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
                    />
                    <button
                      type="button"
                      onClick={() => navigator.clipboard.writeText(inviteCode)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gemini-accent rounded-lg"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-400">
                    Share this code with your team members to join
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className="w-full bg-accent-blue hover:bg-accent-blue/90 text-white rounded-lg py-3 font-medium transition-colors"
          >
            {step === 3 ? 'Create Team' : 'Continue'}
          </button>
        </form>
      </div>
    </motion.div>
  );
}