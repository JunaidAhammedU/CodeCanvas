import { FC } from 'react';
import Editor from '@monaco-editor/react';
import { useEditorStore } from '@/lib/store';

export const CodeEditor: FC = () => {
    const { code, setCode } = useEditorStore();

    return (
        <div className="h-[60vh] w-full rounded-lg border border-border">
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
                    roundedSelection: true,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
            />
        </div>
    );
};