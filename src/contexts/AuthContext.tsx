import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, logout as apiLogout, getMe } from '@/lib/api';

interface User {
  id: string;
  email: string;
  username: string;
  first_name: string;
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
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      getMe()
        .then(setUser)
        .catch(() => {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          setUser(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string, _role: 'worker' | 'recruiter') => {
    const data = await apiLogin({ email, password });
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    setUser(data);
  };

  const register = async (email: string, password: string, name: string, role: 'worker' | 'recruiter') => {
    const data = await apiRegister({ email, password, first_name: name, role });
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    setUser(data);
  };

  const logout = async () => {
    const refresh = localStorage.getItem('refresh_token') || '';
    await apiLogout(refresh).catch(() => {});
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
