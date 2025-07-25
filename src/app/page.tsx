'use client';

import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import DashboardHeader from '@/components/dashboard-header';
import StatsCards from '@/components/stats-cards';
import TaskDashboard from '@/components/task-dashboard';
import TaskFilters from '@/components/task-filters';
import BulkActionsToolbar from '@/components/bulk-actions-toolbar';
import CreateTaskDialog from '@/components/create-task-dialog';
import EditTaskDialog from '@/components/edit-task-dialog';
import ConfirmationDialog from '@/components/confirmation-dialog';
import { HydrationSafe } from '@/components/hydration-safe';
import { Task, TaskFormData } from '@/types/task';
import { useTaskContext } from '@/contexts/TaskContext';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export default function Home() {
  // Get task context
  const {
    state: { tasks, selectedTaskIds, isLoading },
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    selectTask,
    selectAllTasks,
    clearSelection,
    bulkDeleteTasks,
  } = useTaskContext();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showFilters, setShowFilters] = useState(true);
  const [isMac, setIsMac] = useState(false);

  // Ref for search input to focus with keyboard shortcut
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Detect platform on client side only
  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  // Confirmation dialog state
  const [confirmationDialog, setConfirmationDialog] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    confirmText?: string;
    variant?: 'default' | 'destructive';
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    description: '',
    onConfirm: () => {},
  });

  // Filter and Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'priority' | 'dueDate' | 'status'>(
    'dueDate'
  );

  // Use optimized hooks for task operations
  const getSortedTasks = (tasks: Task[]) => {
    return [...tasks].sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'dueDate':
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'status':
          const statusOrder = { todo: 1, 'in-progress': 2, done: 3 };
          return statusOrder[a.status] - statusOrder[b.status];
        default:
          return 0;
      }
    });
  };

  // Get sorted and filtered tasks
  const sortedTasks = getSortedTasks(tasks);
  const filteredTasks = sortedTasks.filter((task: Task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority =
      priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesCategory =
      categoryFilter === 'all' || task.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  // Calculate statistics
  const totalTasks = tasks.length;
  const inProgress = tasks.filter(
    (task: Task) => task.status === 'in-progress'
  ).length;
  const completed = tasks.filter((task: Task) => task.status === 'done').length;
  const overdue = tasks.filter(
    (task: Task) =>
      task.status !== 'done' && new Date(task.dueDate) < new Date()
  ).length;

  // Create sample tasks if none exist (for demo purposes)
  const createSampleTasks = async () => {
    // Use a fixed base date to avoid hydration mismatches
    const baseDate = new Date('2025-07-25T12:00:00Z');
    const sampleTasks: TaskFormData[] = [
      {
        title: 'Complete project proposal',
        description: 'Write and review the project proposal for the new client',
        priority: 'high',
        status: 'in-progress',
        category: 'Work',
        tags: ['proposal', 'client'],
        dueDate: new Date(baseDate.getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from base
        estimatedTime: 120,
      },
      {
        title: 'Buy groceries',
        description: 'Get milk, bread, eggs, and vegetables for the week',
        priority: 'medium',
        status: 'todo',
        category: 'Personal',
        tags: ['shopping', 'weekly'],
        dueDate: new Date(baseDate.getTime() + 24 * 60 * 60 * 1000), // 1 day from base
        estimatedTime: 30,
      },
      {
        title: 'Review code changes',
        description: 'Review the pull request from the development team',
        priority: 'high',
        status: 'todo',
        category: 'Work',
        tags: ['code-review', 'development'],
        dueDate: new Date(baseDate.getTime() + 4 * 60 * 60 * 1000), // 4 hours from base
        estimatedTime: 45,
      },
      {
        title: 'Exercise routine',
        description: 'Complete the daily workout routine',
        priority: 'low',
        status: 'done',
        category: 'Health',
        tags: ['fitness', 'daily'],
        dueDate: new Date(baseDate.getTime() - 2 * 60 * 60 * 1000), // 2 hours before base
        estimatedTime: 60,
      },
    ];

    // Add sample tasks one by one
    for (const taskData of sampleTasks) {
      try {
        await addTask(taskData);
      } catch (error) {
        console.error('Error adding sample task:', error);
      }
    }
    toast.success('Sample tasks created!');
  };

  // Event handlers
  const handleCreateTask = async (data: TaskFormData) => {
    try {
      await addTask(data);
      toast.success('Task created successfully!');
      setIsCreateDialogOpen(false);
    } catch (error) {
      toast.error('Failed to create task');
      console.error('Error creating task:', error);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsEditDialogOpen(true);
  };

  const handleDuplicateTask = async (task: Task) => {
    try {
      const duplicatedTaskData: TaskFormData = {
        title: `${task.title} (Copy)`,
        description: task.description,
        priority: task.priority,
        status: 'todo', // Reset status to todo for new duplicate
        category: task.category,
        tags: [...task.tags], // Copy the tags array
        dueDate: new Date(
          new Date(task.dueDate).getTime() + 24 * 60 * 60 * 1000
        ), // Set due date to day after original
        estimatedTime: task.estimatedTime,
      };

      await addTask(duplicatedTaskData);
      toast.success('Task duplicated successfully!');
    } catch (error) {
      toast.error('Failed to duplicate task');
      console.error('Error duplicating task:', error);
    }
  };

  const handleUpdateTask = async (
    taskId: string,
    data: Partial<TaskFormData>
  ) => {
    try {
      await updateTask(taskId, data);
      toast.success('Task updated successfully!');
      setIsEditDialogOpen(false);
      setEditingTask(null);
    } catch (error) {
      toast.error('Failed to update task');
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    const taskTitle = task?.title || 'this task';

    showConfirmation(
      'Delete Task',
      `Are you sure you want to delete "${taskTitle}"? This action cannot be undone.`,
      async () => {
        try {
          await deleteTask(taskId);
          toast.success('Task deleted successfully!');
        } catch (error) {
          toast.error('Failed to delete task');
          console.error('Error deleting task:', error);
        }
      },
      'Delete',
      'destructive'
    );
  };

  const handleToggleTaskStatus = async (taskId: string) => {
    try {
      await toggleTaskStatus(taskId);
      toast.success('Task status updated!');
    } catch (error) {
      toast.error('Failed to update task status');
      console.error('Error toggling task status:', error);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setPriorityFilter('all');
    setCategoryFilter('all');
  };

  const showConfirmation = (
    title: string,
    description: string,
    onConfirm: () => void,
    confirmText?: string,
    variant?: 'default' | 'destructive'
  ) => {
    setConfirmationDialog({
      isOpen: true,
      title,
      description,
      confirmText,
      variant,
      onConfirm,
    });
  };

  const closeConfirmation = () => {
    setConfirmationDialog(prev => ({ ...prev, isOpen: false }));
  };

  const handleTaskSelection = (taskId: string, isSelected: boolean) => {
    selectTask(taskId, isSelected);
  };

  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      selectAllTasks(true);
    } else {
      selectAllTasks(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedTaskIds.length === 0) return;

    const count = selectedTaskIds.length;
    const taskText = count === 1 ? 'task' : 'tasks';

    showConfirmation(
      'Delete Tasks',
      `Are you sure you want to delete ${count} ${taskText}? This action cannot be undone.`,
      async () => {
        try {
          bulkDeleteTasks(selectedTaskIds);
          toast.success(
            `${selectedTaskIds.length} task(s) deleted successfully!`
          );
          clearSelection();
        } catch (error) {
          toast.error('Failed to delete some tasks');
          console.error('Error in bulk delete:', error);
        }
      },
      `Delete ${count} ${taskText}`,
      'destructive'
    );
  };

  const handleBulkStatusChange = async (
    newStatus: 'todo' | 'in-progress' | 'done'
  ) => {
    if (selectedTaskIds.length === 0) return;

    try {
      for (const taskId of selectedTaskIds) {
        const task = tasks.find(t => t.id === taskId);
        if (task && task.status !== newStatus) {
          await updateTask(taskId, { status: newStatus });
        }
      }
      toast.success(`${selectedTaskIds.length} task(s) status updated!`);
      clearSelection();
    } catch (error) {
      toast.error('Failed to update some tasks');
      console.error('Error in bulk status change:', error);
    }
  };

  const handleFilter = () => {
    setShowFilters(!showFilters);
  };

  // Handle bulk import of tasks
  const handleImportTasks = async (tasksToImport: TaskFormData[]) => {
    try {
      for (const taskData of tasksToImport) {
        await addTask(taskData);
      }
      toast.success(`${tasksToImport.length} tasks imported successfully!`);
    } catch (error) {
      toast.error('Failed to import some tasks');
      console.error('Error importing tasks:', error);
      throw error; // Re-throw to let the dialog handle the error
    }
  };

  // Keyboard shortcuts setup
  const shortcuts = [
    {
      key: 'n',
      ctrlKey: !isMac,
      metaKey: isMac,
      action: () => setIsCreateDialogOpen(true),
      description: 'Create new task',
    },
    {
      key: 'a',
      ctrlKey: !isMac,
      metaKey: isMac,
      action: () => handleSelectAll(true),
      description: 'Select all tasks',
    },
    {
      key: 'd',
      ctrlKey: !isMac,
      metaKey: isMac,
      action: () => {
        if (selectedTaskIds.length === 1) {
          const task = tasks.find(t => t.id === selectedTaskIds[0]);
          if (task) {
            handleDuplicateTask(task);
          }
        } else if (selectedTaskIds.length === 0) {
          toast.error('Please select a task to duplicate');
        } else {
          toast.error('Please select only one task to duplicate');
        }
      },
      description: 'Duplicate selected task',
    },
    {
      key: 'Delete',
      action: () => {
        if (selectedTaskIds.length > 0) {
          handleBulkDelete();
        }
      },
      description: 'Delete selected tasks',
    },
    {
      key: 'f',
      ctrlKey: !isMac,
      metaKey: isMac,
      action: () => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      },
      description: 'Focus search box',
    },
    {
      key: 'Escape',
      action: () => {
        clearSelection();
        closeConfirmation();
      },
      description: 'Clear selections and close dialogs',
    },
  ];

  useKeyboardShortcuts({ shortcuts });

  return (
    <HydrationSafe fallback={<div className="min-h-screen bg-background" />}>
      <div className="min-h-screen bg-background">
        <DashboardHeader
          onCreateTask={() => setIsCreateDialogOpen(true)}
          onFilter={handleFilter}
          onCreateSampleData={createSampleTasks}
          showSampleData={tasks.length === 0}
          tasks={tasks}
          onImportTasks={handleImportTasks}
        />

        <main className="container mx-auto px-3 py-4 sm:px-4 sm:py-6">
          <div className="space-y-4 sm:space-y-6">
            <StatsCards
              totalTasks={totalTasks}
              inProgress={inProgress}
              completed={completed}
              overdue={overdue}
            />

            {showFilters && (
              <TaskFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                priorityFilter={priorityFilter}
                onPriorityFilterChange={setPriorityFilter}
                categoryFilter={categoryFilter}
                onCategoryFilterChange={setCategoryFilter}
                sortBy={sortBy}
                onSortByChange={setSortBy}
                onClearFilters={handleClearFilters}
                searchInputRef={searchInputRef}
              />
            )}

            <BulkActionsToolbar
              selectedCount={selectedTaskIds.length}
              totalCount={filteredTasks.length}
              onSelectAll={handleSelectAll}
              onBulkDelete={handleBulkDelete}
              onBulkStatusChange={handleBulkStatusChange}
            />

            <TaskDashboard
              tasks={filteredTasks}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onToggleTaskStatus={handleToggleTaskStatus}
              onDuplicateTask={handleDuplicateTask}
              onTaskSelection={handleTaskSelection}
              selectedTaskIds={selectedTaskIds}
              isLoading={isLoading}
            />
          </div>
        </main>

        <CreateTaskDialog
          isOpen={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onCreateTask={handleCreateTask}
          isLoading={isLoading}
        />

        <EditTaskDialog
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          task={editingTask}
          onEditTask={handleUpdateTask}
          isLoading={isLoading}
        />

        <ConfirmationDialog
          isOpen={confirmationDialog.isOpen}
          onOpenChange={closeConfirmation}
          title={confirmationDialog.title}
          description={confirmationDialog.description}
          confirmText={confirmationDialog.confirmText}
          variant={confirmationDialog.variant}
          onConfirm={confirmationDialog.onConfirm}
        />
      </div>
    </HydrationSafe>
  );
}
