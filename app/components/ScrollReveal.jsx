'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Replica el "scroll reveal" del prototipo: añade la clase .visible a los
// elementos .reveal cuando entran en pantalla. Se vuelve a ejecutar en cada
// cambio de ruta.
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.visible)');
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [pathname]);

  return null;
}
