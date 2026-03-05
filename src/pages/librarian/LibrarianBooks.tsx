import { useState } from 'react';
import { books, authors, getBooksWithAuthors, addBook, removeBook } from '@/data/mockData';
import { GENDER_LABELS, BookGender } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LibrarianBooks = () => {
  const [, forceUpdate] = useState(0);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const [form, setForm] = useState({
    title: '', isbn: '', publication_date: '', gender: 'FICTION' as BookGender,
    price: '', quantity: '', author_id: '',
  });

  const allBooks = getBooksWithAuthors();

  const handleAdd = () => {
    if (!form.title || !form.isbn || !form.author_id) {
      toast({ title: 'Preencha os campos obrigatórios', variant: 'destructive' });
      return;
    }
    addBook({
      title: form.title, isbn: form.isbn, publication_date: form.publication_date,
      gender: form.gender, price: parseFloat(form.price) || 0, quantity: parseInt(form.quantity) || 0,
      book_status: parseInt(form.quantity) > 0 ? 'IN_STOCK' : 'OUT_OF_STOCK', author_id: form.author_id,
    });
    setForm({ title: '', isbn: '', publication_date: '', gender: 'FICTION', price: '', quantity: '', author_id: '' });
    setOpen(false);
    forceUpdate(n => n + 1);
    toast({ title: 'Livro cadastrado com sucesso!' });
  };

  const handleRemove = (id: string, title: string) => {
    if (confirm(`Remover "${title}"?`)) {
      removeBook(id);
      forceUpdate(n => n + 1);
      toast({ title: 'Livro removido' });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold">Livros</h2>
          <p className="text-muted-foreground">Cadastrar e remover livros do acervo</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" />Novo Livro</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Cadastrar Livro</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-2">
              <div><Label>Título *</Label><Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
              <div><Label>ISBN *</Label><Input value={form.isbn} onChange={e => setForm(f => ({ ...f, isbn: e.target.value }))} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Preço (R$)</Label><Input type="number" step="0.01" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} /></div>
                <div><Label>Quantidade</Label><Input type="number" value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))} /></div>
              </div>
              <div><Label>Data de Publicação</Label><Input type="date" value={form.publication_date} onChange={e => setForm(f => ({ ...f, publication_date: e.target.value }))} /></div>
              <div>
                <Label>Gênero</Label>
                <Select value={form.gender} onValueChange={v => setForm(f => ({ ...f, gender: v as BookGender }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(GENDER_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Autor *</Label>
                <Select value={form.author_id} onValueChange={v => setForm(f => ({ ...f, author_id: v }))}>
                  <SelectTrigger><SelectValue placeholder="Selecione o autor" /></SelectTrigger>
                  <SelectContent>
                    {authors.map(a => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAdd} className="w-full">Cadastrar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead>Gênero</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="text-right">Qtd</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allBooks.map(book => (
              <TableRow key={book.id}>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.author?.name}</TableCell>
                <TableCell>{GENDER_LABELS[book.gender]}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{book.isbn}</TableCell>
                <TableCell className="text-right">R$ {book.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">{book.quantity}</TableCell>
                <TableCell>
                  {book.book_status === 'IN_STOCK'
                    ? <span className="badge-success">Em estoque</span>
                    : <span className="badge-danger">Esgotado</span>}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleRemove(book.id, book.title)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LibrarianBooks;
