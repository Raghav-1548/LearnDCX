import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SignIn } from './components/auth/SignIn';
import { SignUp } from './components/auth/SignUp';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { CryptoPrices } from './components/CryptoPrices';
import { Leaderboard } from './components/Leaderboard';
import { TeamPage } from './components/team/TeamPage';
import { LearnMore } from './components/LearnMore';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import BtcDashboard from './components/BtcDashboard';
import OrderPanel from './components/OrderPanel';

function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <CryptoPrices />
      <Features />
      <Leaderboard />
    </motion.div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/btc" element={<BtcDashboard />} />
            <Route path="/learn-more" element={<LearnMore />} />
            <Route path="/op" element={<OrderPanel />} />
            <Route path="/team" element={
              <ProtectedRoute>
                <TeamPage />
              </ProtectedRoute>
            } />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </AuthProvider>
  );
}