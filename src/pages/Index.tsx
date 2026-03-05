import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GENDER_LABELS, BookGender } from '@/types';
import { booksApi, authorsApi, BookResponse, AuthorResponse } from '@/services/api';
import { BookCover } from '@/components/BookCover'; // ✅ Adicionar este import

// Função para converter BookResponse para o formato esperado
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
    id: bookResponse.authorId,
    name: bookResponse.authorName
  }
});

// Função para converter AuthorResponse para o formato esperado
const convertAuthorResponseToAuthor = (authorResponse: AuthorResponse) => ({
  id: authorResponse.id,
  name: authorResponse.name,
  biography: authorResponse.biography || '',
  birth_date: authorResponse.birthDate || '',
  nacionality: authorResponse.nacionality || 'Não informado',
  totalBooks: authorResponse.totalBooks,
  books: authorResponse.books || []
});

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar dados da API
  const loadHomePageData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Carregando dados da página inicial...');

      // Carregar livros e autores em paralelo
      const [booksResponse, authorsResponse] = await Promise.all([
        booksApi.getAllBooks(),
        authorsApi.getAllAuthors()
      ]);

      console.log('Livros recebidos:', booksResponse);
      console.log('Autores recebidos:', authorsResponse);

      // Converter dados
      const convertedBooks = booksResponse.map(convertBookResponseToBook);
      const convertedAuthors = authorsResponse.map(convertAuthorResponseToAuthor);

      setBooks(convertedBooks);
      setAuthors(convertedAuthors);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      console.error('Erro ao carregar dados da página inicial:', err);
    } finally {
      setLoading(false);
    }
  };

  // Carregar dados quando o componente montar
  useEffect(() => {
    loadHomePageData();
  }, []);

  // Filtrar livros em destaque (disponíveis e primeiros 4)
  const featured = books
    .filter(b => b.book_status === 'IN_STOCK')
    .slice(0, 4);

  // Se estiver carregando
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Carregando página inicial...</p>
        </div>
      </div>
    );
  }

  // Se houver erro
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-30 text-destructive" />
          <h2 className="text-2xl font-bold text-destructive mb-4">Erro ao carregar dados</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={loadHomePageData} variant="outline">
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden py-28 md:py-40 bg-gradient-to-b from-background via-card to-background">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a843' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        {/* Gold line accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-primary/40" />
        <div className="container relative text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 px-5 py-2 mb-8 text-sm font-medium text-primary bg-primary/5">
            <Sparkles className="h-4 w-4" /> 
            {books.length > 0 ? `${books.length} livros disponíveis` : 'Novidades toda semana'}
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-foreground tracking-tight">
            Descubra sua <br className="hidden md:block" />
            <span className="text-primary italic">próxima história</span>
          </h1>
          <p className="text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed text-muted-foreground">
            Os melhores títulos da literatura brasileira e mundial reunidos em um só lugar.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/livros">
              <Button size="lg" className="gap-2 px-8 font-semibold text-base rounded-full">
                Explorar Acervo <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/autores">
              <Button size="lg" variant="outline" className="gap-2 px-8 font-semibold text-base rounded-full border-primary/30 text-primary hover:bg-primary/10">
                Nossos Autores
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-t from-transparent to-primary/40" />
      </section>

      {/* Featured Books */}
      <section className="container py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Seleção Especial</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-1 tracking-tight">Destaques da Semana</h2>
          </div>
          <Link to="/livros" className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all text-sm">
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        {featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(book => (
              <div key={book.id} className="group rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 hover:border-primary/30">
                
                {/* 🔄 AQUI ESTÁ A MUDANÇA - Substitua a div complexa pela BookCover */}
                <div className="relative mb-5">
                  <BookCover 
                    isbn={book.isbn}
                    title={book.title}
                    author={book.author?.name || ''}
                    className="aspect-[3/4] rounded-xl group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Badge do gênero sobreposto */}
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-primary/15 text-primary rounded-full px-2.5 py-1 backdrop-blur-sm">
                      {GENDER_LABELS[book.gender] || book.gender}
                    </span>
                  </div>
                </div>
                
                <h3 className="font-display text-xl font-bold leading-snug line-clamp-2">{book.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{book.author?.name}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <span className="text-xl font-bold text-primary">R$ {book.price.toFixed(2)}</span>
                  <div className="flex text-primary/60 gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-30" />
            <p className="text-muted-foreground">Nenhum livro disponível no momento.</p>
          </div>
        )}
      </section>

      {/* Authors highlight */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Talentos Literários</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-1 tracking-tight">Nossos Autores</h2>
          </div>
          
          {authors.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              {authors.slice(0, 5).map(author => (
                <Link key={author.id} to="/autores" className="text-center group">
                  <div className="w-24 h-24 mx-auto rounded-full bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-all duration-300 group-hover:scale-105 ring-1 ring-primary/15 group-hover:ring-primary/40">
                    <span className="font-display text-3xl font-bold text-primary">{author.name[0]}</span>
                  </div>
                  <p className="font-semibold text-sm text-foreground">{author.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{author.nacionality}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-30" />
              <p className="text-muted-foreground">Nenhum autor cadastrado no momento.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="container py-20">
        <div className="rounded-3xl p-10 md:p-16 text-center border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-primary/5">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3 text-foreground">
            Pronto para explorar?
          </h2>
          <p className="mb-8 max-w-md mx-auto text-muted-foreground">
            Crie sua conta e tenha acesso ao nosso acervo completo com ofertas exclusivas.
          </p>
          <Link to="/login">
            <Button size="lg" className="rounded-full px-8 font-semibold">
              Criar Conta Grátis
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;