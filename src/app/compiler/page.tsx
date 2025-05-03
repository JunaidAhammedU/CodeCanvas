'use client';

import { useCallback } from 'react';
import { CodeEditor } from '@/components/CodeEditor';
import { Terminal } from '@/components/Terminal';
import { useEditorStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { PlayIcon, Trash2, Terminal as TerminalIcon, Code2, Home } from 'lucide-react';
import { Resizer } from '@/components/Resizer';
import { TerminalPositionToggle } from '@/components/TerminalPositionToggle';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function CompilerPage() {
    const {
        code,
        setOutput,
        setIsRunning,
        clearOutput,
        isRunning,
        terminalPosition,
        terminalSize,
        setTerminalSize
    } = useEditorStore();

    const handleResize = useCallback((delta: number) => {
        const containerSize = terminalPosition === 'bottom'
            ? window.innerHeight
            : window.innerWidth;

        const pixelSize = (terminalSize / 100) * containerSize;
        const newPixelSize = Math.min(Math.max(pixelSize + delta, 100), containerSize * 0.9);
        const newPercentage = (newPixelSize / containerSize) * 100;

        setTerminalSize(Math.min(Math.max(newPercentage, 10), 90));
    }, [terminalPosition, terminalSize, setTerminalSize]);

    const runCode = useCallback(async () => {
        clearOutput();
        setIsRunning(true);

        try {
            const worker = new Worker(new URL('../../lib/code-worker.ts', import.meta.url));

            worker.onmessage = (e) => {
                const { output, error } = e.data;
                setOutput(error ? [`Error: ${error}`] : output);
                setIsRunning(false);
                worker.terminate();
            };

            worker.postMessage(code);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            setOutput([`Error: ${errorMessage}`]);
            setIsRunning(false);
        }
    }, [code, setOutput, setIsRunning, clearOutput]);

    const renderContent = () => {
        const editorSection = (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative h-full bg-[#1e1e1e] rounded-lg shadow-lg overflow-hidden"
                style={{ contain: 'strict' }}
            >
                <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={clearOutput}
                        className="flex items-center space-x-2 bg-gray-700 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-600 transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                        <span>Clear</span>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={runCode}
                        disabled={isRunning}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <PlayIcon className="w-4 h-4" />
                        <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                    </motion.button>
                </div>
                <CodeEditor />
            </motion.div>
        );

        const terminalSection = (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[#1e1e1e] rounded-lg shadow-lg overflow-hidden flex flex-col h-full"
                style={{ contain: 'strict' }}
            >
                <div className="bg-gray-800 h-10 flex items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <TerminalIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-white text-sm font-medium">Output</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <TerminalPositionToggle />
                    </div>
                </div>
                <div className="flex-1 border border-gray-800">
                    <Terminal />
                </div>
            </motion.div>
        );

        if (terminalPosition === 'bottom') {
            return (
                <div className="flex-1 flex flex-col gap-2 p-2 h-[calc(100vh-3.5rem)] overflow-hidden">
                    <div style={{ height: `${100 - terminalSize}%`, minHeight: 0 }}>
                        {editorSection}
                    </div>
                    <Resizer onResize={handleResize} />
                    <div style={{ height: `${terminalSize}%`, minHeight: 0 }}>
                        {terminalSection}
                    </div>
                </div>
            );
        }

        return (
            <div className="flex-1 flex gap-2 p-2 h-[calc(100vh-3.5rem)] overflow-hidden">
                {terminalPosition === 'left' && (
                    <>
                        <div style={{ width: `${terminalSize}%`, minWidth: 0 }}>
                            {terminalSection}
                        </div>
                        <Resizer onResize={handleResize} />
                        <div style={{ width: `${100 - terminalSize}%`, minWidth: 0 }}>
                            {editorSection}
                        </div>
                    </>
                )}
                {terminalPosition === 'right' && (
                    <>
                        <div style={{ width: `${100 - terminalSize}%`, minWidth: 0 }}>
                            {editorSection}
                        </div>
                        <Resizer onResize={handleResize} />
                        <div style={{ width: `${terminalSize}%`, minWidth: 0 }}>
                            {terminalSection}
                        </div>
                    </>
                )}
            </div>
        );
    };

    return (
        <div className="h-screen flex flex-col bg-gray-900">
            <div className="h-14 border-b border-gray-800 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-2">
                    <Code2 className="w-6 h-6 text-blue-500" />
                    <span className="text-lg font-semibold text-white">CodeCanvas</span>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <Home className="w-5 h-5" />
                        <span className="text-sm">Home</span>
                    </Link>
                </div>
            </div>
            {renderContent()}
        </div>
    );
}