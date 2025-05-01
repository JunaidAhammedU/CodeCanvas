'use client';

import { useCallback } from 'react';
import { CodeEditor } from '@/components/CodeEditor';
import { Terminal } from '@/components/Terminal';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useEditorStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { PlayIcon } from 'lucide-react';

export default function Home() {
  const { code, setOutput, setIsRunning, clearOutput, isRunning } = useEditorStore();

  const runCode = useCallback(async () => {
    clearOutput();
    setIsRunning(true);

    try {
      const worker = new Worker(new URL('../lib/code-worker.ts', import.meta.url));

      worker.onmessage = (e) => {
        const { success, output, error } = e.data;
        setOutput(output);
        setIsRunning(false);
        worker.terminate();
      };

      worker.postMessage(code);
    } catch (error: any) {
      setOutput([`Error: ${error.message}`]);
      setIsRunning(false);
    }
  }, [code, setOutput, setIsRunning, clearOutput]);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <main className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2"
          >
            <h1 className="text-2xl font-bold text-foreground">JavaScript Compiler</h1>
            <p className="text-sm text-muted-foreground">
              Write and execute JavaScript code in real-time with console output.
            </p>
          </motion.div>
          <ThemeToggle />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-end space-x-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={runCode}
              disabled={isRunning}
              className="flex items-center space-x-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PlayIcon className="h-4 w-4" />
              <span>Run Code</span>
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CodeEditor />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Terminal />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
