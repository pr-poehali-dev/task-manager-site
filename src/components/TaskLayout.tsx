
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { HomeIcon, ListTodo, Settings, LogOut } from "lucide-react";

interface TaskLayoutProps {
  children: ReactNode;
}

export function TaskLayout({ children }: TaskLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-16 md:w-64 bg-white shadow-sm flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-purple-600 hidden md:block">TaskManager</span>
            <span className="text-xl font-bold text-purple-600 md:hidden">TM</span>
          </Link>
        </div>
        
        <nav className="flex-1 pt-4">
          <ul className="space-y-1">
            <li>
              <Link
                to="/"
                className="flex items-center text-gray-700 hover:bg-purple-50 hover:text-purple-600 px-4 py-3 rounded-md"
              >
                <HomeIcon className="h-5 w-5" />
                <span className="ml-3 hidden md:block">Главная</span>
              </Link>
            </li>
            <li>
              <Link
                to="/tasks"
                className="flex items-center bg-purple-50 text-purple-600 px-4 py-3 rounded-md"
              >
                <ListTodo className="h-5 w-5" />
                <span className="ml-3 hidden md:block">Задачи</span>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center text-gray-700 hover:bg-purple-50 hover:text-purple-600 px-4 py-3 rounded-md"
              >
                <Settings className="h-5 w-5" />
                <span className="ml-3 hidden md:block">Настройки</span>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center text-gray-700 hover:bg-purple-50 hover:text-purple-600 px-4 py-3 rounded-md"
              >
                <LogOut className="h-5 w-5" />
                <span className="ml-3 hidden md:block">Выйти</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-700">
              Ю
            </div>
            <div className="ml-3 hidden md:block">
              <p className="text-sm font-medium text-gray-700">Юрий Иванов</p>
              <p className="text-xs text-gray-500">admin@taskmanager.ru</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {children}
      </div>
    </div>
  );
}
