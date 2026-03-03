import { Author, Book, Customer, Sold, SoldBookQuantity } from '@/types';

export const authors: Author[] = [
  { id: 'a1', name: 'Machado de Assis', biography: 'Considerado o maior escritor brasileiro, autor de Dom Casmurro e Memórias Póstumas de Brás Cubas.', nacionality: 'Brasileiro', birth_date: '1839-06-21' },
  { id: 'a2', name: 'Clarice Lispector', biography: 'Uma das escritoras mais importantes da literatura brasileira, conhecida por sua prosa introspectiva.', nacionality: 'Brasileira', birth_date: '1920-12-10' },
  { id: 'a3', name: 'Jorge Amado', biography: 'Escritor baiano, autor de Gabriela, Cravo e Canela e Capitães da Areia.', nacionality: 'Brasileiro', birth_date: '1912-08-10' },
  { id: 'a4', name: 'Gabriel García Márquez', biography: 'Escritor colombiano, Nobel de Literatura, autor de Cem Anos de Solidão.', nacionality: 'Colombiano', birth_date: '1927-03-06' },
  { id: 'a5', name: 'José Saramago', biography: 'Escritor português, Nobel de Literatura, autor de Ensaio sobre a Cegueira.', nacionality: 'Português', birth_date: '1922-11-16' },
];

export const books: Book[] = [
  { id: 'b1', isbn: '978-85-359-0277-1', title: 'Dom Casmurro', publication_date: '1899-01-01', gender: 'CLASSIC', price: 34.90, quantity: 25, book_status: 'IN_STOCK', author_id: 'a1' },
  { id: 'b2', isbn: '978-85-359-0278-8', title: 'Memórias Póstumas de Brás Cubas', publication_date: '1881-01-01', gender: 'CLASSIC', price: 29.90, quantity: 18, book_status: 'IN_STOCK', author_id: 'a1' },
  { id: 'b3', isbn: '978-85-325-2536-4', title: 'A Hora da Estrela', publication_date: '1977-01-01', gender: 'FICTION', price: 39.90, quantity: 12, book_status: 'IN_STOCK', author_id: 'a2' },
  { id: 'b4', isbn: '978-85-325-2537-1', title: 'Perto do Coração Selvagem', publication_date: '1943-01-01', gender: 'FICTION', price: 42.90, quantity: 0, book_status: 'OUT_OF_STOCK', author_id: 'a2' },
  { id: 'b5', isbn: '978-85-359-1234-3', title: 'Capitães da Areia', publication_date: '1937-01-01', gender: 'FICTION', price: 36.90, quantity: 30, book_status: 'IN_STOCK', author_id: 'a3' },
  { id: 'b6', isbn: '978-85-359-1235-0', title: 'Gabriela, Cravo e Canela', publication_date: '1958-01-01', gender: 'ROMANCE', price: 44.90, quantity: 8, book_status: 'IN_STOCK', author_id: 'a3' },
  { id: 'b7', isbn: '978-84-376-0494-7', title: 'Cem Anos de Solidão', publication_date: '1967-01-01', gender: 'FICTION', price: 54.90, quantity: 15, book_status: 'IN_STOCK', author_id: 'a4' },
  { id: 'b8', isbn: '978-84-376-0495-4', title: 'O Amor nos Tempos do Cólera', publication_date: '1985-01-01', gender: 'ROMANCE', price: 49.90, quantity: 0, book_status: 'OUT_OF_STOCK', author_id: 'a4' },
  { id: 'b9', isbn: '978-972-20-1364-2', title: 'Ensaio sobre a Cegueira', publication_date: '1995-01-01', gender: 'FICTION', price: 47.90, quantity: 20, book_status: 'IN_STOCK', author_id: 'a5' },
  { id: 'b10', isbn: '978-972-20-1365-9', title: 'Memorial do Convento', publication_date: '1982-01-01', gender: 'HISTORY', price: 52.90, quantity: 5, book_status: 'IN_STOCK', author_id: 'a5' },
];

