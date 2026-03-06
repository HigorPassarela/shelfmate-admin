// src/services/api.ts
const API_BASE_URL = 'https://extralibrary-dev.up.railway.app/api/v1';

// Adicionar interface para erros da API
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

// Função helper para tratamento de erros
const handleApiError = (error: unknown, context: string): never => {
  if (error instanceof Error) {
    throw new Error(`${context}: ${error.message}`);
  }
  throw new Error(`${context}: Erro desconhecido`);
};

// Função helper para fazer requisições
const apiRequest = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Erro de conexão com a API');
    }
    throw error;
  }
};

export interface BookResponse {
  id: string;
  isbn: string;
  title: string;
  publicationDate: string;
  gender: string;
  price: number;
  quantity: number;
  bookStatus: 'IN_STOCK' | 'OUT_OF_STOCK';
  authorId: string;
  authorName: string;
}

export interface AuthorResponse {
  id: string;
  name: string;
  biography: string;
  nacionality: string;
  birthDate: string;
  totalBooks: number;
  books: BookResponse[];
}

export const booksApi = {
  getAllBooks: (): Promise<BookResponse[]> => 
    apiRequest<BookResponse[]>('/book'),

  searchByTitle: (title: string): Promise<BookResponse[]> => 
    apiRequest<BookResponse[]>(`/book/search/title?title=${encodeURIComponent(title)}`),

  getBooksByGenre: (genre: string): Promise<BookResponse[]> => 
    apiRequest<BookResponse[]>(`/book/search/genre/${encodeURIComponent(genre)}`),

  getBookById: (id: string): Promise<BookResponse> => 
    apiRequest<BookResponse>(`/book/${id}`),
};

export const authorsApi = {
  getAllAuthors: (): Promise<AuthorResponse[]> => 
    apiRequest<AuthorResponse[]>('/author'),

  searchByName: (name: string): Promise<AuthorResponse[]> => 
    apiRequest<AuthorResponse[]>(`/author/name?name=${encodeURIComponent(name)}`),

  getByNationality: (nationality: string): Promise<AuthorResponse[]> => 
    apiRequest<AuthorResponse[]>(`/author/nacionality?nacionality=${encodeURIComponent(nationality)}`),

  getAuthorById: (id: string): Promise<AuthorResponse> => 
    apiRequest<AuthorResponse>(`/author/${id}`),
};