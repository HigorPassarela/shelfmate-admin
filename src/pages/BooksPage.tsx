import { useState, useEffect } from 'react';
import { GENDER_LABELS, BookGender } from '@/types';
import { BookOpen, Filter, Search, ShoppingCart, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { booksApi, BookResponse } from '@/services/api';

// Função para converter BookResponse da API para o formato esperado pelo frontend
const convertBookResponseToBook = (bookResponse: BookResponse) => ({
  id: bookResponse.id,
  isbn: bookResponse.isbn,
  title: bookResponse.title,
  publicationDate: bookResponse.publicationDate,
  gender: bookResponse.gender as BookGender,
  price: bookResponse.price,
  quantity: bookResponse.quantity,
  book_status: bookResponse.bookStatus,
  author: {
    id: bookResponse.authorId,      // Agora vem da API
    name: bookResponse.authorName   // Agora vem da API
  }
});

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState<string>('ALL');
  const { addToCart, items } = useCart();
  const { toast } = useToast();

  // Carregar livros da API
  const loadBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Carregando livros da API...');
      
      const bookResponses = await booksApi.getAllBooks();
      console.log('BookResponses recebidos:', bookResponses);
      
      const convertedBooks = bookResponses.map(convertBookResponseToBook);
      console.log('Livros convertidos:', convertedBooks);
      
      setBooks(convertedBooks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      console.error('Erro ao carregar livros:', err);
    } finally {
      setLoading(false);
    }
  };

  // Carregar livros quando o componente montar
  useEffect(() => {
    loadBooks();
  }, []);

  // Filtrar livros localmente (agora inclui busca por autor)
  const filtered = books.filter(b => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author?.name.toLowerCase().includes(search.toLowerCase());
    const matchGenre = genre === 'ALL' || b.gender === genre;
    return matchSearch && matchGenre;
  });

  // Se estiver carregando
  if (loading) {
    return (
      <div className="container py-12">
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Carregando livros...</p>
        </div>
      </div>
    );
  }

  // Se houver erro
  if (error) {
    return (
      <div className="container py-12">
        <div className="text-center py-20">
          <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-30 text-destructive" />
          <h2 className="text-2xl font-bold text-destructive mb-4">Erro ao carregar livros</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={loadBooks} variant="outline">
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 animate-fade-in">
      <div className="mb-10">
        <span className="text-sm font-semibold text-primary uppercase tracking-widest">Catálogo</span>
        <h1 className="font-display text-4xl font-bold mt-1 text-foreground">Nosso Acervo</h1>
        <p className="text-muted-foreground mt-2">Explore nossa coleção com os melhores títulos ({books.length} livros)</p>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map(book => (
          <div key={book.id} className="group rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 hover:border-primary/30">
            <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-primary/8 to-primary/3 mb-5 flex items-center justify-center">
              <BookOpen className="h-14 w-14 text-primary/20 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-primary/15 text-primary rounded-full px-2.5 py-0.5">
                {GENDER_LABELS[book.gender] || book.gender}
              </span>
              {book.book_status === 'OUT_OF_STOCK' ? (
                <span className="badge-danger">Esgotado</span>
              ) : (
                <span className="badge-success">Disponível</span>
              )}
            </div>
            <h3 className="font-display text-xl font-bold leading-snug line-clamp-2 text-foreground">{book.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{book.author?.name}</p>
            <p className="text-xs text-muted-foreground mt-1">ISBN: {book.isbn}</p>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <span className="text-xl font-bold text-primary">R$ {book.price.toFixed(2)}</span>
              {book.book_status === 'IN_STOCK' ? (
                <Button
                  size="sm"
                  className="rounded-full gap-1.5 text-xs"
                  variant={items.some(i => i.book.id === book.id) ? 'secondary' : 'default'}
                  onClick={() => { 
                    addToCart(book); 
                    toast({ title: `"${book.title}" adicionado ao carrinho` }); 
                  }}
                >
                  {items.some(i => i.book.id === book.id) ? <Check className="h-3 w-3" /> : <ShoppingCart className="h-3 w-3" />}
                  {items.some(i => i.book.id === book.id) ? 'No carrinho' : 'Adicionar'}
                </Button>
              ) : (
                <span className="text-xs text-muted-foreground">Indisponível</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && !loading && (
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