import { FC } from 'react';
import { useEditorStore } from '@/lib/store';
import { motion } from 'framer-motion';

export const Terminal: FC = () => {
    const { output } = useEditorStore();

    return (
        <div className="h-full bg-[#1e1e1e] text-white font-mono text-sm overflow-auto">
            <motion.div
                className="min-h-full p-4 space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {output.length === 0 ? (
                    <div className="text-gray-500 italic">
                        Output will appear here when you run your code...
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
                                ${line.startsWith('Error:') ? 'text-red-400' :
                                    line.startsWith('Warning:') ? 'text-yellow-400' :
                                        'text-green-400'}
                                opacity-60 group-hover:opacity-100 transition-opacity
                            `}>
                                {'>'}
                            </span>
                            <span className={`
                                ${line.startsWith('Error:') ? 'text-red-400' :
                                    line.startsWith('Warning:') ? 'text-yellow-400' :
                                        'text-white'}
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