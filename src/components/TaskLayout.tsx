
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface TaskLayoutProps {
  children: ReactNode;
}

export function TaskLayout({ children }: TaskLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/" className="flex items-center text-gray-700">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  На главную
                </Link>
              </Button>
              <h1 className="ml-4 text-xl font-bold text-gray-900">Система управления задачами</h1>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex h-[calc(100vh-4rem)]">
        {children}
      </main>
    </div>
  );
}
