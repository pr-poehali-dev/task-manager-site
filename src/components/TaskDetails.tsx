
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Task } from "@/types/task";
import { Calendar, Clock, Edit2, Trash2, AlertCircle } from "lucide-react";
import { TaskForm } from "./TaskForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface TaskDetailsProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onClose: () => void;
}

export function TaskDetails({ task, onUpdate, onDelete, onClose }: TaskDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "завершено":
        return "bg-green-100 text-green-800";
      case "в процессе":
        return "bg-blue-100 text-blue-800";
      case "запланировано":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleUpdate = (updatedTaskData: Omit<Task, "id">) => {
    onUpdate({ ...updatedTaskData, id: task.id });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <TaskForm task={task} onSubmit={handleUpdate} onCancel={() => setIsEditing(false)} />
    );
  }

  return (
    <>
      <div className="bg-white p-6 w-full h-full overflow-auto">
        <div className="mb-4 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold mb-1">{task.title}</h2>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className={getStatusColor(task.status)}>
                {task.status}
              </Badge>
              <Badge variant="outline" className={getPriorityColor(task.priority)}>
                {task.priority}
              </Badge>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Edit2 className="h-4 w-4 mr-2" />
              Редактировать
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDeleteDialogOpen(true)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Удалить
            </Button>
          </div>
        </div>

        {task.dueDate && (
          <div className="flex items-center mb-4 text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <div className="flex items-center">
              <span className="font-medium mr-2">Срок:</span>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(task.dueDate).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Описание</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            {task.description ? (
              <p className="text-gray-700 whitespace-pre-line">{task.description}</p>
            ) : (
              <p className="text-gray-500 italic">Описание отсутствует</p>
            )}
          </div>
        </div>

        {task.tags.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Теги</h3>
            <div className="flex flex-wrap gap-2">
              {task.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-purple-100 text-purple-800">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 flex items-start">
          <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800 mb-1">Информация о задаче</h4>
            <p className="text-sm text-yellow-700">
              ID задачи: {task.id}
              <br />
              Создано: {new Date().toLocaleDateString("ru-RU")}
            </p>
          </div>
        </div>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить задачу?</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите удалить задачу "{task.title}"? Это действие не может быть отменено.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={() => onDelete(task.id)} className="bg-red-600 hover:bg-red-700">
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
