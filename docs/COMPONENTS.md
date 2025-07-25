# Component Documentation

This document provides detailed information about all components in the Task Management Dashboard application.

## Table of Contents

- [Core Components](#core-components)
- [UI Components](#ui-components)
- [Layout Components](#layout-components)
- [Dialog Components](#dialog-components)
- [Utility Components](#utility-components)

## Core Components

### TaskCard

**Location**: `src/components/task-card.tsx`

A reusable component for displaying individual task information.

**Props**:
```typescript
interface TaskCardProps {
  task: Task;
  isSelected: boolean;
  onSelect: (selected: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleStatus: () => void;
  onDuplicate: () => void;
}
```

**Features**:
- Task status visualization with color coding
- Priority indicators
- Due date display with overdue highlighting
- Tag display
- Interactive action buttons
- Selection checkbox for bulk operations
- Responsive design

**Usage**:
```tsx
<TaskCard
  task={task}
  isSelected={selectedTaskIds.includes(task.id)}
  onSelect={(selected) => selectTask(task.id, selected)}
  onEdit={() => handleEditTask(task)}
  onDelete={() => handleDeleteTask(task.id)}
  onToggleStatus={() => toggleTaskStatus(task.id)}
  onDuplicate={() => handleDuplicateTask(task)}
/>
```

### TaskList

**Location**: `src/components/task-list.tsx`

Container component for displaying a collection of tasks.

**Props**:
```typescript
interface TaskListProps {
  tasks: Task[];
  selectedTaskIds: string[];
  onSelectTask: (taskId: string, selected: boolean) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onToggleTaskStatus: (taskId: string) => void;
  onDuplicateTask: (task: Task) => void;
}
```

**Features**:
- Grid layout with responsive columns
- Empty state handling
- Task filtering and sorting
- Bulk selection support

### TaskForm

**Location**: `src/components/task-form.tsx`

Reusable form component for creating and editing tasks.

**Props**:
```typescript
interface TaskFormProps {
  task?: Task; // Optional for edit mode
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}
```

**Features**:
- Form validation with Zod schema
- React Hook Form integration
- Rich form fields (text, select, date, tags)
- Error handling and display
- Accessibility features

## UI Components

### Button

**Location**: `src/components/ui/button.tsx`

Versatile button component with multiple variants and sizes.

**Props**:
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}
```

**Variants**:
- `default` - Primary button style
- `destructive` - For dangerous actions
- `outline` - Outlined button
- `secondary` - Secondary button style
- `ghost` - Minimal button style
- `link` - Link-styled button

### Dialog

**Location**: `src/components/ui/dialog.tsx`

Modal dialog component built on Radix UI.

**Components**:
- `Dialog` - Root dialog component
- `DialogTrigger` - Trigger element
- `DialogContent` - Modal content container
- `DialogHeader` - Header section
- `DialogTitle` - Dialog title
- `DialogDescription` - Dialog description
- `DialogFooter` - Footer section

**Features**:
- Accessible by default
- Keyboard navigation
- Focus management
- Backdrop click to close
- ESC key to close

### Input

**Location**: `src/components/ui/input.tsx`

Styled input component with consistent design.

**Props**:
```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Standard HTML input props
}
```

**Features**:
- Consistent styling across the app
- Focus states
- Error states
- Disabled states

### Select

**Location**: `src/components/ui/select.tsx`

Dropdown select component built on Radix UI.

**Components**:
- `Select` - Root select component
- `SelectTrigger` - Trigger button
- `SelectContent` - Dropdown content
- `SelectItem` - Individual option
- `SelectValue` - Value display
- `SelectLabel` - Option group label

## Layout Components

### DashboardHeader

**Location**: `src/components/dashboard-header.tsx`

Main application header with navigation and actions.

**Props**:
```typescript
interface DashboardHeaderProps {
  onCreateTask: () => void;
  onFilter: () => void;
  onCreateSampleData: () => void;
  showSampleData: boolean;
  tasks: Task[];
  onImportTasks: (tasks: Task[]) => void;
}
```

**Features**:
- Application branding
- Create task button
- Theme toggle
- Import/export functionality
- Responsive design

### StatsCards

**Location**: `src/components/stats-cards.tsx`

Dashboard statistics display component.

**Props**:
```typescript
interface StatsCardsProps {
  totalTasks: number;
  inProgress: number;
  completed: number;
  overdue: number;
}
```

**Features**:
- Task statistics overview
- Color-coded cards
- Icon representations
- Responsive grid layout

### TaskFilters

**Location**: `src/components/task-filters.tsx`

Filtering and search interface component.

**Props**:
```typescript
interface TaskFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  priorityFilter: string;
  onPriorityFilterChange: (priority: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (category: string) => void;
  sortBy: 'priority' | 'dueDate' | 'status';
  onSortChange: (sort: 'priority' | 'dueDate' | 'status') => void;
  searchInputRef?: React.RefObject<HTMLInputElement>;
}
```

**Features**:
- Real-time search
- Multiple filter options
- Sort controls
- Clear filters functionality

## Dialog Components

### CreateTaskDialog

**Location**: `src/components/create-task-dialog.tsx`

Modal dialog for creating new tasks.

**Props**:
```typescript
interface CreateTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => void;
}
```

### EditTaskDialog

**Location**: `src/components/edit-task-dialog.tsx`

Modal dialog for editing existing tasks.

**Props**:
```typescript
interface EditTaskDialogProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => void;
}
```

### ConfirmationDialog

**Location**: `src/components/confirmation-dialog.tsx`

Generic confirmation dialog for destructive actions.

**Props**:
```typescript
interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  variant?: 'default' | 'destructive';
}
```

## Utility Components

### HydrationSafe

**Location**: `src/components/hydration-safe.tsx`

Wrapper component to prevent hydration mismatches.

**Props**:
```typescript
interface HydrationSafeProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}
```

**Usage**:
```tsx
<HydrationSafe fallback={<div>Loading...</div>}>
  <ComponentThatUsesClientSideFeatures />
