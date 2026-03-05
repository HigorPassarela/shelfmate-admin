import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { useBookCover } from '@/hooks/useBookCover';

interface BookCoverProps {
  isbn: string;
  title: string;
  author: string;
  className?: string;
  showTitle?: boolean;
}

export const BookCover: React.FC<BookCoverProps> = ({ 
  isbn, 
  title, 
  author, 
  className = "aspect-[3/4] rounded-xl",
  showTitle = false
}) => {
  const { coverUrl, loading } = useBookCover(isbn, title, author);
  const [imageError, setImageError] = useState(false);

  // Loading state
  if (loading) {
    return (
      <div className={`${className} bg-gradient-to-br from-primary/8 to-primary/3 flex items-center justify-center`}>
        <div className="animate-pulse">
          <BookOpen className="h-12 w-12 text-primary/30" />
        </div>
      </div>
    );
  }

  // Se tem URL da capa e não houve erro
  if (coverUrl && !imageError) {
    return (
      <div className={`${className} relative overflow-hidden bg-muted`}>
        <img 
          src={coverUrl}
          alt={`Capa do livro ${title}`}
          className="w-full h-full object-cover transition-transform duration-300"
          loading="lazy"
          onError={() => setImageError(true)}
          onLoad={() => setImageError(false)}
        />
        {showTitle && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <p className="text-white text-xs font-medium line-clamp-2">{title}</p>
          </div>
        )}
      </div>
    );
  }

  // Fallback - ícone de livro
  return (
    <div className={`${className} bg-gradient-to-br from-primary/8 to-primary/3 flex flex-col items-center justify-center p-4`}>
      <BookOpen className="h-12 w-12 text-primary/30 mb-2" />
      {showTitle && (
        <p className="text-xs text-center text-muted-foreground line-clamp-3 leading-tight">
          {title}
        </p>
      )}
    </div>
  );
};