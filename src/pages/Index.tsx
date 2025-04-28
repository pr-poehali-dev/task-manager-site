
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center max-w-lg p-8 rounded-lg bg-white shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-purple-700">Система управления задачами</h1>
        <p className="text-lg text-gray-600 mb-6">
          Удобный инструмент для планирования, отслеживания и управления вашими задачами
        </p>
        <Button asChild className="bg-purple-600 hover:bg-purple-700 text-lg py-6 px-8">
          <Link to="/tasks">Начать работу</Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
