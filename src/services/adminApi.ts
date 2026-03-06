import { useAuthToken } from '@/contexts/AuthContext';

const API_BASE_URL = 'http://localhost:8081/api/v1';

// Função helper para headers com autenticação
const getAuthHeaders = () => {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export interface DashboardStats {
  totalBooks: number;
  totalAuthors: number;
  totalUsers: number;
  booksInStock: number;
  booksOutOfStock: number;
  lowStockBooks: number;
  totalInventoryValue: number;
  recentRegistrations: number;
}

export interface InventoryReport {
  totalBooks: number;
  inStock: number;
  outOfStock: number;
  totalValue: number;
  lowStockBooks: number;
  stockPercentage: number;
}

export interface LowStockBook {
  id: string;
  title: string;
  authorName: string;
  quantity: number;
  isbn: string;
}

export interface RecentActivity {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  userId?: string;
  userName?: string;
}

class AdminApiService {
  // Estatísticas do Dashboard
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      // Como não temos um endpoint específico, vamos buscar dados de múltiplas fontes
      const [booksResponse, authorsResponse, inventoryResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/book`, { headers: getAuthHeaders() }),
        fetch(`${API_BASE_URL}/author`, { headers: getAuthHeaders() }),
        fetch(`${API_BASE_URL}/book/inventory/report`, { headers: getAuthHeaders() })
      ]);

      if (!booksResponse.ok || !authorsResponse.ok || !inventoryResponse.ok) {
        throw new Error('Erro ao buscar dados do dashboard');
      }

      const books = await booksResponse.json();
      const authors = await authorsResponse.json();
      const inventory = await inventoryResponse.json();

      // Calcular estatísticas
      const booksInStock = books.filter((book: any) => book.bookStatus === 'IN_STOCK').length;
      const booksOutOfStock = books.filter((book: any) => book.bookStatus === 'OUT_OF_STOCK').length;
      const totalInventoryValue = books.reduce((sum: number, book: any) => 
        sum + (book.price * book.quantity), 0
      );

      return {
        totalBooks: books.length,
        totalAuthors: authors.length,
        totalUsers: 0, // Placeholder - você pode adicionar endpoint de usuários depois
        booksInStock,
        booksOutOfStock,
        lowStockBooks: inventory.lowStockBooks || 0,
        totalInventoryValue,
        recentRegistrations: 0 // Placeholder
      };
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      throw error;
    }
  }

  // Relatório de Inventário
  async getInventoryReport(): Promise<InventoryReport> {
    try {
      const response = await fetch(`${API_BASE_URL}/book/inventory/report`, {
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar relatório de inventário');
      }

      return response.json();
    } catch (error) {
      console.error('Erro ao buscar relatório de inventário:', error);
      throw error;
    }
  }

  // Livros com Estoque Baixo
  async getLowStockBooks(threshold: number = 5): Promise<LowStockBook[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/book/inventory/low-stock?threshold=${threshold}`, {
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar livros com estoque baixo');
      }

      const books = await response.json();
      return books.map((book: any) => ({
        id: book.id,
        title: book.title,
        authorName: book.authorName,
        quantity: book.quantity,
        isbn: book.isbn
      }));
    } catch (error) {
      console.error('Erro ao buscar livros com estoque baixo:', error);
      throw error;
    }
  }

  // Adicionar Estoque
  async addBookStock(bookId: string, quantity: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/book/${bookId}/addQuantity?quantity=${quantity}`, {
        method: 'PATCH',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar estoque');
      }
    } catch (error) {
      console.error('Erro ao adicionar estoque:', error);
      throw error;
    }
  }

  // Vender Livros (remover estoque)
  async sellBooks(bookId: string, quantity: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/book/${bookId}/sellBook?quantity=${quantity}`, {
        method: 'PATCH',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Erro ao vender livros');
      }
    } catch (error) {
      console.error('Erro ao vender livros:', error);
      throw error;
    }
  }

  // Deletar Livro
  async deleteBook(bookId: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/book/${bookId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar livro');
      }
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
      throw error;
    }
  }

  // Deletar Autor
  async deleteAuthor(authorId: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/author/${authorId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar autor');
      }
    } catch (error) {
      console.error('Erro ao deletar autor:', error);
      throw error;
    }
  }
}

export const adminApi = new AdminApiService();