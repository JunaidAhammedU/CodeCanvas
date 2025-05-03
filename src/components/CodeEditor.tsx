import { FC, useCallback, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useEditorStore } from '@/lib/store';
import { useTheme } from 'next-themes';

export const CodeEditor = () => {
    const { code, setCode, setOutput, setIsRunning, clearOutput } = useEditorStore();
    const { theme } = useTheme();

    const runCode = useCallback(async () => {
        clearOutput();
        setIsRunning(true);

        try {
            const worker = new Worker(new URL('../lib/code-worker.ts', import.meta.url));

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

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                runCode();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [runCode]);

    return (
        <div className="h-full w-full overflow-hidden">
            <Editor
                height="100%"
                width="100%"
                defaultLanguage="javascript"
                defaultValue={code}
                theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
                onChange={(value) => setCode(value || '')}
                options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    lineNumbers: 'on',
                    glyphMargin: false,
                    folding: true,
                    lineDecorationsWidth: 0,
                    lineNumbersMinChars: 3,
                    automaticLayout: true,
                    padding: { top: 15 },
                    scrollbar: {
                        vertical: 'visible',
                        horizontal: 'visible',
                        verticalScrollbarSize: 10,
                        horizontalScrollbarSize: 10
                    }
                }}
            />
        </div>
    );
};