import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, AlertCircle, Eye, EyeOff, UserPlus } from 'lucide-react';

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPw, setShowPw] = useState(false);
  const { login, register, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate(user.role === 'admin' ? '/admin' : user.role === 'librarian' ? '/bibliotecario' : '/');
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isRegister) {
      if (!name.trim()) { setError('Informe seu nome.'); return; }
      if (!cpf.trim()) { setError('Informe seu CPF.'); return; }
      if (password.length < 6) { setError('A senha deve ter pelo menos 6 caracteres.'); return; }
      if (password !== confirmPassword) { setError('As senhas não coincidem.'); return; }
      const success = register({ name, email, cpf, phone, password });
      if (success) {
        navigate('/');
      } else {
        setError('Este e-mail já está em uso.');
      }
    } else {
      const success = login(email, password);
      if (success) {
        navigate(email === 'admin@livraria.com' ? '/admin' : '/');
      } else {
        setError('Email ou senha inválidos.');
      }
    }
  };

  return (
    <div className="container flex min-h-[80vh] items-center justify-center animate-fade-in py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-primary mx-auto mb-5 flex items-center justify-center">
            {isRegister ? <UserPlus className="h-8 w-8 text-primary-foreground" /> : <BookOpen className="h-8 w-8 text-primary-foreground" />}
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            {isRegister ? 'Criar Conta' : 'Bem-vindo de volta'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isRegister ? 'Preencha seus dados para se registrar' : 'Entre na sua conta da Livraria Nova Era'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-8 space-y-5">
          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-destructive/10 p-4 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" /> {error}
            </div>
          )}

          {isRegister && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Nome completo</Label>
              <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Seu nome" required className="rounded-xl h-11" />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">Email</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" required className="rounded-xl h-11" />
          </div>

          {isRegister && (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="cpf" className="text-foreground">CPF</Label>
                <Input id="cpf" value={cpf} onChange={e => setCpf(e.target.value)} placeholder="000.000.000-00" required className="rounded-xl h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground">Telefone</Label>
                <Input id="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="(00) 00000-0000" className="rounded-xl h-11" />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">Senha</Label>
            <div className="relative">
              <Input id="password" type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••" required className="rounded-xl h-11 pr-10" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {isRegister && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground">Confirmar Senha</Label>
              <Input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••" required className="rounded-xl h-11" />
            </div>
          )}

          <Button type="submit" className="w-full rounded-xl h-11 font-semibold" size="lg">
            {isRegister ? 'Criar Conta' : 'Entrar'}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => { setIsRegister(!isRegister); setError(''); }}
              className="text-sm text-primary hover:underline"
            >
              {isRegister ? 'Já tem conta? Entrar' : 'Não tem conta? Registrar-se'}
            </button>
          </div>

          {!isRegister && (
            <div className="rounded-xl bg-muted p-4 text-center text-xs text-muted-foreground space-y-1">
              <p><strong className="text-foreground">Admin:</strong> admin@livraria.com / admin123</p>
              <p><strong className="text-foreground">Cliente:</strong> qualquer email / 123456</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
