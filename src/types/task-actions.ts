import { Task, TaskFormData } from './task';

// Action types for task management
export type TaskAction =
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: { id: string; updates: Partial<Task> } }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'TOGGLE_TASK_STATUS'; payload: string }
  | { type: 'DUPLICATE_TASK'; payload: Task }
  | { type: 'BULK_DELETE'; payload: string[] }
  | {
      type: 'BULK_UPDATE_STATUS';
      payload: { ids: string[]; status: Task['status'] };
    }
  | { type: 'SELECT_TASK'; payload: { id: string; selected: boolean } }
  | { type: 'SELECT_ALL_TASKS'; payload: boolean }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'IMPORT_TASKS'; payload: TaskFormData[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// State interface
export interface TaskState {
  tasks: Task[];
  selectedTaskIds: string[];
  isLoading: boolean;
  error: string | null;
  lastAction: string | null;
}

// Initial state
export const initialTaskState: TaskState = {
  tasks: [],
  selectedTaskIds: [],
  isLoading: false,
  error: null,
  lastAction: null,
};
