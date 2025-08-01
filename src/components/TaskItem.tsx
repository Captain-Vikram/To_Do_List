'use client';

import React from 'react';
import { TaskItemProps, Status } from '@/types';
import { formatDate, isOverdue, getPriorityColor, getStatusColor } from '@/utils/taskUtils';

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  const overdue = isOverdue(task.dueDate);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    const newStatus = e.target.value as Status;
    onEdit({ ...task, status: newStatus });
  };

  return (
    <div 
      className={`card-enhanced border-2 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group ${
        task.status === Status.COMPLETED ? 'opacity-80' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <h3 className={`text-lg font-semibold ${
              task.status === Status.COMPLETED 
                ? 'text-gray-500 dark:text-gray-400 line-through' 
                : 'text-gray-900 dark:text-white'
            } transition-colors duration-200`}>
              {task.title}
            </h3>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border-2 ${getPriorityColor(task.priority)} shadow-sm`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          </div>
          
          {task.description && (
            <p className={`text-gray-600 dark:text-gray-300 mb-4 leading-relaxed ${
              task.status === Status.COMPLETED 
                ? 'line-through opacity-70' 
                : ''
            }`}>
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <div className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium border-2 ${getStatusColor(task.status)} shadow-sm`}>
              {task.status.replace('_', ' ')}
            </div>
            
            {task.dueDate && (
              <div className={`flex items-center gap-1.5 ${
                overdue && task.status !== Status.COMPLETED
                  ? 'text-red-600 dark:text-red-400 font-semibold'
                  : ''
              }`}>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>
                  {overdue && task.status !== Status.COMPLETED ? '⚠️ Overdue: ' : 'Due: '}
                  {formatDate(task.dueDate)}
                </span>
              </div>
            )}
            
            <div className="flex items-center gap-1.5">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>Created: {formatDate(task.createdAt)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 ml-4 opacity-70 group-hover:opacity-100 transition-opacity duration-200">
          <select
            value={task.status}
            onChange={handleStatusChange}
            className="text-sm rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 px-3 py-2 backdrop-blur-sm transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <option value={Status.PENDING}>⏳ Pending</option>
            <option value={Status.IN_PROGRESS}>🔄 In Progress</option>
            <option value={Status.COMPLETED}>✅ Completed</option>
          </select>

          <button
            onClick={() => onEdit(task)}
            className="p-2.5 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200 hover:scale-110"
            aria-label="Edit task"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="p-2.5 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200 hover:scale-110"
            aria-label="Delete task"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
