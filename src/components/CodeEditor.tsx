import { FC } from 'react';
import Editor from '@monaco-editor/react';
import { useEditorStore } from '@/lib/store';

export const CodeEditor = () => {
    const { code, setCode } = useEditorStore();

    return (
        <div className="h-full w-full overflow-hidden">
            <Editor
                height="100%"
                width="100%"
                defaultLanguage="javascript"
                defaultValue={code}
                theme="vs-dark"
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