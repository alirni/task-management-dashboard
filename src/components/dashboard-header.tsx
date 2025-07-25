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
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-center lg:text-left">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              Task Management Dashboard
            </h1>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Organize and track your tasks efficiently
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-end">
            {showSampleData && onCreateSampleData && (
              <Button
                variant="outline"
                size="sm"
                onClick={onCreateSampleData}
                className="flex-1 sm:flex-none"
              >
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Sample Data</span>
                <span className="sm:hidden">Sample</span>
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={onFilter}
              className="flex-1 sm:flex-none"
            >
              <Filter className="h-4 w-4" />
              <span className="ml-1 hidden sm:inline">Filters</span>
            </Button>
            <DataExportImportDialog
              tasks={tasks}
              onImportTasks={onImportTasks}
            />
            <ThemeToggle />
            <KeyboardShortcutsHelp />
            <Button onClick={onCreateTask} className="flex-1 sm:flex-none">
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden xs:inline">Create Task</span>
              <span className="xs:hidden">Create</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
