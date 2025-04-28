
import { useState } from "react";
import { TaskLayout } from "@/components/TaskLayout";
import { TaskList } from "@/components/TaskList";
import { TaskForm } from "@/components/TaskForm";
import { TaskDetails } from "@/components/TaskDetails";
import { Task } from "@/types/task";

const Tasks = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Sample initial tasks
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Разработать дизайн интерфейса",
      description: "Создать макеты для главных экранов приложения",
      status: "в процессе",
      priority: "высокий",
      dueDate: "2025-05-10",
      tags: ["дизайн", "UI/UX"]
    },
    {
      id: "2",
      title: "Настроить API",
      description: "Разработать API-интерфейсы для взаимодействия с бэкендом",
      status: "запланировано",
      priority: "средний",
      dueDate: "2025-05-15",
      tags: ["бэкенд", "API"]
    },
    {
      id: "3",
      title: "Написать документацию",
      description: "Подготовить документацию по использованию системы",
      status: "запланировано",
      priority: "низкий",
      dueDate: "2025-05-20",
      tags: ["документация"]
    }
  ]);

  const addTask = (task: Omit<Task, "id">) => {
    const newTask = {
      ...task,
      id: Date.now().toString()
    };
    setTasks([...tasks, newTask]);
    setShowForm(false);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setSelectedTask(null);
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    if (selectedTask?.id === taskId) {
      setSelectedTask(null);
    }
  };

  return (
    <TaskLayout>
      <TaskList 
        tasks={tasks} 
        onSelectTask={setSelectedTask}
        onAddNewClick={() => setShowForm(true)}
        selectedTaskId={selectedTask?.id}
      />
      
      {showForm ? (
        <TaskForm 
          onSubmit={addTask} 
          onCancel={() => setShowForm(false)} 
        />
      ) : selectedTask ? (
        <TaskDetails 
          task={selectedTask} 
          onUpdate={updateTask}
          onDelete={deleteTask}
          onClose={() => setSelectedTask(null)}
        />
      ) : (
        <div className="flex items-center justify-center h-full bg-gray-50">
          <div className="text-center p-8">
            <h3 className="text-xl font-medium text-gray-500 mb-2">Выберите задачу или создайте новую</h3>
            <p className="text-gray-400">Используйте боковую панель для навигации по задачам</p>
          </div>
        </div>
      )}
    </TaskLayout>
  );
};

export default Tasks;
