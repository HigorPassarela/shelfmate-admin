import { useState } from 'react';
import { authors, books, addAuthor, removeAuthor } from '@/data/mockData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LibrarianAuthors = () => {
  const [, forceUpdate] = useState(0);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: '', nacionality: '', birth_date: '', biography: '',
  });

  const handleAdd = () => {
    if (!form.name || !form.nacionality) {
      toast({ title: 'Preencha os campos obrigatórios', variant: 'destructive' });
      return;
    }
    addAuthor({
      name: form.name, nacionality: form.nacionality,
      birth_date: form.birth_date, biography: form.biography || undefined,
    });
    setForm({ name: '', nacionality: '', birth_date: '', biography: '' });
    setOpen(false);
    forceUpdate(n => n + 1);
    toast({ title: 'Autor cadastrado com sucesso!' });
  };

  const handleRemove = (id: string, name: string) => {
    const bookCount = books.filter(b => b.author_id === id).length;
    const msg = bookCount > 0
      ? `Remover "${name}" e seus ${bookCount} livro(s) associado(s)?`
      : `Remover "${name}"?`;
    if (confirm(msg)) {
      removeAuthor(id);
      forceUpdate(n => n + 1);
      toast({ title: 'Autor removido' });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold">Autores</h2>
          <p className="text-muted-foreground">Cadastrar e remover autores</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" />Novo Autor</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Cadastrar Autor</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-2">
              <div><Label>Nome *</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
              <div><Label>Nacionalidade *</Label><Input value={form.nacionality} onChange={e => setForm(f => ({ ...f, nacionality: e.target.value }))} /></div>
              <div><Label>Data de Nascimento</Label><Input type="date" value={form.birth_date} onChange={e => setForm(f => ({ ...f, birth_date: e.target.value }))} /></div>
              <div><Label>Biografia</Label><Textarea value={form.biography} onChange={e => setForm(f => ({ ...f, biography: e.target.value }))} rows={3} /></div>
              <Button onClick={handleAdd} className="w-full">Cadastrar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Nacionalidade</TableHead>
              <TableHead>Data Nasc.</TableHead>
              <TableHead>Livros</TableHead>
              <TableHead>Biografia</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {authors.map(author => {
              const count = books.filter(b => b.author_id === author.id).length;
              return (
                <TableRow key={author.id}>
                  <TableCell className="font-medium">{author.name}</TableCell>
                  <TableCell>{author.nacionality}</TableCell>
                  <TableCell>{author.birth_date ? new Date(author.birth_date).toLocaleDateString('pt-BR') : '-'}</TableCell>
                  <TableCell>{count} livro(s)</TableCell>
                  <TableCell className="max-w-xs truncate text-sm text-muted-foreground">{author.biography}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleRemove(author.id, author.name)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LibrarianAuthors;
