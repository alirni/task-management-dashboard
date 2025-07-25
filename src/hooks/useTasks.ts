import { useState, useCallback } from 'react';
import { Task, TaskFormData } from '@/types/task';
import { useLocalStorage } from './useLocalStorage';

const STORAGE_KEY = 'task-management-tasks';

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEY, []);
  const [isLoading, setIsLoading] = useState(false);

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const addTask = useCallback(
    async (taskData: TaskFormData) => {
      setIsLoading(true);
      try {
        const newTask: Task = {
          id: generateId(),
          ...taskData,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        setTasks(prevTasks => [...prevTasks, newTask]);
        return newTask;
      } finally {
        setIsLoading(false);
      }
    },
    [setTasks]
  );

  const updateTask = useCallback(
    async (taskId: string, taskData: Partial<TaskFormData>) => {
      setIsLoading(true);
      try {
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task.id === taskId
              ? {
                  ...task,
                  ...taskData,
                  updatedAt: new Date(),
                }
              : task
          )
        );
      } finally {
        setIsLoading(false);
      }
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    async (taskId: string) => {
      setIsLoading(true);
      try {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      } finally {
        setIsLoading(false);
      }
    },
    [setTasks]
  );

  const toggleTaskStatus = useCallback(
    async (taskId: string) => {
      setIsLoading(true);
      try {
        setTasks(prevTasks =>
          prevTasks.map(task => {
            if (task.id === taskId) {
              const newStatus =
                task.status === 'done'
                  ? 'todo'
                  : task.status === 'todo'
                    ? 'in-progress'
                    : 'done';
              return {
                ...task,
                status: newStatus,
                updatedAt: new Date(),
              };
            }
            return task;
          })
        );
      } finally {
        setIsLoading(false);
      }
    },
    [setTasks]
  );

  const getSortedTasks = useCallback(
    (sortBy: 'priority' | 'dueDate' | 'status' = 'dueDate') => {
      return [...tasks].sort((a, b) => {
        switch (sortBy) {
          case 'priority': {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
          }
          case 'dueDate':
            return (
              new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
            );
          case 'status': {
            const statusOrder = { todo: 1, 'in-progress': 2, done: 3 };
            return statusOrder[a.status] - statusOrder[b.status];
          }
          default:
            return 0;
        }
      });
    },
    [tasks]
  );

  return {
    tasks,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    getSortedTasks,
  };
}
