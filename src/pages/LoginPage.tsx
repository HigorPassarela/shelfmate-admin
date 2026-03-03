import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate(user.role === 'admin' ? '/admin' : '/');
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(email, password);
    if (success) {
      navigate(email === 'admin@livraria.com' ? '/admin' : '/');
    } else {
      setError('Email ou senha inválidos.');
    }
  };

  return (
    <div className="container flex min-h-[80vh] items-center justify-center animate-fade-in">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="font-display text-3xl font-bold">Entrar</h1>
          <p className="text-muted-foreground mt-1">Acesse sua conta na Livraria Nova Era</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-lg border bg-card p-8 space-y-5">
          {error && (
            <div className="flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" /> {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••" required />
          </div>

          <Button type="submit" className="w-full" size="lg">Entrar</Button>

          <div className="text-center text-xs text-muted-foreground space-y-1 pt-2">
            <p><strong>Admin:</strong> admin@livraria.com / admin123</p>
            <p><strong>Cliente:</strong> qualquer email / 123456</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
