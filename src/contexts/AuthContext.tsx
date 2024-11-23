import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  tradingStats: {
    winRate: number;
    totalTrades: number;
  };
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (username: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (email: string, password: string) => {
    // Simulate API call
    const mockUser: User = {
      id: '1',
      username: email.split('@')[0],
      email,
      tradingStats: {
        winRate: 0,
        totalTrades: 0
      }
    };
    setUser(mockUser);
  };

  const signUp = async (username: string, email: string, password: string) => {
    // Simulate API call
    const mockUser: User = {
      id: '1',
      username,
      email,
      tradingStats: {
        winRate: 0,
        totalTrades: 0
      }
    };
    setUser(mockUser);
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      signUp,
      signOut,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}