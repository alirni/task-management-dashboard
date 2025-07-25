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
import { Calendar, Edit, Trash2, Clock } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleStatus: (taskId: string) => void;
  onSelect?: (taskId: string, isSelected: boolean) => void;
  isSelected?: boolean;
}

const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onToggleStatus,
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
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            {onSelect && (
              <Checkbox
                checked={isSelected}
                onCheckedChange={(checked: boolean) =>
                  onSelect(task.id, checked === true)
                }
                className="mt-1"
              />
            )}
            <CardTitle className="text-lg font-semibold line-clamp-2">
              {task.title}
            </CardTitle>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(task)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
          {task.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary" className={PRIORITY_COLORS[task.priority]}>
            {TASK_PRIORITIES[task.priority]}
          </Badge>
          <Badge variant="outline" className={STATUS_COLORS[task.status]}>
            {TASK_STATUSES[task.status]}
          </Badge>
          {task.category && <Badge variant="outline">{task.category}</Badge>}
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(task.dueDate)}</span>
          </div>
          {task.estimatedTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{task.estimatedTime}m</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-3">
        <Button
          variant={task.status === 'done' ? 'secondary' : 'default'}
          size="sm"
          onClick={() => onToggleStatus(task.id)}
          className="w-full"
        >
          {task.status === 'done'
            ? 'Mark Incomplete'
            : task.status === 'in-progress'
              ? 'Mark Complete'
              : 'Mark In Progress'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
