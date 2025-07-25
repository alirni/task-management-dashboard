import { Task, TaskFormData } from '@/types/task';

export interface ExportData {
  version: string;
  exportDate: string;
  tasks: Task[];
  metadata: {
    totalTasks: number;
    exportedBy: string;
  };
}

export const exportTasksToJSON = (tasks: Task[]): string => {
  const exportData: ExportData = {
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    tasks,
    metadata: {
      totalTasks: tasks.length,
      exportedBy: 'Task Management Dashboard',
    },
  };

  return JSON.stringify(exportData, null, 2);
};

export const downloadJSON = (
  jsonString: string,
  filename: string = 'tasks-export.json'
): void => {
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const validateImportData = (
  data: unknown
): { isValid: boolean; error?: string; tasks?: Task[] } => {
  try {
    // Check if data has the expected structure
    if (!data || typeof data !== 'object') {
      return {
        isValid: false,
        error: 'Invalid file format: not a valid JSON object',
      };
    }

    // Check for required fields
    const dataObj = data as Record<string, unknown>;
    if (!('tasks' in dataObj) || !Array.isArray(dataObj.tasks)) {
      return {
        isValid: false,
        error: 'Invalid file format: tasks array not found',
      };
    }

    const tasks = dataObj.tasks;

    // Validate each task
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];

      if (!task.id || typeof task.id !== 'string') {
        return {
          isValid: false,
          error: `Task ${i + 1}: missing or invalid id`,
        };
      }

      if (!task.title || typeof task.title !== 'string') {
        return {
          isValid: false,
          error: `Task ${i + 1}: missing or invalid title`,
        };
      }

      if (!task.description || typeof task.description !== 'string') {
        return {
          isValid: false,
          error: `Task ${i + 1}: missing or invalid description`,
        };
      }

      if (!['low', 'medium', 'high'].includes(task.priority)) {
        return {
          isValid: false,
          error: `Task ${i + 1}: invalid priority (must be low, medium, or high)`,
        };
      }

      if (!['todo', 'in-progress', 'done'].includes(task.status)) {
        return {
          isValid: false,
          error: `Task ${i + 1}: invalid status (must be todo, in-progress, or done)`,
        };
      }

      if (!task.category || typeof task.category !== 'string') {
        return {
          isValid: false,
          error: `Task ${i + 1}: missing or invalid category`,
        };
      }

      if (!Array.isArray(task.tags)) {
        return {
          isValid: false,
          error: `Task ${i + 1}: tags must be an array`,
        };
      }

      if (!task.dueDate || isNaN(new Date(task.dueDate).getTime())) {
        return {
          isValid: false,
          error: `Task ${i + 1}: missing or invalid due date`,
        };
      }

      if (typeof task.estimatedTime !== 'number' || task.estimatedTime < 0) {
        return {
          isValid: false,
          error: `Task ${i + 1}: invalid estimated time`,
        };
      }

      if (!task.createdAt || isNaN(new Date(task.createdAt).getTime())) {
        return {
          isValid: false,
          error: `Task ${i + 1}: missing or invalid created date`,
        };
      }

      if (!task.updatedAt || isNaN(new Date(task.updatedAt).getTime())) {
        return {
          isValid: false,
          error: `Task ${i + 1}: missing or invalid updated date`,
        };
      }
    }

    return { isValid: true, tasks };
  } catch {
    return { isValid: false, error: 'Invalid JSON format' };
  }
};

export const generateFileName = (prefix: string = 'tasks-export'): string => {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
  const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // HH-MM-SS
  return `${prefix}-${dateStr}-${timeStr}.json`;
};

// Convert imported tasks to TaskFormData for adding to the system
export const convertTasksForImport = (
  importedTasks: Task[]
): TaskFormData[] => {
  return importedTasks.map(task => ({
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
    category: task.category,
    tags: [...task.tags],
    dueDate: new Date(task.dueDate),
    estimatedTime: task.estimatedTime,
  }));
};
