
import React from 'react';
import { LoadingIcon } from './icons';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  children: React.ReactNode;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ isLoading, children, ...props }) => {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className="flex items-center justify-center gap-2 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
    >
      {isLoading && <LoadingIcon className="w-5 h-5 animate-spin" />}
      {children}
    </button>
  );
};
