
import React from 'react';
import { Tool } from './types';
import { CodeIcon, RefactorIcon, TestIcon, DocIcon, ChangelogIcon } from './components/icons';

export const TOOLS = [
  {
    id: Tool.CODE_GENERATOR,
    name: 'Code Generator',
    description: 'Generate boilerplate, functions, or entire components from a text prompt.',
    icon: <CodeIcon className="w-5 h-5" />,
  },
  {
    id: Tool.CODE_REFACTOR,
    name: 'Code Refactor',
    description: 'Improve code readability, performance, and maintainability.',
    icon: <RefactorIcon className="w-5 h-5" />,
  },
  {
    id: Tool.TEST_GENERATOR,
    name: 'Test Generator',
    description: 'Automatically generate unit tests for your code.',
    icon: <TestIcon className="w-5 h-5" />,
  },
  {
    id: Tool.DOC_WRITER,
    name: 'Documentation Writer',
    description: 'Add comments and docstrings to your code automatically.',
    icon: <DocIcon className="w-5 h-5" />,
  },
  {
    id: Tool.CHANGELOG_GENERATOR,
    name: 'Changelog Generator',
    description: 'Create a formatted changelog from a list of commit messages.',
    icon: <ChangelogIcon className="w-5 h-5" />,
  },
];
