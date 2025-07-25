import { TaskAction, TaskState } from '@/types/task-actions';
import { Task, TaskFormData } from '@/types/task';

// Helper function to generate unique IDs
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Helper function to convert TaskFormData to Task
const createTaskFromFormData = (formData: TaskFormData): Task => {
  return {
    id: generateId(),
    ...formData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

// Helper function to toggle task status
const getNextStatus = (currentStatus: Task['status']): Task['status'] => {
  switch (currentStatus) {
    case 'todo':
      return 'in-progress';
    case 'in-progress':
      return 'done';
    case 'done':
      return 'todo';
    default:
      return 'todo';
  }
};

// Task reducer function
export const taskReducer = (
  state: TaskState,
  action: TaskAction
): TaskState => {
  switch (action.type) {
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload,
        lastAction: 'SET_TASKS',
        error: null,
      };

    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        lastAction: 'ADD_TASK',
        error: null,
      };

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates, updatedAt: new Date() }
            : task
        ),
        lastAction: 'UPDATE_TASK',
        error: null,
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
        selectedTaskIds: state.selectedTaskIds.filter(
          id => id !== action.payload
        ),
        lastAction: 'DELETE_TASK',
        error: null,
      };

    case 'TOGGLE_TASK_STATUS':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? {
                ...task,
                status: getNextStatus(task.status),
                updatedAt: new Date(),
              }
            : task
        ),
        lastAction: 'TOGGLE_TASK_STATUS',
        error: null,
      };

    case 'DUPLICATE_TASK':
      const duplicatedTask = {
        ...action.payload,
        id: generateId(),
        title: `${action.payload.title} (Copy)`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return {
        ...state,
        tasks: [...state.tasks, duplicatedTask],
        lastAction: 'DUPLICATE_TASK',
        error: null,
      };

    case 'BULK_DELETE':
      return {
        ...state,
        tasks: state.tasks.filter(task => !action.payload.includes(task.id)),
        selectedTaskIds: state.selectedTaskIds.filter(
          id => !action.payload.includes(id)
        ),
        lastAction: 'BULK_DELETE',
        error: null,
      };

    case 'BULK_UPDATE_STATUS':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          action.payload.ids.includes(task.id)
            ? { ...task, status: action.payload.status, updatedAt: new Date() }
            : task
        ),
        lastAction: 'BULK_UPDATE_STATUS',
        error: null,
      };

    case 'SELECT_TASK':
      return {
        ...state,
        selectedTaskIds: action.payload.selected
          ? [...state.selectedTaskIds, action.payload.id]
          : state.selectedTaskIds.filter(id => id !== action.payload.id),
        lastAction: 'SELECT_TASK',
      };

    case 'SELECT_ALL_TASKS':
      return {
        ...state,
        selectedTaskIds: action.payload ? state.tasks.map(task => task.id) : [],
        lastAction: 'SELECT_ALL_TASKS',
      };

    case 'CLEAR_SELECTION':
      return {
        ...state,
        selectedTaskIds: [],
        lastAction: 'CLEAR_SELECTION',
      };

    case 'IMPORT_TASKS':
      const importedTasks = action.payload.map(createTaskFromFormData);
      return {
        ...state,
        tasks: [...state.tasks, ...importedTasks],
        lastAction: 'IMPORT_TASKS',
        error: null,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

// Export helper functions for use in context
export { generateId, createTaskFromFormData };
