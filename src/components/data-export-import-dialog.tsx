import { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { Task, TaskFormData } from '@/types/task';
import {
  exportTasksToJSON,
  downloadJSON,
  validateImportData,
  generateFileName,
  convertTasksForImport,
} from '@/utils/dataExportImport';
import toast from 'react-hot-toast';

interface DataExportImportDialogProps {
  tasks: Task[];
  onImportTasks: (tasks: TaskFormData[]) => Promise<void>;
  children?: React.ReactNode;
}

const DataExportImportDialog = ({
  tasks,
  onImportTasks,
  children,
}: DataExportImportDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('export');
  const [importStatus, setImportStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error';
    message: string;
  }>({ type: 'idle', message: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    try {
      if (tasks.length === 0) {
        toast.error('No tasks to export');
        return;
      }

      const jsonString = exportTasksToJSON(tasks);
      const filename = generateFileName('tasks-export');
      downloadJSON(jsonString, filename);

      toast.success(`${tasks.length} tasks exported successfully!`);
      setIsOpen(false);
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export tasks');
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImportStatus({ type: 'idle', message: '' });
    }
  };

  const handleImport = async () => {
    if (!selectedFile) {
      setImportStatus({
        type: 'error',
        message: 'Please select a file to import',
      });
      return;
    }

    setImportStatus({ type: 'loading', message: 'Processing file...' });

    try {
      const fileContent = await selectedFile.text();
      const parsedData = JSON.parse(fileContent);

      const validation = validateImportData(parsedData);

      if (!validation.isValid) {
        setImportStatus({
          type: 'error',
          message: validation.error || 'Invalid file format',
        });
        return;
      }

      if (!validation.tasks || validation.tasks.length === 0) {
        setImportStatus({
          type: 'error',
          message: 'No tasks found in the file',
        });
        return;
      }

      // Convert tasks for import (removes IDs and timestamps to create new tasks)
      const tasksToImport = convertTasksForImport(validation.tasks);

      // Import tasks
      await onImportTasks(tasksToImport);

      setImportStatus({
        type: 'success',
        message: `Successfully imported ${validation.tasks.length} tasks!`,
      });

      toast.success(`${validation.tasks.length} tasks imported successfully!`);

      // Reset form
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Close dialog after a short delay
      setTimeout(() => {
        setIsOpen(false);
        setImportStatus({ type: 'idle', message: '' });
      }, 2000);
    } catch (error) {
      console.error('Import error:', error);
      setImportStatus({
        type: 'error',
        message:
          "Failed to read or parse the file. Please ensure it's a valid JSON file.",
      });
    }
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset state when dialog is closed
      setImportStatus({ type: 'idle', message: '' });
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export/Import
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md mx-2 sm:mx-auto w-auto sm:w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            Data Export/Import
          </DialogTitle>
          <DialogDescription className="text-sm">
            Export your tasks to JSON or import tasks from a file.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-3 sm:mb-4">
            <TabsTrigger value="export">Export</TabsTrigger>
            <TabsTrigger value="import">Import</TabsTrigger>
          </TabsList>

          <TabsContent value="export" className="space-y-3 sm:space-y-4">
            <div className="space-y-2">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Export all your tasks to a JSON file for backup or sharing.
              </p>
              <div className="p-2 sm:p-3 bg-muted rounded-lg">
                <p className="text-xs sm:text-sm font-medium">
                  Export Information:
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Total tasks: {tasks.length}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Format: JSON
                </p>
              </div>
            </div>
            <Button
              onClick={handleExport}
              className="w-full text-sm"
              disabled={tasks.length === 0}
            >
              <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              <span className="hidden xs:inline">
                Export Tasks ({tasks.length})
              </span>
              <span className="xs:hidden">Export ({tasks.length})</span>
            </Button>
          </TabsContent>

          <TabsContent value="import" className="space-y-3 sm:space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="import-file">Select JSON file to import</Label>
                <Input
                  id="import-file"
                  type="file"
                  accept=".json"
                  onChange={handleFileSelect}
                  ref={fileInputRef}
                />
                <p className="text-xs text-muted-foreground">
                  Only JSON files exported from this application are supported.
                </p>
              </div>

              {importStatus.type !== 'idle' && (
                <Alert
                  variant={
                    importStatus.type === 'error' ? 'destructive' : 'default'
                  }
                >
                  {importStatus.type === 'error' && (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  {importStatus.type === 'success' && (
                    <CheckCircle className="h-4 w-4" />
                  )}
                  <AlertDescription>{importStatus.message}</AlertDescription>
                </Alert>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={handleImport}
                  disabled={
                    !selectedFile ||
                    importStatus.type === 'loading' ||
                    importStatus.type === 'success'
                  }
                  className="flex-1"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {importStatus.type === 'loading'
                    ? 'Importing...'
                    : 'Import Tasks'}
                </Button>
              </div>

              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  Import Notes:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Tasks will be added to your existing tasks</li>
                  <li>• New IDs and timestamps will be generated</li>
                  <li>• Duplicate tasks may be created</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default DataExportImportDialog;
