'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from 'react';
import { Task, TaskFormData } from '@/types/task';
import { TaskState, initialTaskState } from '@/types/task-actions';
import { taskReducer, createTaskFromFormData } from '@/reducers/taskReducer';

// Context type definition
interface TaskContextType {
  // State
  state: TaskState;

  // Task operations
  addTask: (taskData: TaskFormData) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  toggleTaskStatus: (taskId: string) => void;
  duplicateTask: (task: Task) => void;

  // Bulk operations
  bulkDeleteTasks: (taskIds: string[]) => void;
  bulkUpdateStatus: (taskIds: string[], status: Task['status']) => void;

  // Selection operations
  selectTask: (taskId: string, selected: boolean) => void;
  selectAllTasks: (selected: boolean) => void;
  clearSelection: () => void;

  // Data operations
  importTasks: (tasks: TaskFormData[]) => void;
  setTasks: (tasks: Task[]) => void;

  // Loading and error states
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Create context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Provider component
interface TaskProviderProps {
  children: React.ReactNode;
  initialTasks?: Task[];
}

export const TaskProvider: React.FC<TaskProviderProps> = ({
  children,
  initialTasks = [],
}) => {
  const [state, dispatch] = useReducer(taskReducer, {
    ...initialTaskState,
    tasks: initialTasks,
  });

  // Task operations
  const addTask = useCallback((taskData: TaskFormData) => {
    const newTask = createTaskFromFormData(taskData);
    dispatch({ type: 'ADD_TASK', payload: newTask });
  }, []);

  const updateTask = useCallback((taskId: string, updates: Partial<Task>) => {
    dispatch({ type: 'UPDATE_TASK', payload: { id: taskId, updates } });
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  }, []);

  const toggleTaskStatus = useCallback((taskId: string) => {
    dispatch({ type: 'TOGGLE_TASK_STATUS', payload: taskId });
  }, []);

  const duplicateTask = useCallback((task: Task) => {
    dispatch({ type: 'DUPLICATE_TASK', payload: task });
  }, []);

  // Bulk operations
  const bulkDeleteTasks = useCallback((taskIds: string[]) => {
    dispatch({ type: 'BULK_DELETE', payload: taskIds });
  }, []);

  const bulkUpdateStatus = useCallback(
    (taskIds: string[], status: Task['status']) => {
      dispatch({
        type: 'BULK_UPDATE_STATUS',
        payload: { ids: taskIds, status },
      });
    },
    []
  );

  // Selection operations
  const selectTask = useCallback((taskId: string, selected: boolean) => {
    dispatch({ type: 'SELECT_TASK', payload: { id: taskId, selected } });
  }, []);

  const selectAllTasks = useCallback((selected: boolean) => {
    dispatch({ type: 'SELECT_ALL_TASKS', payload: selected });
  }, []);

  const clearSelection = useCallback(() => {
    dispatch({ type: 'CLEAR_SELECTION' });
  }, []);

  // Data operations
  const importTasks = useCallback((tasks: TaskFormData[]) => {
    dispatch({ type: 'IMPORT_TASKS', payload: tasks });
  }, []);

  const setTasks = useCallback((tasks: Task[]) => {
    dispatch({ type: 'SET_TASKS', payload: tasks });
  }, []);

  // Loading and error states
  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, []);

  const setError = useCallback((error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const contextValue: TaskContextType = {
    state,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    duplicateTask,
    bulkDeleteTasks,
    bulkUpdateStatus,
    selectTask,
    selectAllTasks,
    clearSelection,
    importTasks,
    setTasks,
    setLoading,
    setError,
  };

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};

// Custom hook to use task context
export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

// Export types for external use
export type { TaskContextType };
