import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getBooksWithAuthors, authors } from '@/data/mockData';
import { GENDER_LABELS } from '@/types';

const HomePage = () => {
  const books = getBooksWithAuthors();
  const featured = books.filter(b => b.book_status === 'IN_STOCK').slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden py-28 md:py-36" style={{
        background: 'linear-gradient(135deg, hsl(155, 30%, 32%) 0%, hsl(155, 22%, 22%) 50%, hsl(160, 18%, 16%) 100%)'
      }}>
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        <div className="container relative text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-sm font-medium" style={{
            background: 'hsl(38, 65%, 55%, 0.2)',
            color: 'hsl(38, 65%, 75%)',
          }}>
            <Sparkles className="h-4 w-4" /> Novidades toda semana
          </div>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6" style={{ color: 'hsl(45, 40%, 97%)' }}>
            Descubra sua <br className="hidden md:block" />
            <span style={{ color: 'hsl(38, 65%, 65%)' }}>próxima história</span>
          </h1>
          <p className="text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed" style={{ color: 'hsl(45, 20%, 80%)' }}>
            Os melhores títulos da literatura brasileira e mundial reunidos em um só lugar.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/livros">
              <Button size="lg" className="gap-2 px-8 font-semibold text-base rounded-full">
                Explorar Acervo <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/autores">
              <Button size="lg" variant="outline" className="gap-2 px-8 font-semibold text-base rounded-full border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                Nossos Autores
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="container py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Seleção Especial</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-1">Destaques da Semana</h2>
          </div>
          <Link to="/livros" className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all text-sm">
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map(book => (
            <div key={book.id} className="group rounded-2xl border bg-card p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-primary/20">
              <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 mb-5 flex items-center justify-center relative overflow-hidden">
                <BookOpen className="h-14 w-14 text-primary/30 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider bg-accent/15 text-accent-foreground rounded-full px-2.5 py-1">
                    {GENDER_LABELS[book.gender]}
                  </span>
                </div>
              </div>
              <h3 className="font-display text-lg font-bold leading-snug line-clamp-2">{book.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{book.author?.name}</p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <span className="text-xl font-bold text-primary">R$ {book.price.toFixed(2)}</span>
                <div className="flex text-accent gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Authors highlight */}
      <section className="py-20" style={{ background: 'hsl(45, 25%, 95%)' }}>
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Talentos Literários</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-1">Nossos Autores</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {authors.slice(0, 5).map(author => (
              <Link key={author.id} to="/autores" className="text-center group">
                <div className="w-24 h-24 mx-auto rounded-full bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-all duration-300 group-hover:scale-105 ring-2 ring-primary/10 group-hover:ring-primary/25">
                  <span className="font-display text-2xl font-bold text-primary">{author.name[0]}</span>
                </div>
                <p className="font-semibold text-sm">{author.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{author.nacionality}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-20">
        <div className="rounded-3xl p-10 md:p-16 text-center" style={{
          background: 'linear-gradient(135deg, hsl(155, 30%, 32%) 0%, hsl(155, 25%, 26%) 100%)'
        }}>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3" style={{ color: 'hsl(45, 40%, 97%)' }}>
            Pronto para explorar?
          </h2>
          <p className="mb-8 max-w-md mx-auto" style={{ color: 'hsl(45, 20%, 80%)' }}>
            Crie sua conta e tenha acesso ao nosso acervo completo com ofertas exclusivas.
          </p>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="rounded-full px-8 font-semibold">
              Criar Conta Grátis
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
