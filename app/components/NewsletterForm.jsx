'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function suscribir() {
    if (!correo) {
      setMensaje('Escribe tu correo electrónico.');
      return;
    }
    setEnviando(true);
    setMensaje('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'No se pudo completar la suscripción.');
      }
      setCorreo('');
      setMensaje('¡Gracias! Pronto recibirás noticias.');
    } catch (err) {
      setMensaje(err.message || 'Ocurrió un error. Intenta de nuevo.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <>
      <div className="newsletter-form">
        <input
          type="email"
          placeholder="Tu correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && suscribir()}
        />
        <button onClick={suscribir} disabled={enviando}>
          {enviando ? 'Enviando…' : 'Suscribirme'}
        </button>
      </div>
      {mensaje && <p className="newsletter-msg">{mensaje}</p>}
    </>
  );
}
