const API_BASE_URL = 'http://localhost:8081/api/v1';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone?: string;
  address?: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  userId: string;
  email: string;
  name: string;
  role: string;
}

export interface ApiError {
  status: number;
  message: string;
  timestamp: string;
}

class AuthService {
  // Login
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao fazer login');
      }

      // Salvar token no localStorage
      this.setToken(data.token);
      this.setUser(data);

      return data;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }

  // Registro
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao registrar usuário');
      }

      // Salvar token no localStorage
      this.setToken(data.token);
      this.setUser(data);

      return data;
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      const token = this.getToken();
      
      if (token) {
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
      // Sempre limpar dados locais, mesmo se a API falhar
      this.clearAuthData();
    }
  }

  // Gerenciamento de token
  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  setUser(user: AuthResponse): void {
    localStorage.setItem('user_data', JSON.stringify(user));
  }

  getUser(): AuthResponse | null {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  }

  clearAuthData(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  }

  // Verificar se está logado
  isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getUser();
    return !!(token && user);
  }

  // Verificar role do usuário
  hasRole(role: string): boolean {
    const user = this.getUser();
    return user?.role === role;
  }

  // Verificar se é admin
  isAdmin(): boolean {
    return this.hasRole('ADMIN');
  }

  // Verificar se é bibliotecário
  isLibrarian(): boolean {
    return this.hasRole('LIBRARIAN');
  }

  // Verificar se é cliente
  isCustomer(): boolean {
    return this.hasRole('CUSTOMER');
  }
}

export const authService = new AuthService();