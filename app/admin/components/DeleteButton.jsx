'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Botón reutilizable para eliminar un recurso vía la API del panel.
// endpoint: p.ej. "/api/admin/articulos/123"
export default function DeleteButton({ endpoint, label = 'Eliminar', confirmar }) {
  const router = useRouter();
  const [cargando, setCargando] = useState(false);

  async function eliminar() {
    if (!window.confirm(confirmar || '¿Seguro que quieres eliminar esto? No se puede deshacer.')) {
      return;
    }
    setCargando(true);
    const res = await fetch(endpoint, { method: 'DELETE' });
    setCargando(false);
    if (!res.ok) {
      alert('No se pudo eliminar. Intenta de nuevo.');
      return;
    }
    router.refresh();
  }

  return (
    <button className="btn-admin peligro peque" onClick={eliminar} disabled={cargando} type="button">
      {cargando ? '…' : label}
    </button>
  );
}
