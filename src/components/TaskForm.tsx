
import { useState } from "react";
import { Task } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { X, Plus } from "lucide-react";

interface TaskFormProps {
  task?: Task;
  onSubmit: (task: Omit<Task, "id">) => void;
  onCancel: () => void;
}

export function TaskForm({ task, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "запланировано");
  const [priority, setPriority] = useState(task?.priority || "средний");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  const [tags, setTags] = useState<string[]>(task?.tags || []);
  const [newTag, setNewTag] = useState("");

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      status,
      priority,
      dueDate: dueDate || undefined,
      tags
    });
  };

  return (
    <div className="flex-1 p-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">
          {task ? "Редактировать задачу" : "Создать новую задачу"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Заголовок</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите заголовок задачи"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Введите подробное описание задачи"
              className="mt-1 h-32"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status">Статус</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status" className="mt-1">
                  <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="запланировано">Запланировано</SelectItem>
                  <SelectItem value="в процессе">В процессе</SelectItem>
                  <SelectItem value="завершено">Завершено</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority">Приоритет</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger id="priority" className="mt-1">
                  <SelectValue placeholder="Выберите приоритет" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="низкий">Низкий</SelectItem>
                  <SelectItem value="средний">Средний</SelectItem>
                  <SelectItem value="высокий">Высокий</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="dueDate">Срок выполнения</Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label>Теги</Label>
            <div className="flex mt-1 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Добавить тег"
                className="mr-2"
              />
              <Button 
                type="button" 
                onClick={addTag} 
                variant="outline"
                size="icon"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, index) => (
                <div key={index} className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-purple-600 hover:text-purple-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {tags.length === 0 && (
                <span className="text-gray-400 text-sm">Нет тегов</span>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Отмена
            </Button>
            <Button type="submit" disabled={!title.trim()}>
              {task ? "Сохранить" : "Создать"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
