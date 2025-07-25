# Development Guide

This guide provides information for developers working on the Task Management Dashboard project.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Architecture Patterns](#architecture-patterns)
- [Testing Strategy](#testing-strategy)
- [Performance Guidelines](#performance-guidelines)
- [Deployment](#deployment)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm
- Git
- VS Code (recommended)

### Development Setup

1. **Clone and Install**:
   ```bash
   git clone <repository-url>
   cd task-management-dashboard
   npm install
   ```

2. **Environment Setup**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Recommended VS Code Extensions
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- ESLint
- Prettier
- Auto Rename Tag
- Bracket Pair Colorizer

## Project Structure

### Directory Organization
```
src/
├── app/                     # Next.js App Router
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page
├── components/             # React components
│   ├── ui/                 # Reusable UI components
│   ├── task-card.tsx       # Feature-specific components
│   └── ...
├── contexts/               # React contexts
├── hooks/                  # Custom hooks
├── lib/                    # Utility functions
├── reducers/               # State reducers
├── types/                  # TypeScript definitions
└── styles/                 # Additional styles
```

### File Naming Conventions
- **Components**: `kebab-case.tsx` (e.g., `task-card.tsx`)
- **Hooks**: `camelCase.ts` with `use` prefix (e.g., `useTaskManager.ts`)
- **Types**: `camelCase.ts` (e.g., `taskTypes.ts`)
- **Utilities**: `camelCase.ts` (e.g., `dateUtils.ts`)
- **Constants**: `SCREAMING_SNAKE_CASE.ts` (e.g., `API_ENDPOINTS.ts`)

## Development Workflow

### Git Workflow

1. **Feature Branch**:
   ```bash
   git checkout -b feature/task-management
   ```

2. **Commit Convention**:
   ```bash
   git commit -m "feat: add task creation functionality"
   git commit -m "fix: resolve task deletion bug"
   git commit -m "docs: update API documentation"
   ```

3. **Pull Request**:
   - Create descriptive PR title
   - Include screenshots for UI changes
   - Link to related issues
   - Request appropriate reviewers

### Commit Message Convention
Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### Branch Naming
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

## Coding Standards

### TypeScript Guidelines

1. **Strict Type Safety**:
   ```typescript
   // Good
   interface TaskProps {
     task: Task;
     onUpdate: (task: Task) => void;
   }
   
   // Avoid
   function updateTask(task: any) { ... }
   ```

2. **Prefer Interfaces over Types** for object shapes:
   ```typescript
   // Good
   interface UserPreferences {
     theme: 'light' | 'dark';
     notifications: boolean;
   }
   
   // Use types for unions and primitives
   type Status = 'pending' | 'complete' | 'error';
   ```

3. **Use Generic Types** when appropriate:
   ```typescript
   function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void]
   ```

### React Best Practices

1. **Component Structure**:
   ```typescript
   // Component definition
   interface ComponentProps {
     // Props interface first
   }
   
   export function Component({ prop1, prop2 }: ComponentProps) {
     // Hooks at the top
     const [state, setState] = useState();
     const contextValue = useContext(SomeContext);
     
     // Event handlers
     const handleClick = useCallback(() => {
       // Handler logic
     }, [dependencies]);
     
     // Render
     return (
       // JSX
     );
   }
   ```

2. **Props Destructuring**:
   ```typescript
   // Good
   function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
     return <div>{task.title}</div>;
   }
   
   // Avoid
   function TaskCard(props: TaskCardProps) {
     return <div>{props.task.title}</div>;
   }
   ```

3. **Event Handler Naming**:
   ```typescript
   // Good
   <Button onClick={handleSubmit} />
   <Input onChange={handleInputChange} />
   
   // Avoid
   <Button onClick={submit} />
   <Input onChange={change} />
   ```

### CSS/Styling Guidelines

1. **Tailwind CSS Usage**:
   ```typescript
   // Good - Meaningful class grouping
   <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
   
   // Use cn() for conditional classes
   <div className={cn(
     "base-classes",
     isActive && "active-classes",
     variant === 'primary' && "primary-classes"
   )} />
   ```

2. **Responsive Design**:
   ```typescript
   // Mobile-first approach
   <div className="text-sm md:text-base lg:text-lg" />
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" />
   ```

3. **Dark Mode Support**:
   ```typescript
   <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
   ```

## Architecture Patterns

### State Management

1. **Context API Structure**:
   ```typescript
   // contexts/TaskContext.tsx
   interface TaskContextType {
     state: TaskState;
     actions: TaskActions;
   }
   
   export const TaskProvider = ({ children }) => {
     const [state, dispatch] = useReducer(taskReducer, initialState);
     
     const contextValue = useMemo(() => ({
       state,
       actions: bindActionCreators(taskActions, dispatch)
     }), [state]);
     
     return (
       <TaskContext.Provider value={contextValue}>
         {children}
       </TaskContext.Provider>
     );
   };
   ```

2. **Custom Hooks Pattern**:
   ```typescript
   // hooks/useTaskManager.ts
   export function useTaskManager() {
     const context = useContext(TaskContext);
     
     if (!context) {
       throw new Error('useTaskManager must be used within TaskProvider');
     }
     
     return context;
   }
   ```

### Component Composition

1. **Compound Components**:
   ```typescript
   // Good - Flexible composition
   <Dialog>
     <DialogTrigger>Open</DialogTrigger>
     <DialogContent>
       <DialogHeader>
         <DialogTitle>Title</DialogTitle>
       </DialogHeader>
       <DialogBody>Content</DialogBody>
     </DialogContent>
   </Dialog>
   ```

2. **Render Props Pattern**:
   ```typescript
   <DataProvider>
     {({ data, loading, error }) => (
       loading ? <Spinner /> : <DataDisplay data={data} />
     )}
   </DataProvider>
   ```

### Error Handling

1. **Error Boundaries**:
   ```typescript
   class TaskErrorBoundary extends React.Component {
     constructor(props) {
       super(props);
       this.state = { hasError: false };
     }
     
     static getDerivedStateFromError(error) {
       return { hasError: true };
     }
     
     componentDidCatch(error, errorInfo) {
       console.error('Task error:', error, errorInfo);
     }
     
     render() {
       if (this.state.hasError) {
         return <ErrorFallback />;
       }
       return this.props.children;
     }
   }
   ```

2. **Async Error Handling**:
   ```typescript
   const handleAsyncAction = async () => {
     try {
       setLoading(true);
       setError(null);
       await performAction();
     } catch (error) {
       setError(error.message);
       toast.error('Action failed');
     } finally {
       setLoading(false);
     }
   };
   ```

## Testing Strategy

### Unit Testing
```typescript
// __tests__/hooks/useTaskManager.test.ts
import { renderHook, act } from '@testing-library/react';
import { useTaskManager } from '@/hooks/useTaskManager';

describe('useTaskManager', () => {
  test('should add task correctly', () => {
    const { result } = renderHook(() => useTaskManager());
    
    act(() => {
      result.current.addTask({
        title: 'Test Task',
        description: 'Test Description'
      });
    });
    
    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].title).toBe('Test Task');
  });
});
```

### Component Testing
```typescript
// __tests__/components/TaskCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskCard } from '@/components/task-card';

describe('TaskCard', () => {
  const mockTask = {
    id: '1',
    title: 'Test Task',
    status: 'todo',
    priority: 'high'
  };
  
  test('renders task information', () => {
    render(<TaskCard task={mockTask} />);
    
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('High Priority')).toBeInTheDocument();
  });
  
  test('calls onEdit when edit button is clicked', () => {
    const onEdit = jest.fn();
    render(<TaskCard task={mockTask} onEdit={onEdit} />);
    
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    expect(onEdit).toHaveBeenCalledWith(mockTask);
  });
});
```

### Integration Testing
```typescript
// __tests__/integration/taskManagement.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TaskProvider } from '@/contexts/TaskContext';
import { TaskDashboard } from '@/components/task-dashboard';

describe('Task Management Integration', () => {
  test('creates and displays new task', async () => {
    render(
      <TaskProvider>
        <TaskDashboard />
      </TaskProvider>
    );
    
    // Open create task dialog
    fireEvent.click(screen.getByRole('button', { name: /new task/i }));
    
    // Fill form
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'New Task' }
    });
    
    // Submit
    fireEvent.click(screen.getByRole('button', { name: /create/i }));
    
    // Verify task appears
    await waitFor(() => {
      expect(screen.getByText('New Task')).toBeInTheDocument();
    });
  });
});
```

## Performance Guidelines

### React Performance

1. **Memoization**:
   ```typescript
   // Expensive calculations
   const expensiveValue = useMemo(() => {
     return heavyCalculation(data);
   }, [data]);
   
   // Event handlers
   const handleClick = useCallback((id: string) => {
     onTaskSelect(id);
   }, [onTaskSelect]);
   
   // Components
   export const TaskCard = React.memo(({ task, onEdit }) => {
     // Component logic
   });
   ```

2. **State Structure**:
   ```typescript
   // Good - Flat structure
   interface TaskState {
     tasks: Task[];
     selectedIds: string[];
     filters: FilterState;
   }
   
   // Avoid - Nested updates
   interface BadTaskState {
     ui: {
       tasks: {
         items: Task[];
         selection: string[];
       }
     }
   }
   ```

3. **List Rendering**:
   ```typescript
   // Good - Stable keys
   {tasks.map(task => (
     <TaskCard key={task.id} task={task} />
   ))}
   
   // Avoid - Index as key
   {tasks.map((task, index) => (
     <TaskCard key={index} task={task} />
   ))}
   ```

### Bundle Optimization

1. **Code Splitting**:
   ```typescript
   // Lazy load heavy components
   const HeavyComponent = lazy(() => import('./HeavyComponent'));
   
   // Route-based splitting
   const AdminPanel = lazy(() => import('./AdminPanel'));
   ```

2. **Import Optimization**:
   ```typescript
   // Good - Specific imports
   import { Button } from '@/components/ui/button';
   
   // Avoid - Barrel imports for large libraries
   import { Button, Dialog, Input } from '@/components/ui';
   ```

## Deployment

### Build Process
```bash
# Production build
npm run build

# Start production server
npm start

# Analyze bundle
npm run analyze
```

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

### Deployment Checklist
- [ ] All tests passing
- [ ] TypeScript compilation successful
- [ ] Bundle size within limits
- [ ] Performance metrics acceptable
- [ ] Accessibility standards met
- [ ] SEO meta tags configured
- [ ] Error monitoring setup
- [ ] Analytics configured

### Platform-Specific Deployment

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Netlify
```bash
# Build command
npm run build

# Publish directory
out/
```

#### Docker
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## Troubleshooting

### Common Issues

1. **Hydration Mismatches**:
   ```typescript
   // Use HydrationSafe component
   <HydrationSafe fallback={<Skeleton />}>
     <ClientOnlyComponent />
   </HydrationSafe>
   ```

2. **Memory Leaks**:
   ```typescript
   useEffect(() => {
     const subscription = subscribe();
     
     return () => {
       subscription.unsubscribe();
     };
   }, []);
   ```

3. **State Updates After Unmount**:
   ```typescript
   useEffect(() => {
     let mounted = true;
     
     fetchData().then(data => {
       if (mounted) {
         setData(data);
       }
     });
     
     return () => {
       mounted = false;
     };
   }, []);
   ```

### Debugging Tools

1. **React Developer Tools**
2. **Redux DevTools** (for complex state)
3. **Next.js Bundle Analyzer**
4. **Lighthouse** for performance audits
5. **axe DevTools** for accessibility

## Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Style Guides
- [Airbnb React Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript)
- [React Best Practices](https://react.dev/learn/thinking-in-react)

### Tools
- [React Hook Form](https://react-hook-form.com)
- [Zod Validation](https://zod.dev)
- [Radix UI](https://www.radix-ui.com)
- [Lucide Icons](https://lucide.dev)
