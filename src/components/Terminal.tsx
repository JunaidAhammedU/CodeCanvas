import { FC } from 'react';
import { useEditorStore } from '@/lib/store';

export const Terminal: FC = () => {
    const { output } = useEditorStore();

    return (
        <div className="h-full bg-[#1e1e1e] text-white font-mono text-sm overflow-auto p-2">
            <div className="space-y-1">
                {output.map((line, index) => (
                    <div
                        key={index}
                        className="flex items-start space-x-2"
                    >
                        <span
                            className={
                                line.startsWith('Error:')
                                    ? 'text-red-400'
                                    : line.startsWith('Warning:')
                                        ? 'text-yellow-400'
                                        : 'text-green-400'
                            }
                        >
                            {'>'}
                        </span>
                        <span className={
                            line.startsWith('Error:')
                                ? 'text-red-400'
                                : line.startsWith('Warning:')
                                    ? 'text-yellow-400'
                                    : 'text-white'
                        }>
                            {line}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};