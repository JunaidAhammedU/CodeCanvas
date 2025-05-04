"use client";

import { motion } from "motion/react";
import React from "react";

const codeIcons = [
    {
        icon: (
            <path
                d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"
                fill="currentColor"
            />
        ),
    },
    {
        icon: (
            <path
                d="M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H4V5h16v14z M6.7 15.3l3.3-3.3L6.7 8.7 8 7.3l4.7 4.7-4.7 4.7-1.3-1.4z"
                fill="currentColor"
            />
        ),
    },
    {
        icon: (
            <path
                d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
                fill="currentColor"
            />
        ),
    },
    {
        icon: (
            <path
                d="M3 3h18v18H3V3zm16.5 16.5V5.5h-15v14h15zM6.75 7.5h10.5v1.5H6.75V7.5zm0 3h10.5v1.5H6.75v-1.5zm0 3h10.5v1.5H6.75v-1.5z"
                fill="currentColor"
            />
        ),
    },
];

export const CodeIconsPattern = () => {
    return (
        <div className="fixed inset-0 z-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none">
            <div className="absolute inset-0 grid grid-cols-6 gap-8 transform rotate-12">
                {Array.from({ length: 60 }).map((_, i) => (
                    <motion.svg
                        key={i}
                        viewBox="0 0 24 24"
                        className="w-8 h-8 text-neutral-900 dark:text-white"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: Math.random() * 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            repeatDelay: Math.random() * 10,
                        }}
                    >
                        {codeIcons[i % codeIcons.length].icon}
                    </motion.svg>
                ))}
            </div>
        </div>
    );
};