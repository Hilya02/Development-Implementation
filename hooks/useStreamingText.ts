
import { useState, useCallback } from 'react';
import type { GenerateContentResponse } from '@google/genai';

type Streamer<TArgs> = (args: TArgs) => Promise<AsyncIterable<GenerateContentResponse>>;

export const useStreamingText = <TArgs,>(
  streamer: Streamer<TArgs>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState('');

  const execute = useCallback(async (args: TArgs) => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    setData('');

    try {
      const stream = await streamer(args);
      for await (const chunk of stream) {
        setData((prev) => prev + chunk.text);
      }
    } catch (e) {
      const err = e as Error;
      setError(`An error occurred: ${err.message}`);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [streamer, isLoading]);

  return { isLoading, error, data, execute, setData };
};
