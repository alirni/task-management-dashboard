import { Button } from '@/components/ui/button';
import { Filter, Plus } from 'lucide-react';
import KeyboardShortcutsHelp from './keyboard-shortcuts-help';
import DataExportImportDialog from './data-export-import-dialog';
import { ThemeToggle } from './theme-toggle';
import { Task, TaskFormData } from '@/types/task';

interface DashboardHeaderProps {
  onCreateTask: () => void;
  onFilter: () => void;
  onCreateSampleData?: () => void;
  showSampleData?: boolean;
  tasks: Task[];
  onImportTasks: (tasks: TaskFormData[]) => Promise<void>;
}

const DashboardHeader = ({
  onCreateTask,
  onFilter,
  onCreateSampleData,
  showSampleData = false,
  tasks,
  onImportTasks,
}: DashboardHeaderProps) => {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Task Management Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Organize and track your tasks efficiently
            </p>
          </div>

          <div className="flex items-center gap-2">
            {showSampleData && onCreateSampleData && (
              <Button variant="outline" size="sm" onClick={onCreateSampleData}>
                <Plus className="h-4 w-4 mr-2" />
                Sample Data
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={onFilter}>
              <Filter className="h-4 w-4" />
            </Button>
            <DataExportImportDialog
              tasks={tasks}
              onImportTasks={onImportTasks}
            />
            <ThemeToggle />
            <KeyboardShortcutsHelp />
            <Button onClick={onCreateTask}>
              <Plus className="h-4 w-4 mr-2" />
              Create Task
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
