'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

// Refresca la lista de citas automáticamente cada cierto tiempo
// (router.refresh re-ejecuta el Server Component sin recargar la página),
// para que las nuevas reservas aparezcan casi en tiempo real.
export default function ReservasLive({ intervalo = 25000 }) {
  const router = useRouter();
  const [pendiente, iniciar] = useTransition();
  const [hora, setHora] = useState('');

  function sello() {
    setHora(
      new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
    );
  }

  function refrescar() {
    iniciar(() => router.refresh());
    sello();
  }

  useEffect(() => {
    sello();
    const id = setInterval(() => {
      iniciar(() => router.refresh());
      sello();
    }, intervalo);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="rsv-live">
      <span className={`rsv-live-dot${pendiente ? ' busy' : ''}`} />
      <span>{pendiente ? 'Actualizando…' : `En vivo · ${hora}`}</span>
      <button
        type="button"
        className="btn-admin peque ghost"
        onClick={refrescar}
        disabled={pendiente}
      >
        Actualizar
      </button>
    </div>
  );
}
