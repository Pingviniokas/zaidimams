import './styles.css';
import { Metadata } from 'next';
import { countryServices } from '@/data/countryServices';

export const metadata: Metadata = {
    title: 'Tarptautiniai perkraustymai | Pervežimo paslaugos Europoje',
    description: 'Profesionalios perkraustymo paslaugos visoje Europoje. Saugus ir patikimas daiktų pervežimas, pakavimas ir sandėliavimas.',
    keywords: Object.values(countryServices)
        .flatMap(country => country.services.seoKeywords)
        .filter(Boolean)
        .join(', '),
};

export default function TarptautinesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="min-h-screen relative">
            <div className="background-container">
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
            {children}
        </section>
    );
} 