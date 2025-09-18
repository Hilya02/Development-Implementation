
import React from 'react';
import { Tool } from '../types';
import { TOOLS } from '../constants';

interface SidebarProps {
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTool, setActiveTool }) => {
  return (
    <aside className="w-64 bg-slate-950 p-4 border-r border-slate-800 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-white">
          D
        </div>
        <h1 className="text-xl font-bold text-white">DevAI Toolkit</h1>
      </div>
      <nav className="flex flex-col gap-2">
        {TOOLS.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTool === tool.id
                ? 'bg-indigo-500 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {tool.icon}
            <span>{tool.name}</span>
          </button>
        ))}
      </nav>
      <div className="mt-auto text-xs text-slate-500">
        <p>Powered by Gemini</p>
        <p>&copy; 2024</p>
      </div>
    </aside>
  );
};
