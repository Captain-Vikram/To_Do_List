import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskState, Priority, Status, TaskFormData, SortType } from '@/types';

const initialState: TaskState = {
  tasks: [],
  searchQuery: '',
  statusFilter: 'all',
  priorityFilter: 'all',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  isDarkMode: false,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskFormData>) => {
      const newTask: Task = {
        id: Date.now().toString(),
        ...action.payload,
        createdAt: new Date().toISOString(),
      };
      state.tasks.push(newTask);
    },

    editTask: (state, action: PayloadAction<{ id: string; data: TaskFormData }>) => {
      const { id, data } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = {
          ...state.tasks[taskIndex],
          ...data,
        };
      }
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    setStatusFilter: (state, action: PayloadAction<Status | 'all'>) => {
      state.statusFilter = action.payload;
    },

    setPriorityFilter: (state, action: PayloadAction<Priority | 'all'>) => {
      state.priorityFilter = action.payload;
    },

    setSortBy: (state, action: PayloadAction<SortType>) => {
      state.sortBy = action.payload;
    },

    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },

    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      // Persist theme preference
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.isDarkMode ? 'dark' : 'light');
      }
    },

    initializeDarkMode: (state) => {
      if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        state.isDarkMode = savedTheme === 'dark' || (!savedTheme && prefersDark);
      }
    },

    // Bulk actions
    markAllCompleted: (state) => {
      state.tasks.forEach(task => {
        if (task.status !== Status.COMPLETED) {
          task.status = Status.COMPLETED;
        }
      });
    },

    clearCompleted: (state) => {
      state.tasks = state.tasks.filter(task => task.status !== Status.COMPLETED);
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  setSearchQuery,
  setStatusFilter,
  setPriorityFilter,
  setSortBy,
  setSortOrder,
  toggleDarkMode,
  initializeDarkMode,
  markAllCompleted,
  clearCompleted,
} = taskSlice.actions;

export default taskSlice.reducer;
