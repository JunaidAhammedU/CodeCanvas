import { FC } from 'react';
import { useEditorStore } from '@/lib/store';
import { motion } from 'framer-motion';

export const Terminal: FC = () => {
    const { output } = useEditorStore();

    return (
        <div className="h-full bg-background text-foreground font-mono text-sm overflow-auto">
            <motion.div
                className="min-h-full p-4 space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {output.length === 0 ? (
                    <div className="text-muted-foreground italic">
                        Output will appear here when you run your code...
                        <br />
                        Press {navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'} + S to execute.
                    </div>
                ) : (
                    output.map((line, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-start space-x-2 group"
                        >
                            <span className={`
                                ${line.startsWith('Error:') ? 'text-destructive' :
                                    line.startsWith('Warning:') ? 'text-warning' :
                                        'text-success'}
                                opacity-60 group-hover:opacity-100 transition-opacity
                            `}>
                                {'>'}
                            </span>
                            <span className={`
                                ${line.startsWith('Error:') ? 'text-destructive' :
                                    line.startsWith('Warning:') ? 'text-warning' :
                                        'text-foreground'}
                                opacity-90 group-hover:opacity-100 transition-opacity whitespace-pre-wrap
                            `}>
                                {line}
                            </span>
                        </motion.div>
                    ))
                )}
            </motion.div>
        </div>
    );
};