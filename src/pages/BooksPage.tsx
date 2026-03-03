import { useState } from 'react';
import { getBooksWithAuthors } from '@/data/mockData';
import { GENDER_LABELS, BookGender } from '@/types';
import { BookOpen, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const BooksPage = () => {
  const allBooks = getBooksWithAuthors();
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState<string>('ALL');

  const filtered = allBooks.filter(b => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author?.name.toLowerCase().includes(search.toLowerCase());
    const matchGenre = genre === 'ALL' || b.gender === genre;
    return matchSearch && matchGenre;
  });

  return (
    <div className="container py-10 animate-fade-in">
      <h1 className="font-display text-4xl font-bold mb-2">Nosso Acervo</h1>
      <p className="text-muted-foreground mb-8">Explore nossa coleção de livros</p>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Input
          placeholder="Buscar por título ou autor..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="sm:max-w-sm"
        />
        <Select value={genre} onValueChange={setGenre}>
          <SelectTrigger className="sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Gênero" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos os Gêneros</SelectItem>
            {Object.entries(GENDER_LABELS).map(([key, label]) => (
              <SelectItem key={key} value={key}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map(book => (
          <div key={book.id} className="rounded-lg border bg-card p-5 transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="aspect-[3/4] rounded-md bg-primary/10 mb-4 flex items-center justify-center">
              <BookOpen className="h-12 w-12 text-primary/40" />
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-accent">{GENDER_LABELS[book.gender]}</span>
              {book.book_status === 'OUT_OF_STOCK' ? (
                <span className="badge-danger">Esgotado</span>
              ) : (
                <span className="badge-success">Disponível</span>
              )}
            </div>
            <h3 className="font-display text-lg font-semibold line-clamp-2">{book.title}</h3>
            <p className="text-sm text-muted-foreground">{book.author?.name}</p>
            <p className="text-xs text-muted-foreground mt-1">ISBN: {book.isbn}</p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xl font-bold text-primary">R$ {book.price.toFixed(2)}</span>
              <span className="text-xs text-muted-foreground">{book.quantity} em estoque</span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Nenhum livro encontrado.</p>
        </div>
      )}
    </div>
  );
};

export default BooksPage;
