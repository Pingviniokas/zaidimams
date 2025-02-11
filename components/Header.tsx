"use client";
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

export default function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="fixed inset-x-0 top-0 z-50">
            <div className="w-full pt-12 px-8">
                <div className="max-w-[2000px] mx-auto">
                    <nav className="flex items-center backdrop-blur-md bg-black/10 rounded-2xl px-8 py-4 border border-white/10 animate-fade-in">
                        {/* Logo with animation */}
                        <Link 
                            href="/" 
                            className="text-2xl font-bold tracking-[0.15em] text-white font-display relative group flex items-center animate-slide-left delay-100"
                        >
                            <span className="relative inline-block transition-all duration-300 group-hover:scale-105 group-hover:text-emerald-400">
                                MES JAU ČIA
                                <span className="absolute -right-4 top-0 h-2 w-2 bg-emerald-500 rounded-full"></span>
                            </span>
                        </Link>

                        {/* Center Navigation */}
                        <div className="flex-1 flex justify-center">
                            <div className="flex gap-12">
                                {['Pradinis', 'Paslaugos', 'Apie mus', 'Blogas'].map((item) => (
                                    <Link 
                                        key={item} 
                                        href="#" 
                                        className="relative text-sm text-white/70 hover:text-white transition-all duration-200 group py-2 px-4 animate-slide-right delay-200"
                                    >
                                        <span className="relative z-10">
                                            {item}
                                        </span>
                                        <span className="absolute inset-0 bg-white/5 rounded-lg scale-0 transition-transform duration-200 group-hover:scale-100"></span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Theme Toggle */}
                        <div className="mr-6">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer"
                                    checked={theme === 'light'}
                                    onChange={toggleTheme}
                                />
                                <div className="
                                    w-14 h-7 
                                    bg-black/20 
                                    peer-focus:outline-none 
                                    rounded-full 
                                    peer 
                                    peer-checked:after:translate-x-full 
                                    peer-checked:after:border-white 
                                    after:content-[''] 
                                    after:absolute 
                                    after:top-[2px] 
                                    after:left-[2px] 
                                    after:bg-emerald-500 
                                    after:border-emerald-300 
                                    after:border 
                                    after:rounded-full 
                                    after:h-6 
                                    after:w-6 
                                    after:transition-all 
                                    after:duration-300
                                    peer-checked:bg-emerald-500/20
                                    transition-colors
                                    duration-300
                                    border border-white/10
                                    relative
                                    overflow-hidden
                                ">
                                    <span className="absolute inset-0 flex items-center justify-between px-1.5 text-[10px] text-white/70">
                                        <span>🌙</span>
                                        <span>☀️</span>
                                    </span>
                                </div>
                            </label>
                        </div>

                        {/* Contact Button */}
                        <button className="
                            px-6 py-2.5 
                            rounded-xl 
                            bg-gradient-to-r from-emerald-500/80 to-teal-500/80 
                            text-white 
                            text-sm 
                            font-medium
                            transition-all 
                            duration-300 
                            border border-white/10
                            relative
                            overflow-hidden
                            group
                            hover:-translate-y-0.5
                            hover:shadow-lg hover:shadow-emerald-500/20
                        ">
                            <span className="relative z-10">Kontaktai</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
} 