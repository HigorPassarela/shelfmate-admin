import { getSalesWithDetails, books, customers } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, ShoppingCart, DollarSign, TrendingUp, Package } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const AdminDashboard = () => {
  const sales = getSalesWithDetails();
  const totalRevenue = sales.reduce((s, v) => s + v.final_price, 0);
  const activeCustomers = customers.filter(c => c.status === 'ACTIVE').length;
  const inStockBooks = books.filter(b => b.book_status === 'IN_STOCK').length;

  const monthlySales = [
    { month: 'Out', vendas: 1, receita: 89 },
    { month: 'Nov', vendas: 2, receita: 156 },
    { month: 'Dez', vendas: 4, receita: 272.20 },
    { month: 'Jan', vendas: 2, receita: 122.70 },
    { month: 'Fev', vendas: 2, receita: 134.70 },
  ];

  const genreData = [
    { name: 'Ficção', value: 5 },
    { name: 'Romance', value: 2 },
    { name: 'Clássico', value: 2 },
    { name: 'História', value: 1 },
  ];
  const COLORS = ['hsl(155, 30%, 32%)', 'hsl(38, 65%, 55%)', 'hsl(152, 55%, 42%)', 'hsl(45, 25%, 75%)'];

  const stats = [
    { title: 'Receita Total', value: `R$ ${totalRevenue.toFixed(2)}`, icon: DollarSign, change: '+12%' },
    { title: 'Total de Vendas', value: sales.length.toString(), icon: ShoppingCart, change: '+8%' },
    { title: 'Clientes Ativos', value: activeCustomers.toString(), icon: Users, change: '+3' },
    { title: 'Livros Disponíveis', value: `${inStockBooks}/${books.length}`, icon: Package, change: '' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="font-display text-2xl font-bold">Dashboard</h2>
        <p className="text-muted-foreground">Visão geral da livraria</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <Card key={stat.title} className="rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
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
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="font-display text-lg">Receita Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={monthlySales}>
                <defs>
                  <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(155, 30%, 32%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(155, 30%, 32%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="receita" stroke="hsl(155, 30%, 32%)" fill="url(#colorReceita)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="font-display text-lg">Livros por Gênero</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={genreData} cx="50%" cy="50%" innerRadius={65} outerRadius={105} paddingAngle={4} dataKey="value" label={({ name }) => name}>
                  {genreData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="font-display text-lg">Vendas Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-3 font-medium text-muted-foreground">ID</th>
                  <th className="text-left py-3 px-3 font-medium text-muted-foreground">Cliente</th>
                  <th className="text-left py-3 px-3 font-medium text-muted-foreground">Data</th>
                  <th className="text-right py-3 px-3 font-medium text-muted-foreground">Total</th>
                  <th className="text-left py-3 px-3 font-medium text-muted-foreground">Pagamento</th>
                </tr>
              </thead>
              <tbody>
                {sales.slice(-5).reverse().map(sale => (
                  <tr key={sale.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-3 font-medium">#{sale.id}</td>
                    <td className="py-3 px-3">{sale.customer?.name}</td>
                    <td className="py-3 px-3">{new Date(sale.date_sale).toLocaleDateString('pt-BR')}</td>
                    <td className="py-3 px-3 text-right font-semibold text-primary">R$ {sale.final_price.toFixed(2)}</td>
                    <td className="py-3 px-3 text-muted-foreground">{sale.form_payment.replace(/_/g, ' ')}</td>
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
