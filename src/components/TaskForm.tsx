'use client';

import React, { useState, useEffect } from 'react';
import { TaskFormProps, Priority, Status, TaskFormData } from '@/types';
import { validateTaskForm } from '@/utils/taskUtils';
import toast from 'react-hot-toast';

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    dueDate: '',
    priority: Priority.MEDIUM,
    status: Status.PENDING,
  });

  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || '',
        dueDate: task.dueDate || '',
        priority: task.priority,
        status: task.status,
      });
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateTaskForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      toast.error(validation.errors[0]);
      return;
    }

    setErrors([]);
    onSubmit(formData);
    
    if (!task) {
      // Reset form for new task
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        priority: Priority.MEDIUM,
        status: Status.PENDING,
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
          {task ? '✏️ Edit Task' : '➕ Add New Task'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {task ? 'Update your task details below' : 'Fill in the details to create a new task'}
        </p>
      </div>

      {errors.length > 0 && (
        <div className="rounded-xl bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-4 border-2 border-red-200 dark:border-red-800 animate-fade-in-up">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-red-500 dark:text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-semibold text-red-800 dark:text-red-400">
                Please fix the following errors:
              </h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                <ul className="list-disc space-y-1 pl-5">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            📝 Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleInputChange}
            className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 px-4 py-3 backdrop-blur-sm transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Enter a descriptive task title..."
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            📄 Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
            className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 px-4 py-3 backdrop-blur-sm transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 resize-none"
            placeholder="Add more details about your task..."
          />
        </div>

        <div>
          <label htmlFor="dueDate" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            📅 Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleInputChange}
            className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 px-4 py-3 backdrop-blur-sm transition-all duration-300"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="priority" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              🏷️ Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 px-4 py-3 backdrop-blur-sm transition-all duration-300"
            >
              <option value={Priority.LOW}>🟢 Low Priority</option>
              <option value={Priority.MEDIUM}>🟡 Medium Priority</option>
              <option value={Priority.HIGH}>🔴 High Priority</option>
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              📊 Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 px-4 py-3 backdrop-blur-sm transition-all duration-300"
            >
              <option value={Status.PENDING}>⏳ Pending</option>
              <option value={Status.IN_PROGRESS}>🔄 In Progress</option>
              <option value={Status.COMPLETED}>✅ Completed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-6">
        <button
          type="submit"
          className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-6 py-3 text-sm font-semibold text-white shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          {task ? '✏️ Update Task' : '➕ Create Task'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-600/50 px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 shadow-sm focus:outline-none focus:ring-4 focus:ring-gray-500/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
        >
          ❌ Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
