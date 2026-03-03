import { getSalesWithDetails } from '@/data/mockData';
import { PAYMENT_LABELS } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AdminSales = () => {
  const sales = getSalesWithDetails();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="font-display text-2xl font-bold">Vendas</h2>
        <p className="text-muted-foreground">Histórico de vendas</p>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Itens</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
              <TableHead className="text-right">Desconto</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Pagamento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.map(sale => (
              <TableRow key={sale.id}>
                <TableCell className="font-medium">#{sale.id}</TableCell>
                <TableCell>{new Date(sale.date_sale).toLocaleDateString('pt-BR')}</TableCell>
                <TableCell>{sale.customer?.name}</TableCell>
                <TableCell>
                  <div className="text-xs space-y-0.5">
                    {sale.items?.map(item => (
                      <div key={item.book_id}>{item.book?.title} (x{item.quantity})</div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">R$ {sale.subtotal.toFixed(2)}</TableCell>
                <TableCell className="text-right text-destructive">
                  {sale.discount ? `- R$ ${sale.discount.toFixed(2)}` : '-'}
                </TableCell>
                <TableCell className="text-right font-semibold">R$ {sale.final_price.toFixed(2)}</TableCell>
                <TableCell>{PAYMENT_LABELS[sale.form_payment]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminSales;
