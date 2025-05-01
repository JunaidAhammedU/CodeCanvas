import { FC } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { useEditorStore, type TerminalPosition } from '@/lib/store';
import React from 'react';

export const TerminalPositionToggle: FC = () => {
    const { terminalPosition, setTerminalPosition } = useEditorStore();

    const positions: { value: TerminalPosition; icon: React.ReactElement }[] = [
        { value: 'bottom', icon: <ArrowDown className="w-4 h-4" /> },
        { value: 'right', icon: <ArrowRight className="w-4 h-4" /> },
        { value: 'left', icon: <ArrowLeft className="w-4 h-4" /> },
    ];

    return (
        <div className="flex items-center space-x-1">
            {positions.map(({ value, icon }) => (
                <button
                    key={value}
                    onClick={() => setTerminalPosition(value)}
                    className={`p-1 rounded hover:bg-[#3c3c3c] ${terminalPosition === value ? 'bg-[#3c3c3c] text-white' : 'text-gray-400'
                        }`}
                    title={`Move terminal to ${value}`}
                >
                    {icon}
                </button>
            ))}
        </div>
    );
};