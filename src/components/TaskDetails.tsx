
import { useState } from "react";
import { Task } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Tag, Pencil, Trash2, X } from "lucide-react";
import { TaskForm } from "./TaskForm";

interface TaskDetailsProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onClose: () => void;
}

export function TaskDetails({ task, onUpdate, onDelete, onClose }: TaskDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "запланировано":
        return "bg-blue-100 text-blue-800";
      case "в процессе":
        return "bg-yellow-100 text-yellow-800";
      case "завершено":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
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

  if (isEditing) {
    return (
      <TaskForm
        task={task}
        onSubmit={(updatedTask) => {
          onUpdate({ ...updatedTask, id: task.id });
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="flex-1 p-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{task.title}</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setIsEditing(true)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => onDelete(task.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <Badge className={getStatusColor(task.status)}>
            {task.status}
          </Badge>
          <Badge className={getPriorityColor(task.priority)}>
            Приоритет: {task.priority}
          </Badge>
          {task.dueDate && (
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              <span>До {formatDate(task.dueDate)}</span>
            </div>
          )}
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Описание</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            {task.description || <span className="text-gray-400">Описание отсутствует</span>}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Теги</h3>
          <div className="flex flex-wrap gap-2">
            {task.tags && task.tags.length > 0 ? (
              task.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="bg-purple-50">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))
            ) : (
              <span className="text-gray-400">Теги отсутствуют</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
