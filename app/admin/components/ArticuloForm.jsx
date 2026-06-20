'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const COLORES = [
  { v: 'bg-1', n: 'Rosa' },
  { v: 'bg-2', n: 'Arena' },
  { v: 'bg-3', n: 'Lavanda' },
  { v: 'bg-4', n: 'Terracota' },
  { v: 'bg-5', n: 'Verde' },
  { v: 'bg-6', n: 'Oliva' },
];

function slugify(texto) {
  return (texto || '')
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // quita acentos
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function ArticuloForm({ articulo }) {
  const router = useRouter();
  const esEdicion = !!articulo;

  const [form, setForm] = useState({
    titulo: articulo?.titulo || '',
    slug: articulo?.slug || '',
    categoria: articulo?.categoria || 'Reflexiones',
    extracto: articulo?.extracto || '',
    contenido: articulo?.contenido || '',
    emoji: articulo?.emoji || '🌸',
    color_bg: articulo?.color_bg || 'bg-1',
    tiempo_lectura: articulo?.tiempo_lectura || '5 min',
    imagen_url: articulo?.imagen_url || '',
    destacado: articulo?.destacado || false,
    publicado: articulo?.publicado ?? true,
  });
  const [slugEditado, setSlugEditado] = useState(esEdicion);
  const [subiendo, setSubiendo] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [msg, setMsg] = useState(null);

  function set(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }));
  }

  function onTitulo(valor) {
    set('titulo', valor);
    if (!slugEditado) set('slug', slugify(valor));
  }

  async function subirImagen(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setSubiendo(true);
    setMsg(null);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    setSubiendo(false);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setMsg({ tipo: 'err', texto: data.error || 'No se pudo subir la imagen.' });
      return;
    }
    set('imagen_url', data.url);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setMsg(null);

    if (!form.titulo.trim()) {
      setMsg({ tipo: 'err', texto: 'El título es obligatorio.' });
      return;
    }
    const slug = (form.slug || slugify(form.titulo)).trim();

    setGuardando(true);
    const endpoint = esEdicion ? `/api/admin/articulos/${articulo.id}` : '/api/admin/articulos';
    const method = esEdicion ? 'PUT' : 'POST';
    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, slug }),
    });
    setGuardando(false);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setMsg({ tipo: 'err', texto: data.error || 'No se pudo guardar.' });
      return;
    }
    router.push('/admin/blog');
    router.refresh();
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <div className="fg">
        <label>Título</label>
        <input type="text" value={form.titulo} onChange={(e) => onTitulo(e.target.value)} placeholder="Título del artículo" />
      </div>

      <div className="fg">
        <label>Enlace (slug)</label>
        <input
          type="text"
          value={form.slug}
          onChange={(e) => { setSlugEditado(true); set('slug', slugify(e.target.value)); }}
          placeholder="mi-articulo"
        />
        <div className="ayuda">Dirección del artículo: /blog/{form.slug || 'mi-articulo'}</div>
      </div>

      <div className="fg-row">
        <div className="fg">
          <label>Categoría</label>
          <input type="text" value={form.categoria} onChange={(e) => set('categoria', e.target.value)} placeholder="Relaciones, Mente…" />
        </div>
        <div className="fg">
          <label>Tiempo de lectura</label>
          <input type="text" value={form.tiempo_lectura} onChange={(e) => set('tiempo_lectura', e.target.value)} placeholder="6 min" />
        </div>
      </div>

      <div className="fg">
        <label>Extracto (resumen corto)</label>
        <textarea value={form.extracto} onChange={(e) => set('extracto', e.target.value)} placeholder="Una o dos frases que invitan a leer…" style={{ minHeight: 80 }} />
      </div>

      <div className="fg">
        <label>Contenido del artículo</label>
        <textarea value={form.contenido} onChange={(e) => set('contenido', e.target.value)} placeholder="Escribe aquí tu artículo. Deja una línea en blanco entre párrafos." style={{ minHeight: 280 }} />
        <div className="ayuda">Separa los párrafos dejando una línea en blanco entre ellos.</div>
      </div>

      <div className="fg">
        <label>Imagen de portada (opcional)</label>
        <input type="file" accept="image/*" onChange={subirImagen} />
        {subiendo && <div className="ayuda">Subiendo imagen…</div>}
        {form.imagen_url && (
          <div className="img-preview">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={form.imagen_url} alt="Portada" />
            <button type="button" className="btn-link" style={{ marginTop: 8 }} onClick={() => set('imagen_url', '')}>Quitar imagen</button>
          </div>
        )}
        <div className="ayuda">Si no subes imagen, se usa el emoji y el color de fondo de abajo.</div>
      </div>

      <div className="fg-row">
        <div className="fg">
          <label>Emoji (si no hay imagen)</label>
          <input type="text" value={form.emoji} onChange={(e) => set('emoji', e.target.value)} placeholder="🌸" maxLength={4} />
        </div>
        <div className="fg">
          <label>Color de fondo (si no hay imagen)</label>
          <select value={form.color_bg} onChange={(e) => set('color_bg', e.target.value)}>
            {COLORES.map((c) => <option key={c.v} value={c.v}>{c.n}</option>)}
          </select>
        </div>
      </div>

      <div className="fg fg-check">
        <input id="destacado" type="checkbox" checked={form.destacado} onChange={(e) => set('destacado', e.target.checked)} />
        <label htmlFor="destacado">Marcar como artículo destacado (aparece grande arriba del blog)</label>
      </div>

      <div className="fg fg-check">
        <input id="publicado" type="checkbox" checked={form.publicado} onChange={(e) => set('publicado', e.target.checked)} />
        <label htmlFor="publicado">Publicado (visible en la web). Desmárcalo para guardarlo como borrador.</label>
      </div>

      {msg && <div className={`form-msg ${msg.tipo}`}>{msg.texto}</div>}

      <div className="form-acciones">
        <button className="btn-admin" type="submit" disabled={guardando || subiendo}>
          {guardando ? 'Guardando…' : esEdicion ? 'Guardar cambios' : 'Publicar artículo'}
        </button>
        <button type="button" className="btn-link" onClick={() => router.push('/admin/blog')}>Cancelar</button>
      </div>
    </form>
  );
}
