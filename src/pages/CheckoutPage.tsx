import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PAYMENT_LABELS, FormPayment } from '@/types';
import { ArrowLeft, CheckCircle, CreditCard, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Step = 'review' | 'customer' | 'payment' | 'success';

const CheckoutPage = () => {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<Step>('review');
  const [customerData, setCustomerData] = useState({ name: '', email: '', phone: '', cpf: '', address: '' });
  const [payment, setPayment] = useState<FormPayment>('PIX');

  if (items.length === 0 && step !== 'success') {
    return (
      <div className="container py-20 text-center animate-fade-in">
        <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-30" />
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">Carrinho vazio</h1>
        <p className="text-muted-foreground mb-6">Adicione livros ao carrinho para continuar.</p>
        <Button onClick={() => navigate('/livros')} className="rounded-xl">Ver Livros</Button>
      </div>
    );
  }

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerData.name || !customerData.email || !customerData.phone) {
      toast({ title: 'Preencha os campos obrigatórios', variant: 'destructive' });
      return;
    }
    setStep('payment');
  };

  const handleFinish = () => {
    toast({ title: 'Compra realizada com sucesso!', description: `Pagamento via ${PAYMENT_LABELS[payment]}` });
    clearCart();
    setStep('success');
  };

  const stepIndicator = (
    <div className="flex items-center justify-center gap-2 mb-8">
      {(['review', 'customer', 'payment'] as Step[]).map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
            step === s ? 'bg-primary text-primary-foreground' :
            (['review', 'customer', 'payment'].indexOf(step) > i) ? 'bg-primary/30 text-primary' :
            'bg-muted text-muted-foreground'
          }`}>{i + 1}</div>
          {i < 2 && <div className="w-8 h-px bg-border" />}
        </div>
      ))}
    </div>
  );

  if (step === 'success') {
    return (
      <div className="container py-20 text-center animate-fade-in">
        <CheckCircle className="h-20 w-20 mx-auto mb-6 text-primary" />
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Pedido Confirmado!</h1>
        <p className="text-muted-foreground mb-8">Obrigado pela sua compra, {customerData.name}.</p>
        <Button onClick={() => navigate('/')} className="rounded-xl">Voltar ao Início</Button>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-12 animate-fade-in">
      <button onClick={() => step === 'review' ? navigate(-1) : setStep(step === 'payment' ? 'customer' : 'review')} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Voltar
      </button>

      {stepIndicator}

      {step === 'review' && (
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-6">Revise seu Pedido</h1>
          <div className="space-y-3 mb-6">
            {items.map(item => (
              <div key={item.book.id} className="flex justify-between items-center p-4 rounded-xl bg-card border border-border">
                <div>
                  <p className="font-medium text-foreground">{item.book.title}</p>
                  <p className="text-xs text-muted-foreground">Qtd: {item.quantity} × R$ {item.book.price.toFixed(2)}</p>
                </div>
                <span className="font-bold text-primary">R$ {(item.book.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center p-4 rounded-xl bg-secondary/50 border border-border mb-6">
            <span className="font-medium text-foreground">Total ({totalItems} {totalItems === 1 ? 'item' : 'itens'})</span>
            <span className="text-xl font-bold text-primary">R$ {totalPrice.toFixed(2)}</span>
          </div>
          <Button onClick={() => setStep('customer')} className="w-full rounded-xl" size="lg">Continuar</Button>
        </div>
      )}

      {step === 'customer' && (
        <form onSubmit={handleCustomerSubmit}>
          <h1 className="font-display text-2xl font-bold text-foreground mb-6">Seus Dados</h1>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nome completo *</Label>
              <Input id="name" value={customerData.name} onChange={e => setCustomerData(p => ({ ...p, name: e.target.value }))} className="rounded-xl mt-1" placeholder="Seu nome" required />
            </div>
            <div>
              <Label htmlFor="email">E-mail *</Label>
              <Input id="email" type="email" value={customerData.email} onChange={e => setCustomerData(p => ({ ...p, email: e.target.value }))} className="rounded-xl mt-1" placeholder="seu@email.com" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Telefone *</Label>
                <Input id="phone" value={customerData.phone} onChange={e => setCustomerData(p => ({ ...p, phone: e.target.value }))} className="rounded-xl mt-1" placeholder="(11) 99999-0000" required />
              </div>
              <div>
                <Label htmlFor="cpf">CPF</Label>
                <Input id="cpf" value={customerData.cpf} onChange={e => setCustomerData(p => ({ ...p, cpf: e.target.value }))} className="rounded-xl mt-1" placeholder="000.000.000-00" />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Endereço</Label>
              <Input id="address" value={customerData.address} onChange={e => setCustomerData(p => ({ ...p, address: e.target.value }))} className="rounded-xl mt-1" placeholder="Rua, número, cidade/UF" />
            </div>
          </div>
          <Button type="submit" className="w-full rounded-xl mt-6" size="lg">Continuar para Pagamento</Button>
        </form>
      )}

      {step === 'payment' && (
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-6">Forma de Pagamento</h1>
          <RadioGroup value={payment} onValueChange={(v) => setPayment(v as FormPayment)} className="space-y-3">
            {(Object.entries(PAYMENT_LABELS) as [FormPayment, string][]).map(([key, label]) => (
              <label key={key} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${payment === key ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-muted-foreground/30'}`}>
                <RadioGroupItem value={key} />
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground font-medium">{label}</span>
              </label>
            ))}
          </RadioGroup>

          <div className="flex justify-between items-center p-4 rounded-xl bg-secondary/50 border border-border mt-6">
            <span className="text-muted-foreground">Total a pagar</span>
            <span className="text-xl font-bold text-primary">R$ {totalPrice.toFixed(2)}</span>
          </div>

          <Button onClick={handleFinish} className="w-full rounded-xl mt-4" size="lg">Confirmar Compra</Button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
