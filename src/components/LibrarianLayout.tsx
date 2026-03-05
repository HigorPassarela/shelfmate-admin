import { Outlet, Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar,
} from '@/components/ui/sidebar';
import { NavLink } from '@/components/NavLink';
import { BookOpen, Feather, LogOut, Home } from 'lucide-react';

const menuItems = [
  { title: 'Livros', url: '/bibliotecario/livros', icon: BookOpen },
  { title: 'Autores', url: '/bibliotecario/autores', icon: Feather },
];

function LibrarianSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const { logout } = useAuth();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-display text-sidebar-primary">
            {!collapsed && 'Bibliotecário'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className="hover:bg-sidebar-accent/50" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/" className="hover:bg-sidebar-accent/50">
                    <Home className="mr-2 h-4 w-4" />
                    {!collapsed && <span>Voltar ao Site</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button onClick={logout} className="w-full hover:bg-sidebar-accent/50 text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    {!collapsed && <span>Sair</span>}
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export function LibrarianLayout() {
  const { user, isLibrarian } = useAuth();

  if (!user || !isLibrarian) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <LibrarianSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b bg-background px-4 gap-4">
            <SidebarTrigger />
            <h1 className="font-display text-lg font-semibold">Painel do Bibliotecário</h1>
          </header>
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
