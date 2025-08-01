'use client';

import React from 'react';
import { ConfirmDialogProps } from '@/types';
import Modal from './Modal';

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message 
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 shadow-lg animate-scale-in">
          <svg
            className="h-8 w-8 text-red-600 dark:text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            🗑️ {title}
          </h3>
          <div className="mt-3">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {message}
            </p>
          </div>
        </div>
        <div className="mt-8 flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-600/50 px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 shadow-sm focus:outline-none focus:ring-4 focus:ring-gray-500/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
          >
            ❌ Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-3 text-sm font-semibold text-white shadow-lg focus:outline-none focus:ring-4 focus:ring-red-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