</HydrationSafe>
```

### UndoRedoButtons

**Location**: `src/components/UndoRedoButtons.tsx`

Control buttons for undo/redo functionality.

**Props**: None (uses TaskContext)

**Features**:
- Visual feedback for available actions
- Keyboard shortcut indicators
- Disabled states
- Tooltip descriptions

### ThemeToggle

**Location**: `src/components/theme-toggle.tsx`

Theme switching component with system preference detection.

**Props**: None

**Features**:
- Light/dark mode toggle
- System preference detection
- Smooth transitions
- Icon indicators

### BulkActionsToolbar

**Location**: `src/components/bulk-actions-toolbar.tsx`

Toolbar for bulk operations on selected tasks.

**Props**:
```typescript
interface BulkActionsToolbarProps {
  selectedCount: number;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onBulkDelete: () => void;
  onBulkUpdateStatus: (status: Task['status']) => void;
}
```

**Features**:
- Selection count display
- Bulk action buttons
- Select all/clear all
- Status update options

## Component Patterns

### State Management
Most components follow these patterns:
- Use TypeScript for type safety
- Props interface definitions
- Controlled vs uncontrolled components
- Event handler props for parent communication

### Styling
- Tailwind CSS utility classes
- Responsive design with mobile-first approach
- Dark mode support with CSS variables
- Component variants using class-variance-authority

### Accessibility
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility

### Performance
- React.memo for expensive components
- useCallback for event handlers
- useMemo for computed values
- Lazy loading where appropriate

## Best Practices

1. **Props Interface**: Always define TypeScript interfaces for component props
2. **Event Handlers**: Use descriptive names (onTaskSelect vs onClick)
3. **Composition**: Prefer composition over inheritance
4. **Accessibility**: Include ARIA attributes and keyboard support
5. **Error Boundaries**: Wrap components that might throw errors
6. **Testing**: Write unit tests for complex components
7. **Documentation**: Include JSDoc comments for complex logic

## Usage Examples

### Basic Task Display
```tsx
import { TaskCard } from '@/components/task-card';
import { useTaskContext } from '@/contexts/TaskContext';

function TaskDisplayExample() {
  const { state, selectTask } = useTaskContext();
  
  return (
    <div className="grid gap-4">
      {state.tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          isSelected={state.selectedTaskIds.includes(task.id)}
          onSelect={(selected) => selectTask(task.id, selected)}
          onEdit={() => handleEdit(task)}
          onDelete={() => handleDelete(task.id)}
          onToggleStatus={() => handleToggleStatus(task.id)}
          onDuplicate={() => handleDuplicate(task)}
        />
      ))}
    </div>
  );
}
```

### Custom Dialog Implementation
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

function CustomDialog({ isOpen, onClose, children }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Custom Dialog</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
```
