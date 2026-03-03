import { getSalesWithDetails, books, customers, authors } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, ShoppingCart, DollarSign, TrendingUp, Package } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  const sales = getSalesWithDetails();
  const totalRevenue = sales.reduce((s, v) => s + v.final_price, 0);
  const totalDiscount = sales.reduce((s, v) => s + (v.discount || 0), 0);
  const activeCustomers = customers.filter(c => c.status === 'ACTIVE').length;
  const inStockBooks = books.filter(b => b.book_status === 'IN_STOCK').length;

  const monthlySales = [
    { month: 'Dez/24', vendas: 4, receita: 272.20 },
    { month: 'Jan/25', vendas: 2, receita: 122.70 },
    { month: 'Fev/25', vendas: 2, receita: 134.70 },
  ];

  const genreData = [
    { name: 'Ficção', value: 5 },
    { name: 'Romance', value: 2 },
    { name: 'Clássico', value: 2 },
    { name: 'História', value: 1 },
  ];
  const COLORS = ['hsl(24, 60%, 25%)', 'hsl(36, 80%, 50%)', 'hsl(142, 60%, 40%)', 'hsl(36, 40%, 70%)'];

  const stats = [
    { title: 'Receita Total', value: `R$ ${totalRevenue.toFixed(2)}`, icon: DollarSign, change: '+12%' },
    { title: 'Total de Vendas', value: sales.length.toString(), icon: ShoppingCart, change: '+8%' },
    { title: 'Clientes Ativos', value: activeCustomers.toString(), icon: Users, change: '+3' },
    { title: 'Livros em Estoque', value: `${inStockBooks}/${books.length}`, icon: Package, change: '' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="font-display text-2xl font-bold">Dashboard</h2>
        <p className="text-muted-foreground">Visão geral da livraria</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.change && (
                <p className="text-xs text-success flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" /> {stat.change}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Vendas Mensais</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="receita" fill="hsl(24, 60%, 25%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display">Livros por Gênero</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={genreData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" label={({ name }) => name}>
                  {genreData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Sales */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display">Vendas Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">ID</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Cliente</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Data</th>
                  <th className="text-right py-3 px-2 font-medium text-muted-foreground">Total</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">Pagamento</th>
                </tr>
              </thead>
              <tbody>
                {sales.slice(-5).reverse().map(sale => (
                  <tr key={sale.id} className="border-b last:border-0">
                    <td className="py-3 px-2">#{sale.id}</td>
                    <td className="py-3 px-2">{sale.customer?.name}</td>
                    <td className="py-3 px-2">{new Date(sale.date_sale).toLocaleDateString('pt-BR')}</td>
                    <td className="py-3 px-2 text-right font-medium">R$ {sale.final_price.toFixed(2)}</td>
                    <td className="py-3 px-2">{sale.form_payment.replace('_', ' ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
