import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import TaskForm from '@/components/task-form';
import { Task, TaskFormData } from '@/types/task';

interface EditTaskDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task | null;
  onEditTask: (taskId: string, data: Partial<TaskFormData>) => void;
  isLoading?: boolean;
}

const EditTaskDialog = ({
  isOpen,
  onOpenChange,
  task,
  onEditTask,
  isLoading,
}: EditTaskDialogProps) => {
  const handleSubmit = (data: TaskFormData) => {
    if (task) {
      onEditTask(task.id, data);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  if (!task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <TaskForm
          initialData={{
            title: task.title,
            description: task.description,
            priority: task.priority,
            status: task.status,
            category: task.category,
            tags: task.tags,
            dueDate: task.dueDate,
            estimatedTime: task.estimatedTime,
          }}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;
