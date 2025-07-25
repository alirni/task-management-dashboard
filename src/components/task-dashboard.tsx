import TaskList from '@/components/task-list';
import { Task } from '@/types/task';

interface TaskDashboardProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onToggleTaskStatus: (taskId: string) => void;
  onTaskSelection?: (taskId: string, isSelected: boolean) => void;
  selectedTaskIds?: string[];
  isLoading?: boolean;
}

const TaskDashboard = ({
  tasks,
  onEditTask,
  onDeleteTask,
  onToggleTaskStatus,
  onTaskSelection,
  selectedTaskIds,
  isLoading,
}: TaskDashboardProps) => {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <div className="text-sm text-muted-foreground">
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading tasks...</p>
          </div>
        </div>
      ) : (
        <TaskList
          tasks={tasks}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
          onToggleTaskStatus={onToggleTaskStatus}
          onTaskSelection={onTaskSelection}
          selectedTaskIds={selectedTaskIds}
        />
      )}
    </div>
  );
};

export default TaskDashboard;
