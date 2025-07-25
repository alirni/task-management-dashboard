import { Task } from '@/types/task';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  PRIORITY_COLORS,
  STATUS_COLORS,
  TASK_PRIORITIES,
  TASK_STATUSES,
} from '@/constants';
import { Calendar, Edit, Trash2, Clock, Copy } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleStatus: (taskId: string) => void;
  onDuplicate?: (task: Task) => void;
  onSelect?: (taskId: string, isSelected: boolean) => void;
  isSelected?: boolean;
}

const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onToggleStatus,
  onDuplicate,
  onSelect,
  isSelected = false,
}: TaskCardProps) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(date));
  };

  return (
    <Card
      className={`transition-shadow hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
    >
      <CardHeader className="pb-2 sm:pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
            {onSelect && (
              <Checkbox
                checked={isSelected}
                onCheckedChange={(checked: boolean) =>
                  onSelect(task.id, checked === true)
                }
                className="mt-1 flex-shrink-0"
              />
            )}
            <CardTitle className="text-sm sm:text-lg font-semibold line-clamp-2 min-w-0">
              {task.title}
            </CardTitle>
          </div>
          <div className="flex gap-0.5 sm:gap-1 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(task)}
              className="h-6 w-6 sm:h-8 sm:w-8 p-0"
              title="Edit task"
            >
              <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            {onDuplicate && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDuplicate(task)}
                className="h-6 w-6 sm:h-8 sm:w-8 p-0"
                title="Duplicate task"
              >
                <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="h-6 w-6 sm:h-8 sm:w-8 p-0 text-destructive hover:text-destructive"
              title="Delete task"
            >
              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-2 sm:pb-3">
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 mb-2 sm:mb-3">
          {task.description}
        </p>

        <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
          <Badge
            variant="secondary"
            className={`text-xs ${PRIORITY_COLORS[task.priority]}`}
          >
            {TASK_PRIORITIES[task.priority]}
          </Badge>
          <Badge
            variant="outline"
            className={`text-xs ${STATUS_COLORS[task.status]}`}
          >
            {TASK_STATUSES[task.status]}
          </Badge>
          {task.category && (
            <Badge variant="outline" className="text-xs">
              {task.category}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span className="text-xs">{formatDate(task.dueDate)}</span>
          </div>
          {task.estimatedTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span className="text-xs">{task.estimatedTime}m</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-2 sm:pt-3">
        <Button
          variant={task.status === 'done' ? 'secondary' : 'default'}
          size="sm"
          onClick={() => onToggleStatus(task.id)}
          className="w-full text-xs sm:text-sm h-7 sm:h-9"
        >
          <span className="block sm:hidden">
            {task.status === 'done'
              ? 'Complete'
              : task.status === 'in-progress'
                ? 'Done'
                : 'Start'}
          </span>
          <span className="hidden sm:block">
            {task.status === 'done'
              ? 'Mark Incomplete'
              : task.status === 'in-progress'
                ? 'Mark Complete'
                : 'Mark In Progress'}
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
