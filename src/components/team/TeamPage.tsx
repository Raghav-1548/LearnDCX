import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TeamCreation } from './TeamCreation';
import { TeamDashboard } from './TeamDashboard';

interface TeamData {
  name: string;
  logo: number;
  members: string[];
  inviteCode: string;
}

export function TeamPage() {
  const [hasTeam, setHasTeam] = useState(false);
  const [teamData, setTeamData] = useState<TeamData | null>(null);

  const handleTeamCreate = (data: TeamData) => {
    setTeamData(data);
    setHasTeam(true);
  };

  return (
    <div className="min-h-screen bg-gemini-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {!hasTeam ? (
            <TeamCreation onTeamCreate={handleTeamCreate} />
          ) : (
            <TeamDashboard team={teamData!} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}