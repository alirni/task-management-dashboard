export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
  category: string;
  tags: string[];
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  estimatedTime?: number; // in minutes
}

export type TaskPriority = Task['priority'];
export type TaskStatus = Task['status'];

export interface TaskFormData {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  category: string;
  tags: string[];
  dueDate: Date;
  estimatedTime?: number;
}

export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  category?: string;
  search?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}
