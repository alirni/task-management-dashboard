'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import DashboardHeader from '@/components/dashboard-header';
import StatsCards from '@/components/stats-cards';
import TaskDashboard from '@/components/task-dashboard';
import CreateTaskDialog from '@/components/create-task-dialog';
import EditTaskDialog from '@/components/edit-task-dialog';
import { Task, TaskFormData } from '@/types/task';
import { useTasks } from '@/hooks/useTasks';

export default function Home() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Use the useTasks hook for task management
  const {
    tasks,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    getSortedTasks,
  } = useTasks();

  // Create sample tasks if none exist (for demo purposes)
  const createSampleTasks = async () => {
    const now = new Date();
    const sampleTasks: TaskFormData[] = [
      {
        title: 'Complete project proposal',
        description: 'Write and review the project proposal for the new client',
        priority: 'high',
        status: 'in-progress',
        category: 'Work',
        tags: ['proposal', 'client'],
        dueDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        estimatedTime: 120,
      },
      {
        title: 'Buy groceries',
        description: 'Get milk, bread, eggs, and vegetables for the week',
        priority: 'medium',
        status: 'todo',
        category: 'Personal',
        tags: ['shopping', 'weekly'],
        dueDate: new Date(now.getTime() + 24 * 60 * 60 * 1000), // Tomorrow
        estimatedTime: 30,
      },
      {
        title: 'Review code changes',
        description: 'Review the pull request from the development team',
        priority: 'high',
        status: 'todo',
        category: 'Work',
        tags: ['code-review', 'development'],
        dueDate: new Date(now.getTime() + 4 * 60 * 60 * 1000), // 4 hours from now
        estimatedTime: 45,
      },
      {
        title: 'Exercise routine',
        description: 'Complete the daily workout routine',
        priority: 'low',
        status: 'done',
        category: 'Health',
        tags: ['fitness', 'daily'],
        dueDate: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
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

  // Get sorted tasks (default by due date)
  const sortedTasks = getSortedTasks('dueDate');

  // Stats calculations
  const totalTasks = tasks.length;
  const inProgress = tasks.filter(task => task.status === 'in-progress').length;
  const completed = tasks.filter(task => task.status === 'done').length;
  const overdue = tasks.filter(
    task => task.status !== 'done' && new Date(task.dueDate) < new Date()
  ).length;

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
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
        toast.success('Task deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete task');
        console.error('Error deleting task:', error);
      }
    }
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

  const handleFilter = () => {
    console.log('Filter clicked');
  };

  const handleSort = () => {
    console.log('Sort clicked');
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        onCreateTask={() => setIsCreateDialogOpen(true)}
        onFilter={handleFilter}
        onSort={handleSort}
        onCreateSampleData={createSampleTasks}
        showSampleData={tasks.length === 0}
      />

      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <StatsCards
            totalTasks={totalTasks}
            inProgress={inProgress}
            completed={completed}
            overdue={overdue}
          />

          <TaskDashboard
            tasks={sortedTasks}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onToggleTaskStatus={handleToggleTaskStatus}
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
    </div>
  );
}
