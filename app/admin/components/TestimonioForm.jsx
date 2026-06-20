'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TestimonioForm({ testimonio }) {
  const router = useRouter();
  const esEdicion = !!testimonio;

  const [form, setForm] = useState({
    texto: testimonio?.texto || '',
    nombre: testimonio?.nombre || '',
    detalle: testimonio?.detalle || '',
    estrellas: testimonio?.estrellas ?? 5,
    destacado: testimonio?.destacado || false,
    publicado: testimonio?.publicado ?? true,
  });
  const [guardando, setGuardando] = useState(false);
  const [msg, setMsg] = useState(null);

  function set(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setMsg(null);
    if (!form.texto.trim() || !form.nombre.trim()) {
      setMsg({ tipo: 'err', texto: 'El testimonio y el nombre son obligatorios.' });
      return;
    }
    setGuardando(true);
    const endpoint = esEdicion ? `/api/admin/testimonios/${testimonio.id}` : '/api/admin/testimonios';
    const method = esEdicion ? 'PUT' : 'POST';
    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setGuardando(false);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setMsg({ tipo: 'err', texto: data.error || 'No se pudo guardar.' });
      return;
    }
    router.push('/admin/testimonios');
    router.refresh();
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <div className="fg">
        <label>Testimonio</label>
        <textarea value={form.texto} onChange={(e) => set('texto', e.target.value)} placeholder="Lo que dijo tu clienta…" style={{ minHeight: 140 }} />
        <div className="ayuda">No hace falta poner comillas; se añaden solas en la web.</div>
      </div>

      <div className="fg-row">
        <div className="fg">
          <label>Nombre o rol</label>
          <input type="text" value={form.nombre} onChange={(e) => set('nombre', e.target.value)} placeholder="Directora Creativa" />
        </div>
        <div className="fg">
          <label>Detalle</label>
          <input type="text" value={form.detalle} onChange={(e) => set('detalle', e.target.value)} placeholder="Guadalajara · Programa 90 días" />
        </div>
      </div>

      <div className="fg" style={{ maxWidth: 220 }}>
        <label>Estrellas</label>
        <select value={form.estrellas} onChange={(e) => set('estrellas', Number(e.target.value))}>
          {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{'★'.repeat(n)} ({n})</option>)}
        </select>
      </div>

      <div className="fg fg-check">
        <input id="destacado" type="checkbox" checked={form.destacado} onChange={(e) => set('destacado', e.target.checked)} />
        <label htmlFor="destacado">Destacar (tarjeta grande y oscura, arriba del todo)</label>
      </div>

      <div className="fg fg-check">
        <input id="publicado" type="checkbox" checked={form.publicado} onChange={(e) => set('publicado', e.target.checked)} />
        <label htmlFor="publicado">Publicado (visible en la web)</label>
      </div>

      {msg && <div className={`form-msg ${msg.tipo}`}>{msg.texto}</div>}

      <div className="form-acciones">
        <button className="btn-admin" type="submit" disabled={guardando}>
          {guardando ? 'Guardando…' : esEdicion ? 'Guardar cambios' : 'Añadir testimonio'}
        </button>
        <button type="button" className="btn-link" onClick={() => router.push('/admin/testimonios')}>Cancelar</button>
      </div>
    </form>
  );
}
