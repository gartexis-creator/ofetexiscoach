'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ToggleLeido({ id, leido }) {
  const router = useRouter();
  const [cargando, setCargando] = useState(false);

  async function cambiar() {
    setCargando(true);
    const res = await fetch(`/api/admin/contactos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leido: !leido }),
    });
    setCargando(false);
    if (res.ok) router.refresh();
  }

  return (
    <button className="btn-admin ghost peque" onClick={cambiar} disabled={cargando} type="button">
      {cargando ? '…' : leido ? 'Marcar como no leído' : 'Marcar como leído'}
    </button>
  );
}
