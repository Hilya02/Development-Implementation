
import React, { useState } from 'react';
import { CodeEditor } from './CodeEditor';
import { ActionButton } from './ActionButton';
import { useStreamingText } from '../hooks/useStreamingText';
import { streamCodeGeneration } from '../services/geminiService';

export const CodeGeneratorView: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('TypeScript');
  const { isLoading, error, data, execute } = useStreamingText(streamCodeGeneration);

  const handleGenerate = () => {
    if (!prompt || !language) return;
    execute({ prompt, language });
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <label htmlFor="prompt" className="block text-sm font-medium text-slate-300 mb-1">
            Prompt
          </label>
          <CodeEditor
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., a React component with a button that increments a counter"
            minHeight="80px"
          />
        </div>
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-slate-300 mb-1">
            Language
          </label>
          <input
            id="language"
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            placeholder="e.g., TypeScript"
            className="w-full p-2 font-mono text-sm bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-300"
          />
        </div>
      </div>
      <ActionButton onClick={handleGenerate} isLoading={isLoading} disabled={!prompt || !language}>
        Generate Code
      </ActionButton>
      {error && <div className="text-red-400 bg-red-900/50 p-3 rounded-lg">{error}</div>}
      <div className="flex-1 h-full">
        <CodeEditor value={data} readOnly placeholder="Generated code will appear here..." minHeight="400px"/>
      </div>
    </div>
  );
};
