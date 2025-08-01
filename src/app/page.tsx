'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { 
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
  clearCompleted
} from '@/slices/taskSlice';
import { Task, TaskFormData, Priority, Status, SortType } from '@/types';
import { filterTasks, sortTasks } from '@/utils/taskUtils';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';
import Modal from '@/components/Modal';
import ConfirmDialog from '@/components/ConfirmDialog';
import toast from 'react-hot-toast';

export default function Home() {
  const dispatch = useDispatch();
  const { 
    tasks, 
    searchQuery, 
    statusFilter, 
    priorityFilter, 
    sortBy, 
    sortOrder, 
    isDarkMode 
  } = useSelector((state: RootState) => state.tasks);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
  const [groupByStatus, setGroupByStatus] = useState(false);

  // Apply dark mode to document and initialize from localStorage
  useEffect(() => {
    // Initialize dark mode from localStorage or system preference
    dispatch(initializeDarkMode());
  }, [dispatch]);

  // Update document class when dark mode changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [isDarkMode]);

  // Filter and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
    const filtered = filterTasks(tasks, searchQuery, statusFilter, priorityFilter);
    return sortTasks(filtered, sortBy, sortOrder);
  }, [tasks, searchQuery, statusFilter, priorityFilter, sortBy, sortOrder]);

  // Calculate task statistics
  const taskStats = useMemo(() => {
    return {
      total: tasks.length,
      pending: tasks.filter(task => task.status === 'pending').length,
      'in-progress': tasks.filter(task => task.status === 'in-progress' as Status).length,
      completed: tasks.filter(task => task.status === 'completed').length,
    };
  }, [tasks]);

  // Handle task operations
  const handleAddTask = (taskData: TaskFormData) => {
    dispatch(addTask(taskData));
    setIsAddModalOpen(false);
    toast.success('Task added successfully!');
  };

  const handleUpdateTask = (taskData: TaskFormData) => {
    if (editingTask) {
      dispatch(editTask({ id: editingTask.id, data: taskData }));
      setIsEditModalOpen(false);
      setEditingTask(null);
      toast.success('Task updated successfully!');
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    setDeletingTaskId(taskId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteTask = () => {
    if (deletingTaskId) {
      dispatch(deleteTask(deletingTaskId));
      setIsDeleteDialogOpen(false);
      setDeletingTaskId(null);
      toast.success('Task deleted successfully!');
    }
  };

  const handleMarkAllCompleted = () => {
    dispatch(markAllCompleted());
    toast.success('All tasks marked as completed!');
  };

  const handleClearCompleted = () => {
    dispatch(clearCompleted());
    toast.success('Completed tasks cleared!');
  };

  const handleResetFilters = () => {
    dispatch(setSearchQuery(''));
    dispatch(setStatusFilter('all'));
    dispatch(setPriorityFilter('all'));
    dispatch(setSortBy('createdAt'));
    dispatch(setSortOrder('desc'));
    toast.success('Filters reset!');
  };

  return (
    <div className="min-h-screen transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300">
        {/* Redesigned Header */}
        <div className="mb-8 p-8 app-header shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Todo List
              </h1>
              <p className="text-blue-100 text-lg font-medium">
                Organize your tasks with style and efficiency
              </p>
            </div>
            <div className="flex items-center space-x-4 animate-slide-in-right">
              <button
                onClick={() => dispatch(toggleDarkMode())}
                className="p-3 rounded-xl bg-white/20 hover:bg-white/30 dark:bg-gray-700/50 dark:hover:bg-gray-600/50 text-white dark:text-gray-300 transition-all duration-300 group shadow-lg backdrop-blur-sm"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <svg className="h-6 w-6 transform group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6 transform group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="btn-primary px-6 py-3 rounded-xl font-semibold shadow-lg flex items-center space-x-2"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Task</span>
              </button>
            </div>
          </div>
        </div>

        {/* Redesigned Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="stats-card p-6 animate-fade-in-up border-l-4 border-l-blue-500" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-primary">{taskStats.total}</div>
                <div className="text-sm font-medium text-secondary mt-1">Total Tasks</div>
              </div>
              <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          <div className="stats-card p-6 animate-fade-in-up border-l-4 border-l-amber-500" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-primary">{taskStats.pending}</div>
                <div className="text-sm font-medium text-secondary mt-1">Pending</div>
              </div>
              <div className="p-3 bg-amber-500 rounded-xl shadow-lg">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="stats-card p-6 animate-fade-in-up border-l-4 border-l-orange-500" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-primary">{taskStats['in-progress']}</div>
                <div className="text-sm font-medium text-secondary mt-1">In Progress</div>
              </div>
              <div className="p-3 bg-orange-500 rounded-xl shadow-lg">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="stats-card p-6 animate-fade-in-up border-l-4 border-l-emerald-500" style={{animationDelay: '0.4s'}}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-primary">{taskStats.completed}</div>
                <div className="text-sm font-medium text-secondary mt-1">Completed</div>
              </div>
              <div className="p-3 bg-emerald-500 rounded-xl shadow-lg">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Redesigned Search and Filters */}
        <div className="search-section p-6 shadow-sm mb-8 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                    className="app-input w-full pl-10 pr-4 py-3"
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => dispatch(setStatusFilter(e.target.value as Status | 'all'))}
                  className="app-input px-4 py-3"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>

                <select
                  value={priorityFilter}
                  onChange={(e) => dispatch(setPriorityFilter(e.target.value as Priority | 'all'))}
                  className="app-input px-4 py-3"
                >
                  <option value="all">All Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-secondary">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => dispatch(setSortBy(e.target.value as SortType))}
                  className="app-input px-3 py-2 text-sm"
                >
                  <option value="createdAt">Created Date</option>
                  <option value="dueDate">Due Date</option>
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
                
                <button
                  onClick={() => dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'))}
                  className="p-2 text-secondary hover:text-blue-600 transition-colors rounded-lg hover:bg-surface"
                  aria-label={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
                >
                  {sortOrder === 'asc' ? (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="groupByStatus"
                    checked={groupByStatus}
                    onChange={(e) => setGroupByStatus(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <label htmlFor="groupByStatus" className="text-sm font-medium text-secondary cursor-pointer">
                    Group by Status
                  </label>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleMarkAllCompleted}
                    className="btn-secondary px-4 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800"
                  >
                    ✓ Mark All Complete
                  </button>
                  
                  <button
                    onClick={handleClearCompleted}
                    className="btn-secondary px-4 py-2 text-sm font-medium text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 border border-red-200 dark:border-red-800"
                  >
                    🗑️ Clear Completed
                  </button>
                  
                  <button
                    onClick={handleResetFilters}
                    className="btn-secondary px-4 py-2 text-sm font-medium"
                  >
                    🔄 Reset Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Task List */}
        <TaskList
          tasks={filteredAndSortedTasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          groupByStatus={groupByStatus}
        />

        {/* Modals */}
        <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
          <TaskForm
            onSubmit={handleAddTask}
            onCancel={() => setIsAddModalOpen(false)}
          />
        </Modal>

        <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
          <TaskForm
            task={editingTask || undefined}
            onSubmit={handleUpdateTask}
            onCancel={() => {
              setIsEditModalOpen(false);
              setEditingTask(null);
            }}
          />
        </Modal>

        <ConfirmDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => {
            setIsDeleteDialogOpen(false);
            setDeletingTaskId(null);
          }}
          onConfirm={confirmDeleteTask}
          title="Delete Task"
          message="Are you sure you want to delete this task? This action cannot be undone."
        />
      </div>
    </div>
  );
}
