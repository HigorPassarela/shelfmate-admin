import { Link, useLocation } from 'react-router-dom';
import { BookOpen, User, LogOut, Menu, Settings, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { CartDrawer } from '@/components/CartDrawer';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export function PublicHeader() {
  const { user, logout, isAdmin, isLibrarian, isLoading } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const { toast } = useToast();

  const navLinks = [
    { to: '/', label: 'Início' },
    { to: '/livros', label: 'Livros' },
    { to: '/autores', label: 'Autores' },
  ];

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      await logout();
      toast({ 
        title: "Logout realizado com sucesso!",
        description: "Até logo!" 
      });
    } catch (error) {
      console.error('Erro no logout:', error);
      toast({ 
        title: "Erro no logout", 
        description: "Ocorreu um erro, mas você foi deslogado.",
        variant: "destructive" 
      });
    } finally {
      setLogoutLoading(false);
    }
  };

  const getUserDisplayName = () => {
    if (!user) return '';
    
    let displayName = user.name;
    if (isAdmin) displayName += ' (Admin)';
    else if (isLibrarian) displayName += ' (Bibliotecário)';
    
    return displayName;
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold text-foreground">ExtraLibrary</span>
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
          
          {/* Loading state durante inicialização */}
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              <span className="text-sm text-muted-foreground hidden sm:inline">Carregando...</span>
            </div>
          ) : user ? (
            <div className="flex items-center gap-2">
              {/* Botão Admin */}
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="outline" size="sm" className="rounded-full text-xs">
                    Painel Admin
                  </Button>
                </Link>
              )}
              
              {/* Botão Bibliotecário */}
              {isLibrarian && (
                <Link to="/bibliotecario">
                  <Button variant="outline" size="sm" className="rounded-full text-xs">
                    Painel Bibliotecário
                  </Button>
                </Link>
              )}
              
              {/* Botão Perfil */}
              <Link to="/perfil">
                <Button variant="ghost" size="icon" className="rounded-full" title="Perfil">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
              
              {/* Botão Configurações */}
              <Link to="/configuracoes">
                <Button variant="ghost" size="icon" className="rounded-full" title="Configurações">
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
              
              {/* Nome do usuário */}
              <span className="text-sm text-muted-foreground hidden sm:inline px-2 max-w-32 truncate" title={getUserDisplayName()}>
                {getUserDisplayName()}
              </span>
              
              {/* Botão Logout */}
              <button 
                onClick={handleLogout}
                disabled={logoutLoading}
                className="text-muted-foreground hover:text-destructive p-2 rounded-full hover:bg-destructive/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Sair"
              >
                {logoutLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="h-4 w-4" />
                )}
              </button>
            </div>
          ) : (
            <Link to="/login">
              <Button size="sm" className="rounded-full gap-2 px-5">
                <User className="h-4 w-4" /> Entrar
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
            
            {/* Mobile user menu */}
            {user && (
              <div className="border-t pt-3 mt-3 space-y-1">
                <div className="px-4 py-2 text-sm font-medium text-foreground">
                  {getUserDisplayName()}
                </div>
                
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted flex items-center gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    Painel Admin
                  </Link>
                )}
                
                {isLibrarian && (
                  <Link
                    to="/bibliotecario"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted flex items-center gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    Painel Bibliotecário
                  </Link>
                )}
                
                <Link
                  to="/perfil"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Perfil
                </Link>
                
                <Link
                  to="/configuracoes"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Configurações
                </Link>
                
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  disabled={logoutLoading}
                  className="w-full px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors text-left flex items-center gap-2 disabled:opacity-50"
                >
                  {logoutLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <LogOut className="h-4 w-4" />
                  )}
                  Sair
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}