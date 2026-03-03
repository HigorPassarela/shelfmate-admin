import { authors, books } from '@/data/mockData';
import { GENDER_LABELS } from '@/types';
import { BookOpen, MapPin, Calendar } from 'lucide-react';

const AuthorsPage = () => {
  return (
    <div className="container py-12 animate-fade-in">
      <div className="mb-10">
        <span className="text-sm font-semibold text-accent uppercase tracking-wider">Escritores</span>
        <h1 className="font-display text-4xl font-bold mt-1">Nossos Autores</h1>
        <p className="text-muted-foreground mt-2">Conheça os autores que fazem parte do nosso acervo</p>
      </div>

      <div className="grid gap-6">
        {authors.map(author => {
          const authorBooks = books.filter(b => b.author_id === author.id);
          return (
            <div key={author.id} className="rounded-2xl border bg-card p-6 md:p-8 transition-all hover:shadow-md hover:border-primary/15">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-24 h-24 shrink-0 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center ring-2 ring-primary/10">
                  <span className="font-display text-3xl font-bold text-primary">{author.name[0]}</span>
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-2xl font-bold">{author.name}</h2>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2 mb-4">
                    <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{author.nacionality}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{new Date(author.birth_date).toLocaleDateString('pt-BR')}</span>
                    <span className="flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5" />{authorBooks.length} livro(s)</span>
                  </div>
                  {author.biography && <p className="text-foreground/75 leading-relaxed mb-5">{author.biography}</p>}
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Obras no acervo</h4>
                    <div className="flex flex-wrap gap-2">
                      {authorBooks.map(b => (
                        <span key={b.id} className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3.5 py-1.5 text-sm font-medium">
                          {b.title}
                          <span className="text-[10px] text-muted-foreground">({GENDER_LABELS[b.gender]})</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AuthorsPage;
