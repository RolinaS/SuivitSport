// src/app/client-layout.tsx

'use client';

import { useSidebar } from '../context/SidebarContext';
import Sidebar from '../components/Sidebar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main
        className={`transition-all duration-300 flex-1 overflow-y-auto bg-black text-white p-6 ${
          collapsed ? 'pl-20' : 'pl-64'
        }`}
      >
        {children}
      </main>
    </div>
  );
}
