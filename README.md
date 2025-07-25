# Task Management Dashboard

A modern, feature-rich task management application built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS**. This project demonstrates advanced React patterns, state management, and modern web development practices.

## 🚀 Features

### Core Features
- ✅ **Task CRUD Operations**: Create, read, update, and delete tasks
- ✅ **Task Status Management**: Todo, In Progress, Done
- ✅ **Priority System**: High, Medium, Low priority levels
- ✅ **Categories & Tags**: Organize tasks with custom categories and tags
- ✅ **Due Dates**: Set and track task deadlines
- ✅ **Time Estimation**: Estimate task completion time
- ✅ **Search & Filter**: Real-time search with multiple filter options
- ✅ **Sorting**: Sort by priority, due date, or status

### Intermediate Features
- ✅ **Bulk Operations**: Multi-select and bulk delete/update tasks
- ✅ **Task Duplication**: Quickly duplicate existing tasks
- ✅ **Data Persistence**: Auto-save to localStorage with hydration safety
- ✅ **Import/Export**: JSON data import and export functionality
- ✅ **Undo/Redo**: Full undo/redo functionality for all operations
- 🚧 **Drag & Drop**: Task reordering (planned)

### Advanced Features
- ✅ **Context API**: Centralized state management with TypeScript
- ✅ **Custom Hooks**: Reusable hooks for state, shortcuts, and themes
- ✅ **Keyboard Shortcuts**: Full keyboard navigation support
- ✅ **Responsive Design**: Mobile-first responsive layout
- ✅ **Dark/Light Theme**: Theme switching with system preference detection
- ✅ **Form Validation**: Zod schema validation with React Hook Form
- ✅ **Toast Notifications**: User feedback for all operations
- ✅ **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives
- **State Management**: React Context API with useReducer
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/task-management-dashboard.git
   cd task-management-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Creating Tasks
1. Click the **"New Task"** button or press `Ctrl/Cmd + N`
2. Fill in the task details (title, description, priority, etc.)
3. Click **"Create Task"** to save

### Managing Tasks
- **Edit**: Click the edit icon on any task card
- **Delete**: Select tasks and use bulk delete or individual delete
- **Duplicate**: Select a task and press `Ctrl/Cmd + D`
- **Status**: Toggle task status between Todo → In Progress → Done

### Keyboard Shortcuts
- `Ctrl/Cmd + N` - Create new task
- `Ctrl/Cmd + A` - Select all tasks
- `Ctrl/Cmd + D` - Duplicate selected task
- `Ctrl/Cmd + Z` - Undo last action
- `Ctrl/Cmd + Y` - Redo last undone action
- `Ctrl/Cmd + F` - Focus search box
- `Delete` - Delete selected tasks
- `Escape` - Clear selections and close dialogs

### Data Management
- **Export**: Click the export button to download tasks as JSON
- **Import**: Click import and select a JSON file to restore tasks
- **Auto-save**: All changes are automatically saved to localStorage

## 🏗️ Project Structure

```
src/
├── app/                      # Next.js app router
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main dashboard page
├── components/              # React components
│   ├── ui/                  # Reusable UI components
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── task-card.tsx        # Individual task display
│   ├── task-list.tsx        # Task list container
│   ├── dashboard-header.tsx  # App header
│   └── ...
├── contexts/                # React contexts
│   └── TaskContext.tsx      # Task state management
├── hooks/                   # Custom React hooks
│   ├── useUndoRedo.ts       # Undo/redo functionality
│   ├── useKeyboardShortcuts.ts
│   └── ...
├── lib/                     # Utility functions
│   └── utils.ts             # Helper utilities
├── reducers/                # State reducers
│   └── taskReducer.ts       # Task state reducer
└── types/                   # TypeScript type definitions
    └── task.ts              # Task-related types
```

## 🎨 Design System

The application uses a consistent design system built with Tailwind CSS:

- **Colors**: Semantic color palette with dark/light mode support
- **Typography**: Responsive typography scale
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Components**: Reusable components with consistent styling
- **Animations**: Smooth transitions and micro-interactions

## 🧪 Testing

The application includes:
- **Type Safety**: Full TypeScript coverage
- **Form Validation**: Zod schema validation
- **Error Handling**: Comprehensive error boundaries
- **Hydration Safety**: SSR-safe implementation

## 🚀 Performance

- **Code Splitting**: Automatic code splitting with Next.js
- **Lazy Loading**: Components loaded on demand
- **Optimized Images**: Next.js image optimization
- **Bundle Analysis**: Built-in bundle analyzer

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) for accessible UI primitives
- [Lucide](https://lucide.dev/) for beautiful icons

## 📈 Roadmap

- [ ] Drag and drop task reordering
- [ ] Task categories management
- [ ] Advanced filtering options
- [ ] Task templates
- [ ] Collaboration features
- [ ] PWA support
- [ ] Real-time synchronization

---

Built with ❤️ using Next.js and TypeScript
