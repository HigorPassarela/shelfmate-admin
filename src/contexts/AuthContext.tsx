import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const API_BASE_URL = 'http://localhost:8081/api/v1';

export interface User {
  email: string;
  name: string;
  phone?: string;
  cpf?: string;
  address?: string;
  role: 'CUSTOMER' | 'ADMIN' | 'LIBRARIAN'; // Ajustado para corresponder ao backend
  userId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: { name: string; email: string; cpf: string; phone?: string; password: string; address?: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => void;
  isAdmin: boolean;
  isLibrarian: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar se há usuário logado ao inicializar
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user_data');
        
        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Erro ao inicializar autenticação:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Erro no login:', data);
        return false;
      }

      // Salvar token e dados do usuário
      localStorage.setItem('auth_token', data.token);
      
      const userData: User = {
        email: data.email,
        name: data.name,
        role: data.role,
        userId: data.userId,
      };

      localStorage.setItem('user_data', JSON.stringify(userData));
      setUser(userData);
      
      return true;
    } catch (error) {
      console.error('Erro na requisição de login:', error);
      return false;
    }
  };

  const register = async (data: { 
    name: string; 
    email: string; 
    cpf: string; 
    phone?: string; 
    password: string; 
    address?: string 
  }): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          cpf: data.cpf,
          phone: data.phone,
          address: data.address
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('Erro no registro:', responseData);
        return false;
      }

      // Salvar token e dados do usuário
      localStorage.setItem('auth_token', responseData.token);
      
      const userData: User = {
        email: responseData.email,
        name: responseData.name,
        role: responseData.role,
        userId: responseData.userId,
        cpf: data.cpf,
        phone: data.phone,
        address: data.address,
      };

      localStorage.setItem('user_data', JSON.stringify(userData));
      setUser(userData);
      
      return true;
    } catch (error) {
      console.error('Erro na requisição de registro:', error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const token = localStorage.getItem('auth_token');
      
      if (token) {
        // Tentar fazer logout no backend
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {
      // Sempre limpar dados locais
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      setUser(null);
    }
  };

  const updateProfile = (data: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...data, cpf: prev.cpf }; // CPF não pode mudar
      localStorage.setItem('user_data', JSON.stringify(updated));
      return updated;
    });
  };

  // Função para obter o token
  const getToken = (): string | null => {
    return localStorage.getItem('auth_token');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      updateProfile, 
      isAdmin: user?.role === 'ADMIN', 
      isLibrarian: user?.role === 'LIBRARIAN',
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

// Hook para obter o token (útil para outras requisições)
export function useAuthToken() {
  return localStorage.getItem('auth_token');
}