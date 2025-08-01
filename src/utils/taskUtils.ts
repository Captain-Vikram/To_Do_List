import { Task, Priority, Status, SortType } from '@/types';
import { format, parseISO, isValid } from 'date-fns';

export const filterTasks = (
  tasks: Task[],
  searchQuery: string,
  statusFilter: Status | 'all',
  priorityFilter: Priority | 'all'
): Task[] => {
  return tasks.filter(task => {
    // Search filter
    const matchesSearch = !searchQuery || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));

    // Status filter
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;

    // Priority filter
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });
};

export const sortTasks = (
  tasks: Task[],
  sortBy: SortType,
  sortOrder: 'asc' | 'desc'
): Task[] => {
  const sortedTasks = [...tasks].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'dueDate':
        const aDate = a.dueDate ? parseISO(a.dueDate) : null;
        const bDate = b.dueDate ? parseISO(b.dueDate) : null;
        
        if (!aDate && !bDate) comparison = 0;
        else if (!aDate) comparison = 1;
        else if (!bDate) comparison = -1;
        else comparison = aDate.getTime() - bDate.getTime();
        break;

      case 'priority':
        const priorityOrder = { [Priority.HIGH]: 3, [Priority.MEDIUM]: 2, [Priority.LOW]: 1 };
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
        break;

      case 'createdAt':
        const aCreated = parseISO(a.createdAt);
        const bCreated = parseISO(b.createdAt);
        comparison = aCreated.getTime() - bCreated.getTime();
        break;

      default:
        comparison = 0;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return sortedTasks;
};

export const formatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return isValid(date) ? format(date, 'MMM dd, yyyy') : 'Invalid Date';
  } catch {
    return 'Invalid Date';
  }
};

export const isOverdue = (dueDate?: string): boolean => {
  if (!dueDate) return false;
  try {
    const date = parseISO(dueDate);
    return isValid(date) && date < new Date();
  } catch {
    return false;
  }
};

export const getPriorityColor = (priority: Priority): string => {
  switch (priority) {
    case Priority.HIGH:
      return 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800';
    case Priority.MEDIUM:
      return 'text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-900/20 dark:border-orange-800';
    case Priority.LOW:
      return 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900/20 dark:border-gray-800';
  }
};

export const getStatusColor = (status: Status): string => {
  switch (status) {
    case Status.COMPLETED:
      return 'text-green-700 bg-green-100 border-green-300 dark:text-green-400 dark:bg-green-900/30 dark:border-green-700';
    case Status.IN_PROGRESS:
      return 'text-blue-700 bg-blue-100 border-blue-300 dark:text-blue-400 dark:bg-blue-900/30 dark:border-blue-700';
    case Status.PENDING:
      return 'text-yellow-700 bg-yellow-100 border-yellow-300 dark:text-yellow-400 dark:bg-yellow-900/30 dark:border-yellow-700';
    default:
      return 'text-gray-700 bg-gray-100 border-gray-300 dark:text-gray-400 dark:bg-gray-900/30 dark:border-gray-700';
  }
};

export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export const validateTaskForm = (data: Partial<Task>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.title || data.title.trim().length === 0) {
    errors.push('Title is required');
  }

  if (data.title && data.title.length > 100) {
    errors.push('Title must be less than 100 characters');
  }

  if (data.description && data.description.length > 500) {
    errors.push('Description must be less than 500 characters');
  }

  if (data.dueDate) {
    try {
      const date = parseISO(data.dueDate);
      if (!isValid(date)) {
        errors.push('Invalid due date format');
      }
    } catch {
      errors.push('Invalid due date format');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
