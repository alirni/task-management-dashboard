export const TASK_PRIORITIES = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
} as const;

export const TASK_STATUSES = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  done: 'Done',
} as const;

export const PRIORITY_COLORS = {
  low: 'bg-green-100 text-green-800 border-green-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-red-100 text-red-800 border-red-200',
} as const;

export const STATUS_COLORS = {
  todo: 'bg-gray-100 text-gray-800 border-gray-200',
  'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
  done: 'bg-green-100 text-green-800 border-green-200',
} as const;

export const DEFAULT_CATEGORIES = [
  'Work',
  'Personal',
  'Shopping',
  'Health',
  'Learning',
  'Other',
] as const;
