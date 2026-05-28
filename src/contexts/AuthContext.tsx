import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'worker' | 'recruiter';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'worker' | 'recruiter') => Promise<void>;
  register: (email: string, password: string, name: string, role: 'worker' | 'recruiter') => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on app start
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'worker' | 'recruiter') => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await axios.post('/api/auth/login', { email, password, role });
      
      // Simulated login for demo
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        role
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, role: 'worker' | 'recruiter') => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await axios.post('/api/auth/register', { email, password, name, role });
      
      // Simulated registration for demo
      const mockUser: User = {
        id: '1',
        email,
        name,
        role
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}