import type { Metadata } from 'next';

import { Roboto } from 'next/font/google';

import './globals.css';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'NoteHub application for creating and managing notes',

  openGraph: {
  title: 'NoteHub',
  description: 'NoteHub application for creating and managing notes',

  url: 'https://08-zustand-nine-dun.vercel.app/',

  images: [
    {
      url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      width: 1200,
      height: 630,
      alt: 'NoteHub preview image',
    },
  ],
},
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>;

export default function RootLayout({
  children,
  modal,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />

          <main>{children}</main>

          {modal}

          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}