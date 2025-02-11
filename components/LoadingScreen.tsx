"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export default function LoadingScreen({ isLoading }: { isLoading: boolean }) {
    useEffect(() => {
        // Manage body class for scroll locking
        if (isLoading) {
            document.body.classList.add('loading');
        } else {
            document.body.classList.remove('loading');
        }
    }, [isLoading]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
                >
                    <div className="relative">
                        {/* Simple loading spinner */}
                        <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                        
                        {/* Loading text */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-8 text-white/80"
                        >
                            <span className="loading-text">Loading</span>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
} 