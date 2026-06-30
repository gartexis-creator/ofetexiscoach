'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

const RETRATO =
  'https://bizgyycqbwyczqcavmrp.supabase.co/storage/v1/object/public/imagenes/ofelia/ofelia-principal.jpg';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '525572473984';
const WA_MENSAJE =
  'Hola Ofelia, vengo de tu página web y quiero información sobre tu coaching. 🌸';

export default function Hero() {
  const ref = useRef(null);

  // Parallax muy sutil: la capa de fondo sigue ligeramente al cursor.
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
        el.style.setProperty('--mx', `${(x * 20).toFixed(2)}px`);
        el.style.setProperty('--my', `${(y * 20).toFixed(2)}px`);
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

  const waHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WA_MENSAJE)}`;

  return (
    <section className="hero hero-split" ref={ref}>
      {/* Fondo decorativo (atenuado) */}
      <div className="hero-decor">
        <div className="hero-aurora" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
      </div>

      <div className="hero-inner">
        {/* Columna de texto */}
        <div className="hero-content">
          <span className="hero-badge animate-fade-up">
            <span className="dot" />
            Primera sesión gratuita · Online
          </span>

          <h1 className="animate-fade-up delay-1">
            <span className="hero-title-word">Coaching de vida</span>
            <span className="hero-h1-sub">para tu transformación, 1 a 1.</span>
          </h1>

          <p className="hero-desc animate-fade-up delay-2">
            Soy <strong>Ofelia Texis</strong>, coach certificada. Acompaño a
            mujeres a salir del agotamiento, la ansiedad y el sobrepensamiento
            con sesiones personales, online y diseñadas a tu medida.
          </p>

          <div className="hero-cta-group animate-fade-up delay-3">
            <Link className="btn-primario hero-btn" href="/contacto">
              Agenda tu sesión gratis
            </Link>
            <a
              className="hero-link"
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Hablar por WhatsApp <span aria-hidden="true">→</span>
            </a>
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
              <span>Sesiones online</span>
            </div>
          </div>
        </div>

        {/* Columna de foto */}
        <div className="hero-foto animate-fade-up delay-2">
          <div className="hero-foto-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={RETRATO} alt="Ofelia Texis, coach de vida y transformación" />
          </div>
          <div className="hero-foto-chip">
            <span className="hero-foto-chip-stars">★★★★★</span>
            <span className="hero-foto-chip-text">
              <strong>Coach certificada</strong>
              <span>en Transformación y Bienestar</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
