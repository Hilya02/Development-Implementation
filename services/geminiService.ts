
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this context, we assume the key is present.
  console.warn("API_KEY environment variable not set. App will not function correctly.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const streamContent = async (prompt: string): Promise<AsyncIterable<GenerateContentResponse>> => {
  try {
    const response = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        // Disabling thinking for code generation tasks can lead to faster, more direct output.
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response;
  } catch (error) {
    console.error("Error in streamGeneration:", error);
    throw new Error("Failed to generate content from the API.");
  }
};

interface CodeGenArgs {
  prompt: string;
  language: string;
}
export const streamCodeGeneration = ({ prompt, language }: CodeGenArgs) => {
  const fullPrompt = `You are an expert ${language} programmer. Write a code snippet that does the following: ${prompt}. Only output the raw code for the ${language} file. Do not include any explanation, preamble, or markdown formatting.`;
  return streamContent(fullPrompt);
};

interface RefactorArgs {
  code: string;
  language: string;
  instructions: string;
}
export const streamCodeRefactor = ({ code, language, instructions }: RefactorArgs) => {
  const fullPrompt = `You are an expert code reviewer. Refactor the following ${language} code to improve its readability, performance, and maintainability. Follow these instructions: ${instructions}.\n\nCode:\n\`\`\`${language}\n${code}\n\`\`\`\n\nOnly output the refactored, raw code. Do not include any explanation, preamble, or markdown formatting.`;
  return streamContent(fullPrompt);
};

interface TestGenArgs {
  code: string;
  language: string;
  framework: string;
}
export const streamTestGeneration = ({ code, language, framework }: TestGenArgs) => {
  const fullPrompt = `You are a software quality engineer. Write unit tests for the following ${language} code using the ${framework} framework. Cover all reasonable edge cases.\n\nCode:\n\`\`\`${language}\n${code}\n\`\`\`\n\nOnly output the raw test code. Do not include any explanation, preamble, or markdown formatting.`;
  return streamContent(fullPrompt);
};

interface DocGenArgs {
    code: string;
    language: string;
}
export const streamDocGeneration = ({ code, language }: DocGenArgs) => {
  const fullPrompt = `You are a technical writer. Add clear and concise comments and docstrings to the following ${language} code. Explain the purpose of each function, its parameters, and what it returns.\n\nCode:\n\`\`\`${language}\n${code}\n\`\`\`\n\nOnly output the documented, raw code. Do not include any explanation, preamble, or markdown formatting.`;
  return streamContent(fullPrompt);
};

interface ChangelogGenArgs {
    commits: string;
}
export const streamChangelogGeneration = ({ commits }: ChangelogGenArgs) => {
  const fullPrompt = `You are a release manager. Given the following git commit messages, generate a changelog in Markdown format. Group the changes by type (e.g., "### ✨ Features", "### 🐛 Bug Fixes", "### 🚀 Performance", "### 🛠️ Refactoring").\n\nCommits:\n${commits}\n\nOnly output the changelog in Markdown format.`;
  return streamContent(fullPrompt);
};
