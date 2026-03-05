import { Link, useLocation } from 'react-router-dom';
import { BookOpen, User, LogOut, Menu, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { CartDrawer } from '@/components/CartDrawer';
import { useState } from 'react';

export function PublicHeader() {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Início' },
    { to: '/livros', label: 'Livros' },
    { to: '/autores', label: 'Autores' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold text-foreground">Nova Era</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CartDrawer />
          {user ? (
            <div className="flex items-center gap-2">
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="outline" size="sm" className="rounded-full text-xs">Painel Admin</Button>
                </Link>
              )}
              <Link to="/perfil">
                <Button variant="ghost" size="icon" className="rounded-full" title="Perfil">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/configuracoes">
                <Button variant="ghost" size="icon" className="rounded-full" title="Configurações">
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
              <span className="text-sm text-muted-foreground hidden sm:inline px-2">{user.name}</span>
              <button onClick={logout} className="text-muted-foreground hover:text-destructive p-2 rounded-full hover:bg-destructive/10 transition-colors">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link to="/login">
              <Button size="sm" className="rounded-full gap-2 px-5">
                <User className="h-4 w-4" /> Entrar lindo
              </Button>
            </Link>
          )}
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background p-4 animate-fade-in">
          <nav className="flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
