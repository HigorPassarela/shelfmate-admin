const coverCache = new Map<string, string | null>();

export const getBookCoverUrl = async (
  isbn: string, 
  title: string, 
  author: string
): Promise<string | null> => {
  const cacheKey = `${isbn}-${title}-${author}`;
  
  // Verificar cache primeiro
  if (coverCache.has(cacheKey)) {
    return coverCache.get(cacheKey) || null;
  }

  try {
    // 1. Tentar Google Books API (melhor qualidade)
    let coverUrl = await getGoogleBooksCover(isbn, title, author);
    
    // 2. Se não encontrar, tentar Open Library
    if (!coverUrl && isbn) {
      coverUrl = await getOpenLibraryCover(isbn);
    }
    
    // 3. Se ainda não encontrar, tentar busca alternativa no Google Books
    if (!coverUrl && title && author) {
      coverUrl = await getGoogleBooksAlternative(title, author);
    }
    
    // Salvar no cache
    coverCache.set(cacheKey, coverUrl);
    return coverUrl;
    
  } catch (error) {
    console.error('Erro ao buscar capa:', error);
    coverCache.set(cacheKey, null);
    return null;
  }
};

// Google Books API - Busca principal
const getGoogleBooksCover = async (
  isbn: string, 
  title: string, 
  author: string
): Promise<string | null> => {
  try {
    // Buscar por ISBN primeiro (mais preciso)
    let query = isbn ? `isbn:${isbn}` : `intitle:"${title}"+inauthor:"${author}"`;
    
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=1`
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      const imageLinks = data.items[0].volumeInfo.imageLinks;
      if (imageLinks) {
        // Retorna a melhor qualidade disponível
        const coverUrl = imageLinks.extraLarge || 
                         imageLinks.large || 
                         imageLinks.medium || 
                         imageLinks.small || 
                         imageLinks.thumbnail;
        
        // Converter para HTTPS se necessário
        return coverUrl ? coverUrl.replace('http://', 'https://') : null;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Erro Google Books:', error);
    return null;
  }
};

// Open Library - Fallback
const getOpenLibraryCover = async (isbn: string): Promise<string | null> => {
  try {
    // Tentar diferentes tamanhos
    const sizes = ['L', 'M', 'S'];
    
    for (const size of sizes) {
      const url = `https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg`;
      
      // Verificar se a imagem existe
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok && response.headers.get('content-type')?.startsWith('image/')) {
        return url;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Erro Open Library:', error);
    return null;
  }
};

// Google Books - Busca alternativa sem ISBN
const getGoogleBooksAlternative = async (
  title: string, 
  author: string
): Promise<string | null> => {
  try {
    // Busca mais flexível
    const queries = [
      `"${title}" "${author}"`,
      `${title} ${author}`,
      title
    ];
    
    for (const query of queries) {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=5`
      );
      
      if (!response.ok) continue;
      
      const data = await response.json();
      
      if (data.items) {
        // Procurar por correspondência mais próxima
        for (const item of data.items) {
          const bookInfo = item.volumeInfo;
          const bookTitle = bookInfo.title?.toLowerCase() || '';
          const bookAuthors = bookInfo.authors?.join(' ').toLowerCase() || '';
          
          // Verificar se é uma correspondência razoável
          if (bookTitle.includes(title.toLowerCase().substring(0, 10)) ||
              bookAuthors.includes(author.toLowerCase().split(' ')[0])) {
            
            const imageLinks = bookInfo.imageLinks;
            if (imageLinks) {
              const coverUrl = imageLinks.large || 
                              imageLinks.medium || 
                              imageLinks.small || 
                              imageLinks.thumbnail;
              
              return coverUrl ? coverUrl.replace('http://', 'https://') : null;
            }
          }
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error('Erro Google Books Alternative:', error);
    return null;
  }
};

// Função para limpar cache (opcional)
export const clearCoverCache = () => {
  coverCache.clear();
};