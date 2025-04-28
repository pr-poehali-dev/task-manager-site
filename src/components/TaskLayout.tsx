
import { ReactNode } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Home, ListTodo } from "lucide-react";
import { Link } from "react-router-dom";

interface TaskLayoutProps {
  children: ReactNode;
}

export function TaskLayout({ children }: TaskLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="rounded-md bg-purple-600 p-1">
                <ListTodo className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold">Управление задачами</span>
            </Link>
            <SidebarTrigger />
          </SidebarHeader>
          <SidebarContent>
            <div className="space-y-4 px-2 py-4">
              <Button asChild variant="ghost" className="w-full justify-start">
                <Link to="/" className="flex items-center">
                  <Home className="mr-2 h-4 w-4" />
                  Главная
                </Link>
              </Button>
              <Button asChild variant="ghost" className="w-full justify-start bg-sidebar-accent">
                <Link to="/tasks" className="flex items-center">
                  <ListTodo className="mr-2 h-4 w-4" />
                  Задачи
                </Link>
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="flex-1">
          <main className="flex flex-1">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
