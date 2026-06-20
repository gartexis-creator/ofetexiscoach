'use client';

import { usePathname } from 'next/navigation';

// Oculta los elementos de la web pública (Navbar, Footer, WhatsApp)
// cuando estamos dentro del panel de administración (/admin).
export default function ChromeGate({ children }) {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;
  return children;
}
