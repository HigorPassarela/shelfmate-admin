export type BookStatus = 'IN_STOCK' | 'OUT_OF_STOCK';
export type BookGender = 'FICTION' | 'ROMANCE' | 'MYSTERY' | 'FANTASY' | 'BIOGRAPHY' | 'HISTORY' | 'TECHNICAL' | 'CHILDREN' | 'CLASSIC';
export type CustomerStatus = 'ACTIVE' | 'BLOCKED' | 'DISABLED';
export type FormPayment = 'CASH' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'PIX' | 'BANK_TRANSFER';

export interface Author {
  id: string;
  name: string;
  biography?: string;
  nacionality: string;
  birth_date: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  cpf?: string;
  phone: string;
  date_birth: string;
  address: string;
  status: CustomerStatus;
  created_at?: string;
  updated_at?: string;
}

export interface Book {
  id: string;
  isbn: string;
  title: string;
  publication_date: string;
  gender: BookGender;
  price: number;
  quantity: number;
  book_status: BookStatus;
  author_id: string;
  author?: Author;
}

export interface Sold {
  id: number;
  date_sale: string;
  subtotal: number;
  discount?: number;
  final_price: number;
  form_payment: FormPayment;
  created_at?: string;
  customer_id: string;
  customer?: Customer;
  items?: SoldBookQuantity[];
}

export interface SoldBookQuantity {
  sold_id: number;
  book_id: string;
  quantity: number;
  book?: Book;
}

export const GENDER_LABELS: Record<BookGender, string> = {
  FICTION: 'Ficção',
  ROMANCE: 'Romance',
  MYSTERY: 'Mistério',
  FANTASY: 'Fantasia',
  BIOGRAPHY: 'Biografia',
  HISTORY: 'História',
  TECHNICAL: 'Técnico',
  CHILDREN: 'Infantil',
  CLASSIC: 'Clássico',
};

export const PAYMENT_LABELS: Record<FormPayment, string> = {
  CASH: 'Dinheiro',
  CREDIT_CARD: 'Cartão de Crédito',
  DEBIT_CARD: 'Cartão de Débito',
  PIX: 'PIX',
  BANK_TRANSFER: 'Transferência',
};

export const STATUS_LABELS: Record<CustomerStatus, string> = {
  ACTIVE: 'Ativo',
  BLOCKED: 'Bloqueado',
  DISABLED: 'Desativado',
};
