"use client";
import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

export default function RootLayoutContent({
    children,
    className
}: {
    children: React.ReactNode;
    className: string;
}) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Reset scroll position
        window.scrollTo(0, 0);
        
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <body className={className}>
            <LoadingScreen isLoading={isLoading} />
            <ThemeProvider>
                {/* Background with fixed dimensions */}
                <div className="background-container fixed inset-0" style={{ zIndex: -1, minHeight: '100vh' }}>
                    <div className="animated-bg">
                        <div className="stars"></div>
                        <div className="shooting-star"></div>
                        <div className="shooting-star"></div>
                        <div className="shooting-star"></div>
                        <div className="glow-effect glow-1"></div>
                        <div className="glow-effect glow-2"></div>
                        <div className="glow-effect glow-3"></div>
                        <div className="glass-overlay"></div>
                        <div className="noise"></div>
                    </div>
                </div>

                {/* Content wrapper with fixed dimensions */}
                <div className="flex flex-col min-h-screen relative">
                    <div className="h-32 flex-none" /> {/* Fixed height spacer */}
                    <Header />
                    <main className="flex-1 relative w-full" style={{ minHeight: 'calc(100vh - 128px)' }}>
                        <div className="relative w-full h-full">
                            {children}
                        </div>
                    </main>
                    <Footer />
                </div>
            </ThemeProvider>
        </body>
    );
} 