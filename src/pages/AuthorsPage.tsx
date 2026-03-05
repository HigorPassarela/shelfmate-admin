import { useState, useEffect } from 'react';
import { GENDER_LABELS, BookGender } from '@/types';
import { BookOpen, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { authorsApi, AuthorResponse } from '@/services/api';

// Função para converter AuthorResponse para o formato esperado pelo componente
const convertAuthorResponseToAuthor = (authorResponse: AuthorResponse) => ({
  id: authorResponse.id,
  name: authorResponse.name,
  biography: authorResponse.biography || '',
  birth_date: authorResponse.birthDate || '',
  nacionality: authorResponse.nacionality || 'Não informado',
  totalBooks: authorResponse.totalBooks,
  books: authorResponse.books || []
});

const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Carregar autores da API
  const loadAuthors = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Carregando autores da API...');
      
      const authorResponses = await authorsApi.getAllAuthors();
      console.log('Autores recebidos:', authorResponses);
      
      const convertedAuthors = authorResponses.map(convertAuthorResponseToAuthor);
      setAuthors(convertedAuthors);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      console.error('Erro ao carregar autores:', err);
    } finally {
      setLoading(false);
    }
  };

  // Carregar dados quando o componente montar
  useEffect(() => {
    loadAuthors();
  }, []);

  // Se estiver carregando
  if (loading) {
    return (
      <div className="container py-12">
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Carregando autores...</p>
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
          <h2 className="text-2xl font-bold text-destructive mb-4">Erro ao carregar autores</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={loadAuthors} variant="outline">
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 animate-fade-in">
      <div className="mb-10">
        <span className="text-sm font-semibold text-primary uppercase tracking-widest">Escritores</span>
        <h1 className="font-display text-4xl font-bold mt-1 text-foreground">Nossos Autores</h1>
        <p className="text-muted-foreground mt-2">Conheça os autores que fazem parte do nosso acervo ({authors.length} autores)</p>
      </div>

      <div className="grid gap-6">
        {authors.map(author => {
          const books = author.books || [];
          return (
            <div key={author.id} className="rounded-2xl border border-border bg-card p-6 md:p-8 transition-all hover:border-primary/20">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-24 h-24 shrink-0 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center ring-1 ring-primary/20">
                  <span className="font-display text-3xl font-bold text-primary">{author.name[0]}</span>
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-2xl font-bold text-foreground">{author.name}</h2>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2 mb-4">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {author.nacionality}
                    </span>
                    {author.birth_date && (
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(author.birth_date).toLocaleDateString('pt-BR')}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5" />
                      {author.totalBooks} livro(s)
                    </span>
                  </div>
                  {author.biography && (
                    <p className="text-muted-foreground leading-relaxed mb-5">{author.biography}</p>
                  )}
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                      Obras no acervo
                    </h4>
                    {books.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {books.map(book => (
                          <span key={book.id} className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3.5 py-1.5 text-sm font-medium text-secondary-foreground">
                            {book.title}
                            <span className="text-[10px] text-muted-foreground">
                              ({GENDER_LABELS[book.gender as BookGender] || book.gender})
                            </span>
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">Nenhum livro cadastrado no acervo</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {authors.length === 0 && !loading && (
        <div className="text-center py-20 text-muted-foreground">
          <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-30" />
          <p className="text-lg">Nenhum autor encontrado.</p>
          <p className="text-sm mt-1">Verifique se há autores cadastrados no sistema.</p>
        </div>
      )}
    </div>
  );
};

export default AuthorsPage;