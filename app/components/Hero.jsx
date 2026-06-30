'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Hero() {
  const ref = useRef(null);

  // Parallax suave: las capas decorativas siguen ligeramente al cursor.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let raf = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--mx', `${(x * 26).toFixed(2)}px`);
        el.style.setProperty('--my', `${(y * 26).toFixed(2)}px`);
      });
    };
    const onLeave = () => {
      el.style.setProperty('--mx', '0px');
      el.style.setProperty('--my', '0px');
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero" ref={ref}>
      {/* Capa decorativa con parallax */}
      <div className="hero-decor">
        <div className="hero-aurora" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-rings">
          <span className="ring ring-1" />
          <span className="ring ring-2" />
          <span className="ring ring-3" />
        </div>
        <span className="hero-sparkle s1">✦</span>
        <span className="hero-sparkle s2">✦</span>
        <span className="hero-sparkle s3">✧</span>
        <span className="hero-sparkle s4">✦</span>
      </div>

      {/* Contenido */}
      <div className="hero-content">
        <span className="hero-badge animate-fade-up">
          <span className="dot" />
          Primera sesión · Gratuita · Sin compromiso
        </span>
        <h1 className="animate-fade-up delay-1">
          <span className="hero-title-word">De sobrevivir</span>
          <br />
          <span className="hero-title-word">a vivir bien.</span>
          <span className="hero-sub">Coaching de vida · 1 a 1 · Online</span>
        </h1>
        <p className="hero-desc animate-fade-up delay-2">
          Soy <strong>Ofelia Texis</strong>, coach de vida y transformación.
          Acompaño a mujeres que se sienten atrapadas — en el agotamiento,
          el sobrepensamiento o relaciones que las drenan — a recuperar su
          claridad, su calma y su dirección.
        </p>
        <div className="hero-cta-group animate-fade-up delay-3">
          <Link className="btn-primario hero-btn" href="/contacto">
            Agenda tu primera sesión — es gratis
          </Link>
        </div>
        <div className="hero-trust animate-fade-in delay-4">
          <div className="hero-trust-item">
            <strong>+200</strong>
            <span>Mujeres acompañadas</span>
          </div>
          <span className="hero-trust-div" />
          <div className="hero-trust-item">
            <strong>+5</strong>
            <span>Años de experiencia</span>
          </div>
          <span className="hero-trust-div" />
          <div className="hero-trust-item">
            <strong>100%</strong>
            <span>Online</span>
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint animate-fade-in delay-4">
        <span>Descubre</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
