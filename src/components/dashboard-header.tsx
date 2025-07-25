import { Button } from '@/components/ui/button';
import { Filter, Plus } from 'lucide-react';

interface DashboardHeaderProps {
  onCreateTask: () => void;
  onFilter: () => void;
  onCreateSampleData?: () => void;
  showSampleData?: boolean;
  showFilters?: boolean;
}

const DashboardHeader = ({
  onCreateTask,
  onFilter,
  onCreateSampleData,
  showSampleData = false,
  showFilters = true,
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
              <Filter className="h-4 w-4 mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
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
