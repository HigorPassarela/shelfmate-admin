import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Search, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export function PublicHeader() {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Início' },
    { to: '/livros', label: 'Livros' },
    { to: '/autores', label: 'Autores' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">Livraria Nova Era</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.to ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {searchOpen && (
            <Input
              placeholder="Buscar livros..."
              className="w-48 animate-fade-in"
              autoFocus
              onBlur={() => setSearchOpen(false)}
            />
          )}
          <button onClick={() => setSearchOpen(!searchOpen)} className="text-muted-foreground hover:text-foreground">
            <Search className="h-5 w-5" />
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="outline" size="sm">Painel Admin</Button>
                </Link>
              )}
              <span className="text-sm text-muted-foreground hidden sm:inline">{user.name}</span>
              <button onClick={logout} className="text-muted-foreground hover:text-destructive">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm" className="gap-2">
                <User className="h-4 w-4" /> Entrar
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
