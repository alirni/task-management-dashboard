import { Task } from '@/types/task';
import TaskCard from './task-card';

interface TaskListProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onToggleTaskStatus: (taskId: string) => void;
  onDuplicateTask?: (task: Task) => void;
  onTaskSelection?: (taskId: string, isSelected: boolean) => void;
  selectedTaskIds?: string[];
}

const TaskList = ({
  tasks,
  onEditTask,
  onDeleteTask,
  onToggleTaskStatus,
  onDuplicateTask,
  onTaskSelection,
  selectedTaskIds = [],
}: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="text-lg">No tasks found</p>
          <p className="text-sm">Create your first task to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
          onToggleStatus={onToggleTaskStatus}
          onDuplicate={onDuplicateTask}
          onSelect={onTaskSelection}
          isSelected={selectedTaskIds.includes(task.id)}
        />
      ))}
    </div>
  );
};

export default TaskList;