export const customers: Customer[] = [
  { id: 'c1', name: 'Ana Silva', email: 'ana@email.com', cpf: '12345678901', phone: '11999990001', date_birth: '1990-05-15', address: 'Rua das Flores, 123 - São Paulo/SP', status: 'ACTIVE', created_at: '2024-01-10T10:00:00' },
  { id: 'c2', name: 'Carlos Oliveira', email: 'carlos@email.com', cpf: '23456789012', phone: '21988880002', date_birth: '1985-08-22', address: 'Av. Brasil, 456 - Rio de Janeiro/RJ', status: 'ACTIVE', created_at: '2024-02-15T14:30:00' },
  { id: 'c3', name: 'Maria Santos', email: 'maria@email.com', cpf: '34567890123', phone: '31977770003', date_birth: '1992-12-01', address: 'Rua Minas, 789 - Belo Horizonte/MG', status: 'BLOCKED', created_at: '2024-03-20T09:15:00' },
  { id: 'c4', name: 'Pedro Costa', email: 'pedro@email.com', cpf: '45678901234', phone: '41966660004', date_birth: '1988-03-10', address: 'Rua Paraná, 321 - Curitiba/PR', status: 'ACTIVE', created_at: '2024-04-05T16:45:00' },
  { id: 'c5', name: 'Julia Ferreira', email: 'julia@email.com', cpf: '56789012345', phone: '51955550005', date_birth: '1995-07-28', address: 'Rua Gaúcha, 654 - Porto Alegre/RS', status: 'DISABLED', created_at: '2024-05-12T11:20:00' },
];

export const sales: Sold[] = [
  { id: 1, date_sale: '2024-12-01T10:30:00', subtotal: 64.80, discount: 5.00, final_price: 59.80, form_payment: 'PIX', customer_id: 'c1', created_at: '2024-12-01T10:30:00' },
  { id: 2, date_sale: '2024-12-03T14:00:00', subtotal: 54.90, discount: 0, final_price: 54.90, form_payment: 'CREDIT_CARD', customer_id: 'c2', created_at: '2024-12-03T14:00:00' },
  { id: 3, date_sale: '2024-12-05T09:45:00', subtotal: 127.70, discount: 10.00, final_price: 117.70, form_payment: 'DEBIT_CARD', customer_id: 'c4', created_at: '2024-12-05T09:45:00' },
  { id: 4, date_sale: '2024-12-10T16:20:00', subtotal: 39.90, final_price: 39.90, form_payment: 'CASH', customer_id: 'c1', created_at: '2024-12-10T16:20:00' },
  { id: 5, date_sale: '2024-12-15T11:00:00', subtotal: 97.80, discount: 8.00, final_price: 89.80, form_payment: 'PIX', customer_id: 'c2', created_at: '2024-12-15T11:00:00' },
  { id: 6, date_sale: '2025-01-05T13:30:00', subtotal: 44.90, final_price: 44.90, form_payment: 'CREDIT_CARD', customer_id: 'c4', created_at: '2025-01-05T13:30:00' },
  { id: 7, date_sale: '2025-01-12T10:15:00', subtotal: 82.80, discount: 5.00, final_price: 77.80, form_payment: 'PIX', customer_id: 'c1', created_at: '2025-01-12T10:15:00' },
  { id: 8, date_sale: '2025-02-01T15:00:00', subtotal: 149.70, discount: 15.00, final_price: 134.70, form_payment: 'BANK_TRANSFER', customer_id: 'c2', created_at: '2025-02-01T15:00:00' },
];

export const soldBookQuantities: SoldBookQuantity[] = [
  { sold_id: 1, book_id: 'b1', quantity: 1 },
  { sold_id: 1, book_id: 'b2', quantity: 1 },
  { sold_id: 2, book_id: 'b7', quantity: 1 },
  { sold_id: 3, book_id: 'b3', quantity: 1 },
  { sold_id: 3, book_id: 'b5', quantity: 1 },
  { sold_id: 3, book_id: 'b9', quantity: 1 },
  { sold_id: 4, book_id: 'b3', quantity: 1 },
  { sold_id: 5, book_id: 'b9', quantity: 1 },
  { sold_id: 5, book_id: 'b10', quantity: 1 },
  { sold_id: 6, book_id: 'b6', quantity: 1 },
  { sold_id: 7, book_id: 'b1', quantity: 1 },
  { sold_id: 7, book_id: 'b9', quantity: 1 },
  { sold_id: 8, book_id: 'b7', quantity: 1 },
  { sold_id: 8, book_id: 'b9', quantity: 1 },
  { sold_id: 8, book_id: 'b10', quantity: 1 },
];

// Helper to get enriched data
export function getBooksWithAuthors(): Book[] {
  return books.map(b => ({ ...b, author: authors.find(a => a.id === b.author_id) }));
}

export function getSalesWithDetails(): Sold[] {
  return sales.map(s => ({
    ...s,
    customer: customers.find(c => c.id === s.customer_id),
    items: soldBookQuantities
      .filter(sq => sq.sold_id === s.id)
      .map(sq => ({ ...sq, book: books.find(b => b.id === sq.book_id) })),
  }));
}
