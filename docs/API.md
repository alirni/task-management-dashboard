# API Documentation

This document provides detailed information about the APIs, hooks, contexts, and utilities in the Task Management Dashboard application.

## Table of Contents

- [Contexts](#contexts)
- [Custom Hooks](#custom-hooks)
- [Types & Interfaces](#types--interfaces)
- [Utilities](#utilities)
- [Reducers](#reducers)

## Contexts

### TaskContext

**Location**: `src/contexts/TaskContext.tsx`

Central state management for the entire task management system.

#### Interface
```typescript
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
  
  // UI state operations
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}
```

#### State Structure
```typescript
interface TaskState {
  tasks: Task[];
  selectedTaskIds: string[];
  isLoading: boolean;
  error: string | null;
  lastAction: string | null;
}
```

#### Usage
```typescript
import { useTaskContext } from '@/contexts/TaskContext';

function MyComponent() {
  const {
    state: { tasks, selectedTaskIds, isLoading },
    addTask,
    updateTask,
    deleteTask
  } = useTaskContext();
  
  // Use the context methods...
}
```

#### Features
- **Centralized State**: All task-related state in one place
- **Bulk Operations**: Efficient handling of multiple tasks
- **Auto-persistence**: Automatic localStorage synchronization
- **Hydration Safety**: SSR-safe implementation
- **Type Safety**: Full TypeScript support

## Custom Hooks

### useKeyboardShortcuts

**Location**: `src/hooks/useKeyboardShortcuts.ts`

Hook for managing keyboard shortcuts with modifier key support.

#### Interface
```typescript
interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  action: () => void;
  description: string;
}

interface UseKeyboardShortcutsProps {
  shortcuts: KeyboardShortcut[];
  enabled?: boolean;
}

function useKeyboardShortcuts(props: UseKeyboardShortcutsProps): void
```

#### Usage
```typescript
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

function MyComponent() {
  const shortcuts = [
    {
      key: 'n',
      ctrlKey: true,
      action: () => createNewItem(),
      description: 'Create new item'
    },
    {
      key: 'f',
      ctrlKey: true,
      action: () => focusSearch(),
      description: 'Focus search input'
    }
  ];
  
  useKeyboardShortcuts({ shortcuts });
  
  // Component renders...
}
```

#### Features
- **Modifier Key Support**: Ctrl, Meta, Shift, Alt combinations
- **Context Awareness**: Ignores shortcuts when typing in inputs
- **Cross-platform**: Handles Cmd/Ctrl differences automatically
- **Flexible Configuration**: Easy to add/remove shortcuts

### useTheme

**Location**: `src/hooks/useTheme.ts`

Hook for managing application theme with system preference detection.

#### Interface
```typescript
type Theme = 'light' | 'dark' | 'system';

interface UseThemeReturn {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

function useTheme(): UseThemeReturn
```

#### Usage
```typescript
import { useTheme } from '@/hooks/useTheme';

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current: {resolvedTheme}
    </button>
  );
}
```

#### Features
- **System Preference**: Automatically detects system theme
- **Persistence**: Saves preference to localStorage
- **SSR Safe**: Handles hydration correctly
- **Media Query**: Listens to system theme changes

### useLocalStorage

**Location**: `src/hooks/useLocalStorage.ts`

Hook for managing localStorage with SSR safety and JSON serialization.

#### Interface
```typescript
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void]
```

#### Usage
```typescript
import { useLocalStorage } from '@/hooks/useLocalStorage';

function MyComponent() {
  const [count, setCount] = useLocalStorage('count', 0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </div>
  );
}
```

#### Features
- **Type Safety**: Generic type support
- **SSR Safe**: No hydration mismatches
- **JSON Serialization**: Automatic serialization/deserialization
- **Error Handling**: Graceful fallback on localStorage errors

## Types & Interfaces

### Task Types

**Location**: `src/types/task.ts`

#### Core Task Interface
```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  category: string;
  tags: string[];
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  estimatedTime?: number; // in minutes
}
```

#### Form Data Interface
```typescript
interface TaskFormData {
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  category: string;
  tags: string[];
  dueDate: Date;
  estimatedTime?: number;
}
```

#### Task Action Types
```typescript
type TaskAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: { id: string; updates: Partial<Task> } }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'TOGGLE_TASK_STATUS'; payload: string }
  | { type: 'DUPLICATE_TASK'; payload: Task }
  | { type: 'BULK_DELETE'; payload: string[] }
  | { type: 'BULK_UPDATE_STATUS'; payload: { ids: string[]; status: Task['status'] } }
  | { type: 'SELECT_TASK'; payload: { id: string; selected: boolean } }
  | { type: 'SELECT_ALL_TASKS'; payload: boolean }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'IMPORT_TASKS'; payload: TaskFormData[] }
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };
```

### UI Component Types

#### Button Variants
```typescript
type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';
```

#### Dialog Props
```typescript
interface BaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ConfirmationDialogProps extends BaseDialogProps {
  title: string;
  description: string;
  confirmText?: string;
  variant?: 'default' | 'destructive';
  onConfirm: () => void;
}
```

## Utilities

### Utils Library

**Location**: `src/lib/utils.ts`

#### cn Function
Utility for conditionally joining classNames.

```typescript
function cn(...inputs: ClassValue[]): string
```

**Usage**:
```typescript
import { cn } from '@/lib/utils';

const className = cn(
  'base-class',
  condition && 'conditional-class',
  { 'object-class': someCondition },
  'another-class'
);
```

#### Task Utilities
```typescript
// Create task from form data
function createTaskFromFormData(data: TaskFormData): Task

// Check if task is overdue
function isTaskOverdue(task: Task): boolean

// Get task priority color
function getTaskPriorityColor(priority: Task['priority']): string

// Get task status color
function getTaskStatusColor(status: Task['status']): string

// Format task due date
function formatTaskDueDate(date: Date): string
```

### Validation Schemas

**Location**: `src/lib/schemas.ts`

Zod schemas for form validation.

#### Task Schema
```typescript
const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  description: z.string().max(500, 'Description too long'),
  status: z.enum(['todo', 'in-progress', 'done']),
  priority: z.enum(['low', 'medium', 'high']),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()),
  dueDate: z.date(),
  estimatedTime: z.number().min(1, 'Estimated time must be at least 1 minute')
});
```

## Reducers

### taskReducer

**Location**: `src/reducers/taskReducer.ts`

Pure function for managing task state transitions.

#### Interface
```typescript
function taskReducer(state: TaskState, action: TaskAction): TaskState
```

#### Supported Actions
- **ADD_TASK**: Adds a new task to the state
- **UPDATE_TASK**: Updates an existing task
- **DELETE_TASK**: Removes a task by ID
- **TOGGLE_TASK_STATUS**: Cycles through task status
- **DUPLICATE_TASK**: Creates a copy of an existing task
- **BULK_DELETE**: Removes multiple tasks
- **BULK_UPDATE_STATUS**: Updates status for multiple tasks
- **SELECT_TASK**: Toggles task selection
- **SELECT_ALL_TASKS**: Selects/deselects all tasks
- **CLEAR_SELECTION**: Clears all selections
- **IMPORT_TASKS**: Replaces tasks with imported data
- **SET_TASKS**: Sets the task list
- **SET_LOADING**: Updates loading state
- **SET_ERROR**: Updates error state

#### Features
- **Immutable Updates**: Never mutates existing state
- **Type Safety**: Full TypeScript support
- **Predictable**: Pure function with no side effects
- **Testable**: Easy to unit test

#### Usage
```typescript
import { taskReducer } from '@/reducers/taskReducer';

const newState = taskReducer(currentState, {
  type: 'ADD_TASK',
  payload: newTask
});
```

## Performance Considerations

### Optimization Strategies

1. **Memoization**: Use React.memo for expensive components
2. **Callback Optimization**: Use useCallback for event handlers
3. **State Structure**: Keep state flat and normalized
4. **Batch Updates**: Group related state updates
5. **Virtual Scrolling**: For large task lists
6. **Code Splitting**: Lazy load heavy components

### Memory Management

1. **Event Cleanup**: All event listeners are properly cleaned up
2. **Reference Stability**: Stable references for props to prevent re-renders
3. **State Optimization**: Efficient state updates to minimize re-renders

## Error Handling

### Error Boundaries
Wrap components that might throw errors:

```typescript
<ErrorBoundary fallback={<ErrorFallback />}>
  <TaskDashboard />
</ErrorBoundary>
```

### Validation Errors
Form validation errors are handled gracefully:

```typescript
try {
  const validData = taskSchema.parse(formData);
  // Process valid data
} catch (error) {
  // Handle validation errors
  if (error instanceof ZodError) {
    setFormErrors(error.flatten());
  }
}
```

### Async Error Handling
```typescript
const handleAsyncOperation = async () => {
  try {
    setLoading(true);
    setError(null);
    await someAsyncOperation();
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

## Testing Guidelines

### Unit Testing
- Test individual functions and hooks
- Mock external dependencies
- Test error conditions
- Verify type safety

### Integration Testing
- Test component interactions
- Test context providers
- Test form submissions
- Test keyboard shortcuts
