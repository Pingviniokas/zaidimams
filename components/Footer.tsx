"use client";
import { useTheme } from '@/contexts/ThemeContext';

export default function Footer() {
    const { theme } = useTheme();

    return (
        <footer className="relative z-50 px-8 py-12 mt-auto">
            <div className="max-w-[2000px] mx-auto">
                <div className={`backdrop-blur-md rounded-2xl p-12 border ${
                    theme === 'light' ? 'border-black/10' : 'border-white/10'
                }`}>
                    <div className="grid grid-cols-4 gap-16">
                        {/* Logo Section */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-light tracking-wider text-white/90 font-display">
                                MES JAU ČIA
                            </h3>
                            <p className="text-sm text-white/60 leading-relaxed">
                                Profesionalios perkraustymo paslaugos visoje Europoje. Saugus ir patikimas daiktų pervežimas.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-medium text-white/80">Nuorodos</h4>
                            <div className="space-y-2">
                                {['Pradinis', 'Paslaugos', 'Apie mus', 'Blogas'].map((item) => (
                                    <a 
                                        key={item}
                                        href="#" 
                                        className="block text-sm text-white/60 hover:text-white/90 transition-colors duration-200"
                                    >
                                        {item}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-medium text-white/80">Kontaktai</h4>
                            <div className="space-y-2 text-sm text-white/60">
                                <p>+370 600 00000</p>
                                <p>info@mesjaucia.lt</p>
                                <p>Vilnius, Lietuva</p>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-medium text-white/80">Naujienlaiškis</h4>
                            <div className="flex gap-2">
                                <input 
                                    type="email" 
                                    placeholder="Jūsų el. paštas" 
                                    className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white/90 placeholder:text-white/40 focus:outline-none focus:border-white/20"
                                />
                                <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600/80 to-blue-800/80 text-white/90 text-sm hover:from-blue-600 hover:to-blue-800 transition-all duration-300">
                                    →
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center text-sm text-white/40">
                        <p>© 2024 Mes Jau Čia. Visos teisės saugomos.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-white/60 transition-colors duration-200">Privatumo politika</a>
                            <a href="#" className="hover:text-white/60 transition-colors duration-200">Sąlygos</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
} 