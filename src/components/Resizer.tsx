import { FC, MouseEvent as ReactMouseEvent, useCallback, useState, useEffect } from 'react';
import { useEditorStore } from '@/lib/store';

interface ResizerProps {
    onResize: (delta: number) => void;
}

export const Resizer: FC<ResizerProps> = ({ onResize }) => {
    const [isDragging, setIsDragging] = useState(false);
    const { terminalPosition } = useEditorStore();
    const isHorizontal = terminalPosition === 'left' || terminalPosition === 'right';

    const handleMouseDown = useCallback((e: ReactMouseEvent) => {
        setIsDragging(true);
        e.preventDefault();
    }, []);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleMouseMove = useCallback((e: globalThis.MouseEvent) => {
        if (isDragging) {
            onResize(isHorizontal ? e.movementX : e.movementY);
        }
    }, [isDragging, onResize, isHorizontal]);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    return (
        <div
            className={`bg-[#3c3c3c] hover:bg-blue-500/50 flex items-center justify-center
                ${isHorizontal ? 'w-2 cursor-ew-resize' : 'h-2 cursor-ns-resize'}`}
            onMouseDown={handleMouseDown}
        >
            <div
                className={`bg-[#525252] hover:bg-blue-500 rounded-full
                    ${isHorizontal ? 'h-8 w-1' : 'w-8 h-1'}`}
            />
        </div>
    );
};