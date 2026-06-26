'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ConfirmarReserva({ id, estado }) {
  const router = useRouter();
  const [cargando, setCargando] = useState(false);
  const confirmada = estado === 'confirmada';

  async function cambiar() {
    setCargando(true);
    const res = await fetch(`/api/admin/reservas/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: confirmada ? 'pendiente' : 'confirmada' }),
    });
    setCargando(false);
    if (res.ok) router.refresh();
  }

  return (
    <button
      className={`btn-admin peque${confirmada ? ' ghost' : ''}`}
      onClick={cambiar}
      disabled={cargando}
      type="button"
    >
      {cargando ? '…' : confirmada ? 'Marcar por confirmar' : 'Confirmar'}
    </button>
  );
}
