// src/app/layout.tsx (doit rester côté serveur ❌ pas de 'use client')

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SidebarProvider } from '../context/SidebarContext';
import ClientLayout from './client-layout'; // nouveau composant client

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SuiviSport',
  description: 'Suivi nutritionnel et sportif',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <SidebarProvider>
          <ClientLayout>{children}</ClientLayout>
        </SidebarProvider>
      </body>
    </html>
  );
}
