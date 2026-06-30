'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/sobre-mi', label: 'Sobre mí' },
  { href: '/testimonios', label: 'Testimonios' },
  { href: '/blog', label: 'Blog' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cierra el menú móvil al cambiar de página
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <Link href="/" className="nav-logo">
          Ofelia Texis
        </Link>
        <ul className="nav-links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={pathname === l.href ? 'active' : ''}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link className="nav-cta" href="/contacto">
          Agendar sesión
        </Link>
        <div
          className="hamburger"
          id="hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Abrir menú"
          role="button"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} id="mobileMenu">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
            {l.label}
          </Link>
        ))}
        <Link
          href="/contacto"
          onClick={() => setMenuOpen(false)}
          style={{ color: 'var(--mauve)' }}
        >
          Agendar sesión
        </Link>
      </div>
    </>
  );
}
