
import React from 'react';

interface CodeEditorProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  readOnly?: boolean;
  minHeight?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  placeholder,
  readOnly = false,
  minHeight = '150px'
}) => {
  return (
    <div className="relative w-full h-full">
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        spellCheck="false"
        className={`w-full h-full p-4 font-mono text-sm bg-slate-800/50 border border-slate-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-300 placeholder-slate-500 ${readOnly ? 'cursor-default' : ''}`}
        style={{ minHeight: minHeight }}
      />
    </div>
  );
};
