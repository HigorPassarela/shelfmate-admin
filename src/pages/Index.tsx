import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getBooksWithAuthors, authors } from '@/data/mockData';
import { GENDER_LABELS } from '@/types';

const HomePage = () => {
  const books = getBooksWithAuthors();
  const featured = books.filter(b => b.book_status === 'IN_STOCK').slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-24 md:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.05) 35px, rgba(255,255,255,0.05) 70px)'
          }} />
        </div>
        <div className="container relative text-center">
          <BookOpen className="mx-auto mb-6 h-16 w-16 text-accent" />
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
            Livraria Nova Era
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Descubra mundos através das páginas. Os melhores títulos da literatura brasileira e mundial.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/livros">
              <Button size="lg" variant="secondary" className="gap-2 font-semibold">
                Explorar Acervo <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold">Destaques</h2>
            <p className="text-muted-foreground mt-1">Livros selecionados para você</p>
          </div>
          <Link to="/livros" className="text-primary font-medium flex items-center gap-1 hover:underline">
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(book => (
            <div key={book.id} className="group rounded-lg border bg-card p-5 transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="aspect-[3/4] rounded-md bg-primary/10 mb-4 flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-primary/40" />
              </div>
              <span className="text-xs font-medium text-accent">{GENDER_LABELS[book.gender]}</span>
              <h3 className="font-display text-lg font-semibold mt-1 line-clamp-2">{book.title}</h3>
              <p className="text-sm text-muted-foreground">{book.author?.name}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-lg font-bold text-primary">R$ {book.price.toFixed(2)}</span>
                <div className="flex text-accent">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Authors highlight */}
      <section className="bg-secondary/50 py-16">
        <div className="container">
          <h2 className="font-display text-3xl font-bold mb-8 text-center">Nossos Autores</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {authors.slice(0, 5).map(author => (
              <Link key={author.id} to="/autores" className="text-center group">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <span className="font-display text-2xl font-bold text-primary">{author.name[0]}</span>
                </div>
                <p className="font-medium text-sm">{author.name}</p>
                <p className="text-xs text-muted-foreground">{author.nacionality}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
