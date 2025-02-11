import { Inter, Roboto, Space_Grotesk } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'
import RootLayoutContent from '@/components/RootLayoutContent'

const roboto = Roboto({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-display',
});

export const metadata: Metadata = {
    title: 'Perkraustymo paslaugos',
    description: 'Profesionalios perkraustymo paslaugos',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={spaceGrotesk.variable}>
            <RootLayoutContent className={`${roboto.className} min-h-screen-safe flex flex-col`}>
                {children}
            </RootLayoutContent>
        </html>
    );
}
