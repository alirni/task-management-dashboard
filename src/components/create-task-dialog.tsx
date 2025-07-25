import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import TaskForm from '@/components/task-form';
import { TaskFormData } from '@/types/task';

interface CreateTaskDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateTask: (data: TaskFormData) => void;
  isLoading?: boolean;
}

const CreateTaskDialog = ({
  isOpen,
  onOpenChange,
  onCreateTask,
  isLoading,
}: CreateTaskDialogProps) => {
  const handleSubmit = (data: TaskFormData) => {
    onCreateTask(data);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl mx-2 sm:mx-auto w-auto sm:w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            Create New Task
          </DialogTitle>
        </DialogHeader>
        <TaskForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;
