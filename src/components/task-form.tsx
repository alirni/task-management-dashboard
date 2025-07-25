import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { TaskFormData, TaskPriority, TaskStatus } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DEFAULT_CATEGORIES } from '@/constants';

const taskFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  description: z.string().max(500, 'Description too long'),
  priority: z.enum(['low', 'medium', 'high']),
  status: z.enum(['todo', 'in-progress', 'done']),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()),
  dueDate: z.string().min(1, 'Due date is required'),
  estimatedTime: z.number().min(0).optional(),
});

type TaskFormSchemaType = z.infer<typeof taskFormSchema>;

interface TaskFormProps {
  initialData?: Partial<TaskFormData>;
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const TaskForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: TaskFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TaskFormSchemaType>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      priority: initialData?.priority || 'medium',
      status: initialData?.status || 'todo',
      category: initialData?.category || DEFAULT_CATEGORIES[0],
      tags: initialData?.tags || [],
      dueDate: initialData?.dueDate
        ? new Date(initialData.dueDate).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      estimatedTime: initialData?.estimatedTime || undefined,
    },
  });

  const watchedPriority = watch('priority');
  const watchedStatus = watch('status');
  const watchedCategory = watch('category');

  const handleFormSubmit = (data: TaskFormSchemaType) => {
    const formData: TaskFormData = {
      ...data,
      dueDate: new Date(data.dueDate),
      tags: data.tags || [],
      estimatedTime: data.estimatedTime
        ? Number(data.estimatedTime)
        : undefined,
    };
    onSubmit(formData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">
          {initialData ? 'Edit Task' : 'Create New Task'}
        </h2>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="Enter task title"
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={watchedCategory}
              onValueChange={value => setValue('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {DEFAULT_CATEGORIES.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-destructive">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register('description')}
            placeholder="Enter task description"
            rows={3}
          />
          {errors.description && (
            <p className="text-sm text-destructive">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={watchedPriority}
              onValueChange={(value: TaskPriority) =>
                setValue('priority', value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={watchedStatus}
              onValueChange={(value: TaskStatus) => setValue('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="estimatedTime">Estimated Time (minutes)</Label>
            <Input
              id="estimatedTime"
              type="number"
              {...register('estimatedTime', { valueAsNumber: true })}
              placeholder="e.g., 30"
              min="0"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date *</Label>
          <Input id="dueDate" type="date" {...register('dueDate')} />
          {errors.dueDate && (
            <p className="text-sm text-destructive">{errors.dueDate.message}</p>
          )}
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading
              ? 'Saving...'
              : initialData
                ? 'Update Task'
                : 'Create Task'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
