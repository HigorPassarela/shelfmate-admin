import { Outlet } from 'react-router-dom';
import { PublicHeader } from '@/components/PublicHeader';

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <p>© 2025 Livraria Nova Era. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
