'use client';

import { useCallback } from 'react';
import { CodeEditor } from '@/components/CodeEditor';
import { Terminal } from '@/components/Terminal';
import { useEditorStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { PlayIcon, Files, Settings, Search, GitBranch } from 'lucide-react';
import { Resizer } from '@/components/Resizer';
import { TerminalPositionToggle } from '@/components/TerminalPositionToggle';

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
        const newSize = terminalPosition === 'bottom'
            ? terminalSize - (delta / window.innerHeight) * 100
            : terminalSize - (delta / window.innerWidth) * 100;
        setTerminalSize(Math.min(Math.max(newSize, 10), 90));
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
                className="relative h-full"
            >
                <CodeEditor />
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={runCode}
                    disabled={isRunning}
                    className="absolute top-4 right-4 flex items-center space-x-2 bg-blue-500 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                >
                    <PlayIcon className="w-4 h-4" />
                    <span>Run Code</span>
                </motion.button>
            </motion.div>
        );

        const terminalSection = (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-[#3c3c3c] flex flex-col"
                style={{
                    borderLeft: terminalPosition === 'right' ? '1px solid' : undefined,
                    borderRight: terminalPosition === 'left' ? '1px solid' : undefined,
                    borderTop: terminalPosition === 'bottom' ? '1px solid' : undefined,
                }}
            >
                <div className="bg-[#1e1e1e] h-9 border-b border-[#3c3c3c] flex items-center justify-between px-4">
                    <span className="text-white text-sm">Terminal</span>
                    <TerminalPositionToggle />
                </div>
                <div className="flex-1">
                    <Terminal />
                </div>
            </motion.div>
        );

        if (terminalPosition === 'bottom') {
            return (
                <div className="flex-1 flex flex-col">
                    <div style={{ height: `${100 - terminalSize}%` }}>
                        {editorSection}
                    </div>
                    <Resizer onResize={handleResize} />
                    <div style={{ height: `${terminalSize}%` }}>
                        {terminalSection}
                    </div>
                </div>
            );
        }

        const terminalWidth = `${terminalSize}%`;
        const editorWidth = `${100 - terminalSize}%`;

        return (
            <div className="flex-1 flex">
                {terminalPosition === 'left' && (
                    <>
                        <div style={{ width: terminalWidth }}>
                            {terminalSection}
                        </div>
                        <Resizer onResize={handleResize} />
                        <div style={{ width: editorWidth }}>
                            {editorSection}
                        </div>
                    </>
                )}
                {terminalPosition === 'right' && (
                    <>
                        <div style={{ width: editorWidth }}>
                            {editorSection}
                        </div>
                        <Resizer onResize={handleResize} />
                        <div style={{ width: terminalWidth }}>
                            {terminalSection}
                        </div>
                    </>
                )}
            </div>
        );
    };

    return (
        <div className="flex h-screen bg-[#1e1e1e]">
            {/* VS Code-like Sidebar */}
            <div className="w-12 bg-[#252526] flex flex-col items-center py-4 border-r border-[#3c3c3c]">
                <button className="p-2 text-gray-400 hover:text-white mb-4">
                    <Files className="w-6 h-6" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white mb-4">
                    <Search className="w-6 h-6" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white mb-4">
                    <GitBranch className="w-6 h-6" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white mt-auto">
                    <Settings className="w-6 h-6" />
                </button>
            </div>

            <div className="flex-1 flex flex-col">
                {/* Tab Bar */}
                <div className="h-9 bg-[#252526] flex items-center px-4 border-b border-[#3c3c3c]">
                    <div className="px-3 py-1 bg-[#1e1e1e] text-white text-sm border-t border-blue-500">
                        index.js
                    </div>
                </div>

                {/* Main Content */}
                {renderContent()}
            </div>
        </div>
    );
}