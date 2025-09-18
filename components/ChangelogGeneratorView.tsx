
import React, { useState } from 'react';
import { CodeEditor } from './CodeEditor';
import { ActionButton } from './ActionButton';
import { useStreamingText } from '../hooks/useStreamingText';
import { streamChangelogGeneration } from '../services/geminiService';

const defaultCommits = `feat: add user authentication endpoint
fix: resolve issue with button alignment on mobile
docs: update README with setup instructions
refactor: simplify database query logic
feat: implement dark mode toggle
fix(api): correct error handling for 404 responses`;

export const ChangelogGeneratorView: React.FC = () => {
  const [commits, setCommits] = useState(defaultCommits);
  const { isLoading, error, data, execute } = useStreamingText(streamChangelogGeneration);

  const handleGenerate = () => {
    if (!commits) return;
    execute({ commits });
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
        <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Commit Messages</h3>
            <div className="flex-1 min-h-0">
                <CodeEditor
                    value={commits}
                    onChange={(e) => setCommits(e.target.value)}
                    placeholder="Paste commit messages here, one per line..."
                    minHeight="300px"
                />
            </div>
        </div>
        <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Generated Changelog (Markdown)</h3>
             <div className="flex-1 min-h-0">
                <CodeEditor value={data} readOnly placeholder="Formatted changelog will appear here..."  minHeight="300px"/>
            </div>
        </div>
      </div>
      
      <div className="flex justify-end">
         <ActionButton onClick={handleGenerate} isLoading={isLoading} disabled={!commits}>
            Generate Changelog
        </ActionButton>
      </div>

      {error && <div className="text-red-400 bg-red-900/50 p-3 rounded-lg mt-2">{error}</div>}
    </div>
  );
};
