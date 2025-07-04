import { customHelloBellaYzApo } from '@/app/fonts';
import { Playfair_Display, Inter } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';

const playfairDisplay = Playfair_Display({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-playfair',
});

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: 'Johanna & Lukas - Hochzeit 2025',
    description: 'Wir heiraten! Begleitet uns auf unserem besonderen Tag.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
            lang="de"
            className={`${customHelloBellaYzApo.variable} ${playfairDisplay.variable} ${inter.variable}`}
            data-oid="t0g:3he"
        >
            <body className="font-sans" data-oid="qtan71o">
                {children}
            </body>
        </html>
    );
}
