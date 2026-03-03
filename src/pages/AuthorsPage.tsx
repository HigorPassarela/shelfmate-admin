import { authors, books } from '@/data/mockData';
import { GENDER_LABELS } from '@/types';

const AuthorsPage = () => {
  return (
    <div className="container py-10 animate-fade-in">
      <h1 className="font-display text-4xl font-bold mb-2">Autores</h1>
      <p className="text-muted-foreground mb-8">Conheça os autores do nosso acervo</p>

      <div className="grid gap-6">
        {authors.map(author => {
          const authorBooks = books.filter(b => b.author_id === author.id);
          return (
            <div key={author.id} className="rounded-lg border bg-card p-6 transition-all hover:shadow-md">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-24 h-24 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-display text-3xl font-bold text-primary">{author.name[0]}</span>
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-2xl font-bold">{author.name}</h2>
                  <div className="flex gap-4 text-sm text-muted-foreground mt-1 mb-3">
                    <span>{author.nacionality}</span>
                    <span>Nasc. {new Date(author.birth_date).toLocaleDateString('pt-BR')}</span>
                  </div>
                  {author.biography && <p className="text-foreground/80 mb-4">{author.biography}</p>}
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Livros no acervo:</h4>
                    <div className="flex flex-wrap gap-2">
                      {authorBooks.map(b => (
                        <span key={b.id} className="inline-flex items-center gap-1 rounded-md bg-secondary px-3 py-1 text-sm">
                          {b.title}
                          <span className="text-xs text-muted-foreground">({GENDER_LABELS[b.gender]})</span>
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
