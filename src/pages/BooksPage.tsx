import { useState } from 'react';
import { getBooksWithAuthors } from '@/data/mockData';
import { GENDER_LABELS, BookGender } from '@/types';
import { BookOpen, Filter, Search } from 'lucide-react';
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
    <div className="container py-12 animate-fade-in">
      <div className="mb-10">
        <span className="text-sm font-semibold text-accent uppercase tracking-wider">Catálogo</span>
        <h1 className="font-display text-4xl font-bold mt-1">Nosso Acervo</h1>
        <p className="text-muted-foreground mt-2">Explore nossa coleção com os melhores títulos</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-10">
        <div className="relative sm:max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por título ou autor..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 rounded-xl h-11"
          />
        </div>
        <Select value={genre} onValueChange={setGenre}>
          <SelectTrigger className="sm:w-52 rounded-xl h-11">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filtered.map(book => (
          <div key={book.id} className="group rounded-2xl border bg-card p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-primary/20">
            <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 mb-5 flex items-center justify-center">
              <BookOpen className="h-14 w-14 text-primary/30 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-accent/15 text-accent-foreground rounded-full px-2.5 py-0.5">
                {GENDER_LABELS[book.gender]}
              </span>
              {book.book_status === 'OUT_OF_STOCK' ? (
                <span className="badge-danger">Esgotado</span>
              ) : (
                <span className="badge-success">Disponível</span>
              )}
            </div>
            <h3 className="font-display text-lg font-bold leading-snug line-clamp-2">{book.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{book.author?.name}</p>
            <p className="text-xs text-muted-foreground mt-1">ISBN: {book.isbn}</p>
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <span className="text-xl font-bold text-primary">R$ {book.price.toFixed(2)}</span>
              <span className="text-xs text-muted-foreground">{book.quantity} em estoque</span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-30" />
          <p className="text-lg">Nenhum livro encontrado.</p>
          <p className="text-sm mt-1">Tente ajustar sua busca ou filtros.</p>
        </div>
      )}
    </div>
  );
};

export default BooksPage;
