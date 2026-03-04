import { Outlet } from 'react-router-dom';
import { PublicHeader } from '@/components/PublicHeader';
import { BookOpen } from 'lucide-react';

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-border bg-card py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display text-sm font-bold text-foreground">Livraria Nova Era</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 Livraria Nova Era. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
