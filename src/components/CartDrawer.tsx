import { useCart } from '@/contexts/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function CartDrawer() {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="relative p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-card border-border flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display text-xl text-foreground">Carrinho</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>Seu carrinho está vazio</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-3 py-4">
              {items.map(item => (
                <div key={item.book.id} className="flex gap-3 p-3 rounded-xl bg-secondary/50 border border-border">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-foreground truncate">{item.book.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">R$ {item.book.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                        className="h-7 w-7 rounded-lg bg-muted flex items-center justify-center text-foreground hover:bg-primary/20 transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                        disabled={item.quantity >= item.book.quantity}
                        className="h-7 w-7 rounded-lg bg-muted flex items-center justify-center text-foreground hover:bg-primary/20 transition-colors disabled:opacity-30"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => removeFromCart(item.book.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <span className="text-sm font-bold text-primary">R$ {(item.book.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total ({totalItems} {totalItems === 1 ? 'item' : 'itens'})</span>
                <span className="text-lg font-bold text-primary">R$ {totalPrice.toFixed(2)}</span>
              </div>
              <Button
                className="w-full rounded-xl"
                onClick={() => { setOpen(false); navigate('/checkout'); }}
              >
                Finalizar Compra
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
