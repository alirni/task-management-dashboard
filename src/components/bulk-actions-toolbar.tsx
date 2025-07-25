import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Trash2,
  CheckCircle,
  Circle,
  Clock,
  MoreHorizontal,
} from 'lucide-react';

interface BulkActionsToolbarProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: (isSelected: boolean) => void;
  onBulkDelete: () => void;
  onBulkStatusChange: (status: 'todo' | 'in-progress' | 'done') => void;
}

const BulkActionsToolbar = ({
  selectedCount,
  totalCount,
  onSelectAll,
  onBulkDelete,
  onBulkStatusChange,
}: BulkActionsToolbarProps) => {
  const isAllSelected = selectedCount === totalCount && totalCount > 0;
  const isIndeterminate = selectedCount > 0 && selectedCount < totalCount;

  if (totalCount === 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-between rounded-lg border bg-card p-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={isAllSelected}
            ref={(ref: HTMLButtonElement | null) => {
              if (ref) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (ref as any).indeterminate = isIndeterminate;
              }
            }}
            onCheckedChange={(checked: boolean) =>
              onSelectAll(checked === true)
            }
          />
          <span className="text-sm text-muted-foreground">
            {selectedCount > 0
              ? `${selectedCount} of ${totalCount} selected`
              : `Select all ${totalCount} tasks`}
          </span>
        </div>
      </div>

      {selectedCount > 0 && (
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <CheckCircle className="h-4 w-4 mr-2" />
                Change Status
                <MoreHorizontal className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onBulkStatusChange('todo')}>
                <Circle className="h-4 w-4 mr-2" />
                To Do
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onBulkStatusChange('in-progress')}
              >
                <Clock className="h-4 w-4 mr-2" />
                In Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onBulkStatusChange('done')}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Done
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="destructive" size="sm" onClick={onBulkDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Selected
          </Button>
        </div>
      )}
    </div>
  );
};

export default BulkActionsToolbar;
