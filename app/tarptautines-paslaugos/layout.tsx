import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Tarptautinės Paslaugos | Mes Jau Čia',
    description: 'Profesionalios perkraustymo paslaugos visoje Europoje',
};

export default function InternationalServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 