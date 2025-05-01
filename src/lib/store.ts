import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TerminalPosition = 'bottom' | 'right' | 'left';

interface EditorStore {
    code: string;
    output: string[];
    isRunning: boolean;
    terminalPosition: TerminalPosition;
    terminalSize: number;
    setCode: (code: string) => void;
    setOutput: (output: string[]) => void;
    setIsRunning: (isRunning: boolean) => void;
    setTerminalPosition: (position: TerminalPosition) => void;
    setTerminalSize: (size: number) => void;
    clearOutput: () => void;
}

export const useEditorStore = create<EditorStore>()(
    persist(
        (set) => ({
            code: '// Write your JavaScript code here\nconsole.log("Hello, World!");',
            output: [],
            isRunning: false,
            terminalPosition: 'bottom',
            terminalSize: 30,
            setCode: (code) => set({ code }),
            setOutput: (output) => set({ output }),
            setIsRunning: (isRunning) => set({ isRunning }),
            setTerminalPosition: (position) => set({ terminalPosition: position }),
            setTerminalSize: (size) => set({ terminalSize: size }),
            clearOutput: () => set({ output: [] }),
        }),
        {
            name: 'editor-storage',
        }
    )
);