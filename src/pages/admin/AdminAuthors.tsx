import { authors, books } from '@/data/mockData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AdminAuthors = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="font-display text-2xl font-bold">Autores</h2>
        <p className="text-muted-foreground">Gerenciamento de autores</p>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Nacionalidade</TableHead>
              <TableHead>Data Nasc.</TableHead>
              <TableHead>Livros</TableHead>
              <TableHead>Biografia</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {authors.map(author => {
              const count = books.filter(b => b.author_id === author.id).length;
              return (
                <TableRow key={author.id}>
                  <TableCell className="font-medium">{author.name}</TableCell>
                  <TableCell>{author.nacionality}</TableCell>
                  <TableCell>{new Date(author.birth_date).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{count} livro(s)</TableCell>
                  <TableCell className="max-w-xs truncate text-sm text-muted-foreground">{author.biography}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminAuthors;
