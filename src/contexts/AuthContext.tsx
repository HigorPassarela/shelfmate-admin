import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  email: string;
  name: string;
  phone?: string;
  cpf?: string;
  address?: string;
  role: 'customer' | 'admin' | 'librarian';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (data: { name: string; email: string; cpf: string; phone?: string; password: string }) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  isAdmin: boolean;
  isLibrarian: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simple mock store for registered users
const registeredUsers: Map<string, { user: User; password: string }> = new Map();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    // Admin mock
    if (email === 'admin@livraria.com' && password === 'admin123') {
      setUser({ email, name: 'Administrador', role: 'admin' });
      return true;
    }
    // Check registered users first
    const registered = registeredUsers.get(email);
    if (registered && registered.password === password) {
      setUser(registered.user);
      return true;
    }
    // Fallback mock
    if (email && password === '123456') {
      setUser({ email, name: email.split('@')[0], role: 'customer' });
      return true;
    }
    return false;
  };

  const register = (data: { name: string; email: string; cpf: string; phone?: string; password: string }): boolean => {
    if (registeredUsers.has(data.email)) return false;
    const newUser: User = {
      email: data.email,
      name: data.name,
      cpf: data.cpf,
      phone: data.phone,
      role: 'customer',
    };
    registeredUsers.set(data.email, { user: newUser, password: data.password });
    setUser(newUser);
    return true;
  };

  const logout = () => setUser(null);

  const updateProfile = (data: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...data, cpf: prev.cpf }; // CPF cannot change
      // Sync with registered store
      const reg = registeredUsers.get(prev.email);
      if (reg) registeredUsers.set(prev.email, { ...reg, user: updated });
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
