import dynamic from 'next/dynamic';

// Dynamically import EuropeMap with no SSR
const EuropeMap = dynamic(
    () => import('@/components/EuropeMap'),
    { ssr: false }
);

export default function InternationalServicesPage() {
    return (
        <main className="w-full">
            <EuropeMap />
        </main>
    );
} 