import { customers } from '@/data/mockData';
import { STATUS_LABELS } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AdminCustomers = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="font-display text-2xl font-bold">Clientes</h2>
        <p className="text-muted-foreground">Gerenciamento de clientes</p>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Endereço</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map(c => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.name}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>{c.phone}</TableCell>
                <TableCell className="text-xs">{c.cpf?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}</TableCell>
                <TableCell className="max-w-xs truncate text-sm text-muted-foreground">{c.address}</TableCell>
                <TableCell>
                  {c.status === 'ACTIVE' && <span className="badge-success">{STATUS_LABELS[c.status]}</span>}
                  {c.status === 'BLOCKED' && <span className="badge-warning">{STATUS_LABELS[c.status]}</span>}
                  {c.status === 'DISABLED' && <span className="badge-danger">{STATUS_LABELS[c.status]}</span>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminCustomers;
