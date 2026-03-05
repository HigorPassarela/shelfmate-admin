import { useState, useEffect } from 'react';
import { getBookCoverUrl } from '@/services/bookCovers';

export const useBookCover = (isbn: string, title: string, author: string) => {
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Não buscar se não tiver dados mínimos
    if (!title && !isbn) {
      setLoading(false);
      return;
    }

    const loadCover = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const url = await getBookCoverUrl(isbn, title, author);
        setCoverUrl(url);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar capa');
        setCoverUrl(null);
      } finally {
        setLoading(false);
      }
    };

    // Delay para evitar muitas requisições simultâneas
    const timeoutId = setTimeout(loadCover, 100);
    return () => clearTimeout(timeoutId);
    
  }, [isbn, title, author]);

  return { coverUrl, loading, error };
};