'use client';

import React from 'react';
import { Task, Status } from '@/types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  groupByStatus?: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete, groupByStatus = false }) => {
  if (tasks.length === 0) {
    return (
      <div className="card-enhanced rounded-2xl p-12 text-center animate-fade-in-up">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center">
            <svg
              className="h-8 w-8 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            No tasks yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Ready to boost your productivity? Create your first task and start organizing your day!
          </p>
        </div>
      </div>
    );
  }

  if (groupByStatus) {
    const groupedTasks = {
      [Status.PENDING]: tasks.filter(task => task.status === Status.PENDING),
      [Status.IN_PROGRESS]: tasks.filter(task => task.status === Status.IN_PROGRESS),
      [Status.COMPLETED]: tasks.filter(task => task.status === Status.COMPLETED),
    };

    const statusLabels = {
      [Status.PENDING]: 'Pending Tasks',
      [Status.IN_PROGRESS]: 'In Progress',
      [Status.COMPLETED]: 'Completed',
    };

    const statusIcons = {
      [Status.PENDING]: '⏳',
      [Status.IN_PROGRESS]: '🔄',
      [Status.COMPLETED]: '✅',
    };

    const statusColors = {
      [Status.PENDING]: 'from-yellow-500 to-orange-500',
      [Status.IN_PROGRESS]: 'from-blue-500 to-indigo-500',
      [Status.COMPLETED]: 'from-green-500 to-emerald-500',
    };

    const statusOrder = [Status.PENDING, Status.IN_PROGRESS, Status.COMPLETED];

    return (
      <div className="space-y-8">
        {statusOrder.map((status, index) => {
          const statusTasks = groupedTasks[status];
          
          return (
            <div key={status} className="animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="flex items-center mb-6">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${statusColors[status]} mr-3 shadow-lg`}></div>
                <span className="text-2xl mr-3">{statusIcons[status]}</span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {statusLabels[status]}
                </h3>
                <span className="ml-3 inline-flex items-center rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 px-3 py-1 text-sm font-semibold text-gray-800 dark:text-gray-200 shadow-sm">
                  {statusTasks.length} {statusTasks.length === 1 ? 'task' : 'tasks'}
                </span>
              </div>
              <div className="grid gap-4">
                {statusTasks.map((task, taskIndex) => (
                  <div key={task.id} className="animate-slide-in-right" style={{animationDelay: `${(index * 0.1) + (taskIndex * 0.05)}s`}}>
                    <TaskItem
                      task={task}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  </div>
                ))}
                {statusTasks.length === 0 && (
                  <div className="card-enhanced rounded-xl p-8 text-center">
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                      No {statusLabels[status].toLowerCase()} yet
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {tasks.map((task, index) => (
        <div key={task.id} className="animate-fade-in-up" style={{animationDelay: `${index * 0.05}s`}}>
          <TaskItem
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
