
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, CheckCircle, Clipboard, Calendar, BarChart3, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-xl font-bold text-purple-600">TaskManager</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <Link to="/" className="text-gray-900 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                  Главная
                </Link>
                <Link to="/tasks" className="text-gray-500 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                  Задачи
                </Link>
                <Button asChild>
                  <Link to="/tasks">
                    Перейти к задачам
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 bg-gradient-to-r from-purple-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="lg:w-1/2">
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                  Система управления задачами
                </h1>
                <p className="mt-5 text-xl text-gray-600">
                  Простой и эффективный способ управления вашими задачами и проектами.
                </p>
                <div className="mt-8">
                  <Button asChild size="lg" className="mr-4">
                    <Link to="/tasks">
                      Начать работу
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="mt-10 lg:mt-0 lg:w-1/2">
                <img
                  className="w-full rounded-lg shadow-xl"
                  src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Dashboard screenshot"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
              Основные возможности
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Clipboard className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Управление задачами</h3>
                <p className="text-gray-600">
                  Создавайте, редактируйте и организуйте задачи по статусу и приоритету.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Отслеживание прогресса</h3>
                <p className="text-gray-600">
                  Следите за выполнением задач и визуализируйте свой прогресс.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Планирование сроков</h3>
                <p className="text-gray-600">
                  Устанавливайте сроки выполнения и получайте уведомления о приближающихся дедлайнах.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                Повысьте эффективность вашей команды
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                TaskManager предоставляет мощные инструменты для совместной работы
                и управления проектами любой сложности.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow flex items-start">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Командная работа</h3>
                  <p className="text-gray-600">
                    Совместная работа над задачами, распределение ответственности и обмен комментариями.
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow flex items-start">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <BarChart3 className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Аналитика и отчеты</h3>
                  <p className="text-gray-600">
                    Анализ производительности команды, отслеживание прогресса проектов и выявление узких мест.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
              Готовы начать?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Присоединяйтесь к тысячам команд, которые уже используют TaskManager для повышения продуктивности.
            </p>
            <Button asChild size="lg">
              <Link to="/tasks">
                Начать бесплатно
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">TaskManager</h3>
              <p className="text-gray-300">
                Простой, но мощный инструмент для управления задачами и проектами.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Контакты</h3>
              <p className="text-gray-300">
                Email: info@taskmanager.ru<br />
                Телефон: +7 (999) 123-45-67
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Подписаться на новости</h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="px-4 py-2 rounded-l-md w-full text-gray-900"
                />
                <Button className="rounded-l-none">Отправить</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2025 TaskManager. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
