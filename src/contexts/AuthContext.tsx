import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  email: string;
  name: string;
  phone?: string;
  cpf?: string;
  address?: string;
  role: 'customer' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    if (email === 'admin@livraria.com' && password === 'admin123') {
      setUser({ email, name: 'Administrador', role: 'admin' });
      return true;
    }
    if (email && password === '123456') {
      setUser({ email, name: email.split('@')[0], role: 'customer' });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  const updateProfile = (data: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...data } : null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
