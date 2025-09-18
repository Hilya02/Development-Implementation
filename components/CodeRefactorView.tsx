
import React, { useState } from 'react';
import { CodeEditor } from './CodeEditor';
import { ActionButton } from './ActionButton';
import { useStreamingText } from '../hooks/useStreamingText';
import { streamCodeRefactor } from '../services/geminiService';

export const CodeRefactorView: React.FC = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('TypeScript');
  const [instructions, setInstructions] = useState('Make it more readable and efficient.');
  const { isLoading, error, data, execute } = useStreamingText(streamCodeRefactor);

  const handleGenerate = () => {
    if (!code || !language) return;
    execute({ code, language, instructions });
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
        <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Before</h3>
            <div className="flex-1 min-h-0">
                <CodeEditor
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Paste code to refactor here..."
                    minHeight="300px"
                />
            </div>
        </div>
        <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">After</h3>
             <div className="flex-1 min-h-0">
                <CodeEditor value={data} readOnly placeholder="Refactored code will appear here..."  minHeight="300px"/>
            </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            placeholder="Language (e.g., Python)"
            className="w-full md:w-40 p-2 font-mono text-sm bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-300"
        />
        <input
            type="text"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Instructions (e.g., improve performance)"
            className="flex-1 p-2 text-sm bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-300"
        />
        <ActionButton onClick={handleGenerate} isLoading={isLoading} disabled={!code || !language} className="w-full md:w-auto">
            Refactor Code
        </ActionButton>
      </div>

      {error && <div className="text-red-400 bg-red-900/50 p-3 rounded-lg mt-2">{error}</div>}
    </div>
  );
};
