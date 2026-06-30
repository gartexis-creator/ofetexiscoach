'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from './LogoutButton';

const ITEMS = [
  { href: '/admin', label: 'Inicio', ico: '◈', exact: true },
  { href: '/admin/reservas', label: 'Citas', ico: '📅' },
  { href: '/admin/mensajes', label: 'Mensajes', ico: '✉' },
  { href: '/admin/suscriptores', label: 'Suscriptores', ico: '❤' },
  { href: '/admin/blog', label: 'Blog', ico: '✎' },
  { href: '/admin/testimonios', label: 'Testimonios', ico: '★' },
  { href: '/admin/programas', label: 'Programas', ico: '✦' },
];

export default function AdminSidebar({ email }) {
  const pathname = usePathname();

  const activo = (item) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">
        Soberanía Relacional
        <small>Administración</small>
      </div>

      <nav className="admin-nav">
        {ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={activo(item) ? 'active' : ''}
          >
            <span className="ico">{item.ico}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="admin-sidebar-foot">
        {email && <div className="admin-user">{email}</div>}
        <LogoutButton />
        <a
          className="admin-ver-sitio"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          ↗ Ver el sitio web
        </a>
      </div>
    </aside>
  );
}
