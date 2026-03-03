import { getBooksWithAuthors } from '@/data/mockData';
import { GENDER_LABELS } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AdminBooks = () => {
  const books = getBooksWithAuthors();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="font-display text-2xl font-bold">Livros</h2>
        <p className="text-muted-foreground">Gerenciamento do acervo</p>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead>Gênero</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="text-right">Qtd</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map(book => (
              <TableRow key={book.id}>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.author?.name}</TableCell>
                <TableCell>{GENDER_LABELS[book.gender]}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{book.isbn}</TableCell>
                <TableCell className="text-right">R$ {book.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">{book.quantity}</TableCell>
                <TableCell>
                  {book.book_status === 'IN_STOCK' ? (
                    <span className="badge-success">Em estoque</span>
                  ) : (
                    <span className="badge-danger">Esgotado</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminBooks;
