
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { CodeGeneratorView } from './components/CodeGeneratorView';
import { CodeRefactorView } from './components/CodeRefactorView';
import { TestGeneratorView } from './components/TestGeneratorView';
import { DocWriterView } from './components/DocWriterView';
import { ChangelogGeneratorView } from './components/ChangelogGeneratorView';
import { Tool } from './types';
import { TOOLS } from './constants';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool>(Tool.CODE_GENERATOR);

  const renderActiveTool = () => {
    switch (activeTool) {
      case Tool.CODE_GENERATOR:
        return <CodeGeneratorView />;
      case Tool.CODE_REFACTOR:
        return <CodeRefactorView />;
      case Tool.TEST_GENERATOR:
        return <TestGeneratorView />;
      case Tool.DOC_WRITER:
        return <DocWriterView />;
      case Tool.CHANGELOG_GENERATOR:
        return <ChangelogGeneratorView />;
      default:
        return <CodeGeneratorView />;
    }
  };

  const currentTool = TOOLS.find(t => t.id === activeTool);

  return (
    <div className="flex h-screen bg-slate-900 text-slate-200">
      <Sidebar activeTool={activeTool} setActiveTool={setActiveTool} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 p-4 shadow-sm">
          <h1 className="text-xl font-semibold text-white">{currentTool?.name}</h1>
          <p className="text-sm text-slate-400">{currentTool?.description}</p>
        </header>
        <div className="flex-1 p-6 overflow-y-auto">
          {renderActiveTool()}
        </div>
      </main>
    </div>
  );
};

export default App;
