'use client';

import { useState } from 'react';
import DashboardHeader from '@/components/dashboard-header';
import StatsCards from '@/components/stats-cards';
import TaskDashboard from '@/components/task-dashboard';
import CreateTaskDialog from '@/components/create-task-dialog';
import EditTaskDialog from '@/components/edit-task-dialog';
import { Task, TaskFormData } from '@/types/task';

export default function Home() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Placeholder data - will be replaced with useTasks hook
  const tasks: Task[] = [];
  const isLoading = false;

  // Stats calculations
  const totalTasks = tasks.length;
  const inProgress = tasks.filter(task => task.status === 'in-progress').length;
  const completed = tasks.filter(task => task.status === 'done').length;
  const overdue = tasks.filter(
    task => task.status !== 'done' && new Date(task.dueDate) < new Date()
  ).length;

  // Event handlers
  const handleCreateTask = (data: TaskFormData) => {
    console.log('Creating task:', data);
    setIsCreateDialogOpen(false);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsEditDialogOpen(true);
  };

  const handleUpdateTask = (taskId: string, data: Partial<TaskFormData>) => {
    console.log('Updating task:', taskId, data);
    setIsEditDialogOpen(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    console.log('Deleting task:', taskId);
  };

  const handleToggleTaskStatus = (taskId: string) => {
    console.log('Toggling task status:', taskId);
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
            tasks={tasks}
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
