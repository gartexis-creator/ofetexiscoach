'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

function slugify(texto) {
  return (texto || '')
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function ProgramaForm({ programa }) {
  const router = useRouter();
  const esEdicion = !!programa;

  const [form, setForm] = useState({
    titulo: programa?.titulo || '',
    slug: programa?.slug || '',
    badge: programa?.badge || '',
    descripcion: programa?.descripcion || '',
    duracion: programa?.duracion || '',
    cta_texto: programa?.cta_texto || 'Quiero este programa',
    cta_estilo: programa?.cta_estilo || 'primario',
    requisito: programa?.requisito || '',
    destacado: programa?.destacado || false,
    ancho_completo: programa?.ancho_completo || false,
    publicado: programa?.publicado ?? true,
  });
  const [items, setItems] = useState(
    Array.isArray(programa?.items) && programa.items.length ? programa.items : ['']
  );
  const [guardando, setGuardando] = useState(false);
  const [msg, setMsg] = useState(null);

  function set(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }));
  }
  function setItem(i, valor) {
    setItems((arr) => arr.map((it, idx) => (idx === i ? valor : it)));
  }
  function addItem() {
    setItems((arr) => [...arr, '']);
  }
  function delItem(i) {
    setItems((arr) => arr.filter((_, idx) => idx !== i));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setMsg(null);
    if (!form.titulo.trim()) {
      setMsg({ tipo: 'err', texto: 'El título es obligatorio.' });
      return;
    }
    const slug = (form.slug || slugify(form.titulo)).trim();
    const itemsLimpios = items.map((s) => s.trim()).filter(Boolean);

    setGuardando(true);
    const endpoint = esEdicion ? `/api/admin/programas/${programa.id}` : '/api/admin/programas';
    const method = esEdicion ? 'PUT' : 'POST';
    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, slug, items: itemsLimpios }),
    });
    setGuardando(false);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setMsg({ tipo: 'err', texto: data.error || 'No se pudo guardar.' });
      return;
    }
    router.push('/admin/programas');
    router.refresh();
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <div className="fg">
        <label>Título</label>
        <textarea value={form.titulo} onChange={(e) => set('titulo', e.target.value)} placeholder="Nombre del programa" style={{ minHeight: 60 }} />
        <div className="ayuda">Puedes usar un salto de línea para partir el título en dos.</div>
      </div>

      <div className="fg-row">
        <div className="fg">
          <label>Etiqueta superior (badge)</label>
          <input type="text" value={form.badge} onChange={(e) => set('badge', e.target.value)} placeholder="✦ Programa insignia" />
        </div>
        <div className="fg">
          <label>Duración</label>
          <input type="text" value={form.duracion} onChange={(e) => set('duracion', e.target.value)} placeholder="90 días · Inicio por agenda" />
        </div>
      </div>

      <div className="fg">
        <label>Descripción</label>
        <textarea value={form.descripcion} onChange={(e) => set('descripcion', e.target.value)} placeholder="¿Para quién es y qué transformación ofrece?" style={{ minHeight: 100 }} />
      </div>

      <div className="fg items-editor">
        <label>Qué incluye (viñetas)</label>
        {items.map((it, i) => (
          <div className="item-row" key={i}>
            <input type="text" value={it} onChange={(e) => setItem(i, e.target.value)} placeholder={`Punto ${i + 1}`} />
            <button type="button" className="btn-admin peligro peque" onClick={() => delItem(i)}>✕</button>
          </div>
        ))}
        <button type="button" className="btn-admin ghost peque" onClick={addItem} style={{ marginTop: 4 }}>+ Añadir punto</button>
      </div>

      <div className="fg-row">
        <div className="fg">
          <label>Texto del botón</label>
          <input type="text" value={form.cta_texto} onChange={(e) => set('cta_texto', e.target.value)} placeholder="Quiero este programa" />
        </div>
        <div className="fg">
          <label>Estilo del botón</label>
          <select value={form.cta_estilo} onChange={(e) => set('cta_estilo', e.target.value)}>
            <option value="primario">Relleno (rosa)</option>
            <option value="dorado">Relleno (dorado)</option>
            <option value="secundario">Contorno</option>
          </select>
        </div>
      </div>

      <div className="fg">
        <label>Caja de requisito (opcional)</label>
        <input type="text" value={form.requisito} onChange={(e) => set('requisito', e.target.value)} placeholder="Haber completado el programa de 90 días…" />
        <div className="ayuda">Si lo rellenas, aparece una cajita de “Requisito” en la tarjeta.</div>
      </div>

      <div className="fg fg-check">
        <input id="destacado" type="checkbox" checked={form.destacado} onChange={(e) => set('destacado', e.target.checked)} />
        <label htmlFor="destacado">Tarjeta destacada (fondo oscuro elegante)</label>
      </div>
      <div className="fg fg-check">
        <input id="ancho_completo" type="checkbox" checked={form.ancho_completo} onChange={(e) => set('ancho_completo', e.target.checked)} />
        <label htmlFor="ancho_completo">Ocupar todo el ancho (fila completa)</label>
      </div>
      <div className="fg fg-check">
        <input id="publicado" type="checkbox" checked={form.publicado} onChange={(e) => set('publicado', e.target.checked)} />
        <label htmlFor="publicado">Publicado (visible en la web)</label>
      </div>

      {msg && <div className={`form-msg ${msg.tipo}`}>{msg.texto}</div>}

      <div className="form-acciones">
        <button className="btn-admin" type="submit" disabled={guardando}>
          {guardando ? 'Guardando…' : esEdicion ? 'Guardar cambios' : 'Crear programa'}
        </button>
        <button type="button" className="btn-link" onClick={() => router.push('/admin/programas')}>Cancelar</button>
      </div>
    </form>
  );
}
