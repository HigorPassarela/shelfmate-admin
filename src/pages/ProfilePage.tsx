import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Phone, CreditCard, MapPin, Save } from 'lucide-react';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    cpf: user?.cpf || '',
    address: user?.address || '',
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(form);
    toast({
      title: 'Perfil atualizado',
      description: 'Seus dados foram salvos com sucesso.',
    });
  };

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container max-w-2xl py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-display text-foreground">Meu Perfil</h1>
        <p className="text-muted-foreground mt-1">Gerencie suas informações pessoais</p>
      </div>

      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle className="font-display">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2 text-muted-foreground">
                <User className="h-3.5 w-3.5" /> Nome completo
              </Label>
              <Input
                id="name"
                value={form.name}
                onChange={e => handleChange('name', e.target.value)}
                className="bg-secondary/50 border-border/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-3.5 w-3.5" /> E-mail
              </Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={e => handleChange('email', e.target.value)}
                className="bg-secondary/50 border-border/50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-3.5 w-3.5" /> Telefone
                </Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={e => handleChange('phone', e.target.value)}
                  placeholder="(00) 00000-0000"
                  className="bg-secondary/50 border-border/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf" className="flex items-center gap-2 text-muted-foreground">
                  <CreditCard className="h-3.5 w-3.5" /> CPF
                </Label>
                <Input
                  id="cpf"
                  value={form.cpf}
                  disabled
                  placeholder="Não informado"
                  className="bg-secondary/30 border-border/50 opacity-60 cursor-not-allowed"
                />
                <p className="text-xs text-muted-foreground">O CPF não pode ser alterado.</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> Endereço
              </Label>
              <Input
                id="address"
                value={form.address}
                onChange={e => handleChange('address', e.target.value)}
                placeholder="Rua, número, bairro, cidade"
                className="bg-secondary/50 border-border/50"
              />
            </div>

            <Button type="submit" className="w-full gap-2 rounded-full mt-2">
              <Save className="h-4 w-4" /> Salvar Alterações
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
