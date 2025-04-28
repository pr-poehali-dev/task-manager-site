
import { Button } from "@/components/ui/button";
import { Task } from "@/types/task";
import { PlusCircle, Calendar, AlertCircle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TaskListProps {
  tasks: Task[];
  selectedTaskId?: string;
  onSelectTask: (task: Task) => void;
  onAddNewClick: () => void;
}

export function TaskList({ tasks, selectedTaskId, onSelectTask, onAddNewClick }: TaskListProps) {
  // Group tasks by status
  const tasksByStatus = tasks.reduce((acc, task) => {
    const status = task.status;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "запланировано":
        return <Calendar className="h-4 w-4 text-blue-500" />;
      case "в процессе":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "завершено":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Calendar className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "высокий":
        return "bg-red-100 text-red-800";
      case "средний":
        return "bg-yellow-100 text-yellow-800";
      case "низкий":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-80 border-r border-gray-200 bg-white flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Задачи</h2>
          <Button size="sm" variant="ghost" onClick={onAddNewClick}>
            <PlusCircle className="h-4 w-4 mr-1" />
            Новая
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-2">
        {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
          <div key={status} className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 flex items-center mb-2 px-2">
              {getStatusIcon(status)}
              <span className="ml-2 capitalize">{status}</span>
              <Badge variant="outline" className="ml-2">{statusTasks.length}</Badge>
            </h3>
            <div className="space-y-1">
              {statusTasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => onSelectTask(task)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    selectedTaskId === task.id 
                      ? 'bg-purple-100 border-l-2 border-purple-500' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="font-medium truncate">{task.title}</div>
                  <div className="flex items-center mt-1">
                    <Badge variant="secondary" className={`text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </Badge>
                    {task.dueDate && (
                      <span className="text-xs text-gray-500 ml-2 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(task.dueDate).toLocaleDateString('ru-RU')}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
