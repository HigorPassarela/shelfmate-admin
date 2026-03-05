// src/services/api.ts
const API_BASE_URL = 'http://localhost:8081/api/v1';

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
  getAllBooks: async (): Promise<BookResponse[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/book`);
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
      throw new Error('Erro ao conectar com a API');
    }
  },

  searchByTitle: async (title: string): Promise<BookResponse[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/book/search/title?title=${encodeURIComponent(title)}`);
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Erro ao buscar livros por título:', error);
      throw new Error('Erro ao buscar livros por título');
    }
  },

  getBooksByGenre: async (genre: string): Promise<BookResponse[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/book/search/genre/${encodeURIComponent(genre)}`);
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Erro ao buscar livros por gênero:', error);
      throw new Error('Erro ao buscar livros por gênero');
    }
  }
};

export const authorsApi = {
  getAllAuthors: async (): Promise<AuthorResponse[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/author`);
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Erro ao buscar autores:', error);
      throw new Error('Erro ao conectar com a API');
    }
  },

  searchByName: async (name: string): Promise<AuthorResponse[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/author/name?name=${encodeURIComponent(name)}`);
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Erro ao buscar autores por nome:', error);
      throw new Error('Erro ao buscar autores por nome');
    }
  },

  getByNationality: async (nationality: string): Promise<AuthorResponse[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/author/nacionality?nacionality=${encodeURIComponent(nationality)}`);
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Erro ao buscar autores por nacionalidade:', error);
      throw new Error('Erro ao buscar autores por nacionalidade');
    }
  }
};