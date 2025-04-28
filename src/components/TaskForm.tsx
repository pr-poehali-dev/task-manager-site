
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Task } from "@/types/task";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

interface TaskFormProps {
  onSubmit: (task: Omit<Task, "id">) => void;
  onCancel: () => void;
  initialTask?: Task;
}

export function TaskForm({ onSubmit, onCancel, initialTask }: TaskFormProps) {
  const [task, setTask] = useState<Omit<Task, "id">>({
    title: initialTask?.title || "",
    description: initialTask?.description || "",
    status: initialTask?.status || "запланировано",
    priority: initialTask?.priority || "средний",
    dueDate: initialTask?.dueDate || format(new Date(), "yyyy-MM-dd"),
    tags: initialTask?.tags || []
  });

  const [tagInput, setTagInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setTask(prev => ({ ...prev, dueDate: format(date, "yyyy-MM-dd") }));
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !task.tags.includes(tagInput.trim())) {
      setTask(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTask(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(task);
  };

  return (
    <div className="p-6 bg-white flex-1 overflow-auto">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">{initialTask ? "Редактировать задачу" : "Новая задача"}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">Заголовок</label>
            <Input
              id="title"
              name="title"
              value={task.title}
              onChange={handleChange}
              required
              placeholder="Введите заголовок задачи"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">Описание</label>
            <Textarea
              id="description"
              name="description"
              value={task.description}
              onChange={handleChange}
              rows={4}
              placeholder="Подробное описание задачи"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="status" className="block text-sm font-medium mb-1">Статус</label>
              <Select
                value={task.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger>
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
              <label htmlFor="priority" className="block text-sm font-medium mb-1">Приоритет</label>
              <Select
                value={task.priority}
                onValueChange={(value) => handleSelectChange("priority", value)}
              >
                <SelectTrigger>
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
            <label htmlFor="dueDate" className="block text-sm font-medium mb-1">Срок выполнения</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {task.dueDate ? format(new Date(task.dueDate), "PPP", { locale: ru }) : "Выберите дату"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={task.dueDate ? new Date(task.dueDate) : undefined}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <label htmlFor="tags" className="block text-sm font-medium mb-1">Теги</label>
            <div className="flex">
              <Input
                id="tagInput"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Добавить тег"
                className="mr-2"
              />
              <Button type="button" onClick={addTag}>Добавить</Button>
            </div>
            
            {task.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {task.tags.map(tag => (
                  <div key={tag} className="bg-purple-100 text-purple-800 rounded-full px-3 py-1 text-sm flex items-center">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-purple-500 hover:text-purple-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>Отмена</Button>
            <Button type="submit">{initialTask ? "Сохранить" : "Создать задачу"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
