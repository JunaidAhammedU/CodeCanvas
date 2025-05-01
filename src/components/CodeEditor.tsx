import { FC } from 'react';
import Editor from '@monaco-editor/react';
import { useEditorStore } from '@/lib/store';

export const CodeEditor: FC = () => {
    const { code, setCode } = useEditorStore();

    return (
        <div className="h-full w-full">
            <Editor
                height="100%"
                defaultLanguage="javascript"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || '')}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 16 },
                    lineHeight: 1.6,
                    fontFamily: 'Consolas, "Courier New", monospace',
                    folding: true,
                    glyphMargin: true,
                    contextmenu: true,
                    cursorStyle: 'line',
                    renderLineHighlight: 'all',
                    scrollbar: {
                        useShadows: false,
                        verticalScrollbarSize: 10,
                        horizontalScrollbarSize: 10
                    }
                }}
            />
        </div>
    );
};