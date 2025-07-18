'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Calendar,
  Salad,
  Dumbbell,
  BookOpenCheck,
  FileText,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { useSidebar } from '../context/SidebarContext';

const links = [
  { href: '/', label: 'Dashboard', icon: <Home size={20} /> },
  { href: '/booking', label: 'Booking', icon: <Calendar size={20} /> },
  { href: '/nutrition', label: 'Nutrition', icon: <Salad size={20} /> },
  { href: '/coaching', label: 'Coaching', icon: <Dumbbell size={20} /> },
  { href: '/programmes', label: 'Programmes', icon: <BookOpenCheck size={20} /> },
  { href: '/docs', label: 'Docs', icon: <FileText size={20} /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { collapsed, toggle } = useSidebar();

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-50 bg-gray-900 text-white transition-all duration-300 flex flex-col ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-5">
        {!collapsed && <span className="text-xl font-bold">SuiviSport</span>}
        <button
          onClick={toggle}
          className="ml-auto text-gray-400 hover:text-white"
        >
          {collapsed ? <ChevronsRight /> : <ChevronsLeft />}
        </button>
      </div>

      <nav className="flex flex-col gap-2 px-2">
        {links.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-800 transition ${
              pathname === href ? 'bg-gray-800 text-green-400' : ''
            }`}
          >
            <span>{icon}</span>
            {!collapsed && <span className="text-sm">{label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
