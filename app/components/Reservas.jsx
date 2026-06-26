'use client';

import { useEffect, useState } from 'react';

function rango(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const fin = h * 60 + m + 30;
  return `${hhmm} – ${String(Math.floor(fin / 60)).padStart(2, '0')}:${String(fin % 60).padStart(2, '0')}`;
}

function googleCalUrl({ fecha, hora, nombre }) {
  const ini = `${fecha.replace(/-/g, '')}T${hora.replace(':', '')}00`;
  const [h, m] = hora.split(':').map(Number);
  const finMin = h * 60 + m + 30;
  const fin = `${fecha.replace(/-/g, '')}T${String(Math.floor(finMin / 60)).padStart(2, '0')}${String(finMin % 60).padStart(2, '0')}00`;
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'Sesión de Claridad con Ofelia Texis',
    dates: `${ini}/${fin}`,
    ctz: 'America/Mexico_City',
    details: `Sesión de Claridad gratuita (30 min) para ${nombre}. Ofelia Texis · Soberanía Relacional.`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function Reservas() {
  const [dias, setDias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [fechaSel, setFechaSel] = useState(null);
  const [horaSel, setHoraSel] = useState(null);
  const [form, setForm] = useState({ nombre: '', correo: '', whatsapp: '', mensaje: '' });
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');
  const [exito, setExito] = useState(null);

  async function cargar() {
    setCargando(true);
    try {
      const res = await fetch('/api/reservar');
      const data = await res.json();
      setDias(data.dias || []);
      if (data.dias?.length && !fechaSel) setFechaSel(data.dias[0].fecha);
    } catch {
      setDias([]);
    }
    setCargando(false);
  }

  useEffect(() => {
    cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dia = dias.find((d) => d.fecha === fechaSel) || null;

  function set(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }));
  }

  async function reservar(e) {
    e.preventDefault();
    setError('');
    if (!horaSel) {
      setError('Elige un horario.');
      return;
    }
    setEnviando(true);
    const res = await fetch('/api/reservar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, fecha: fechaSel, hora: horaSel }),
    });
    const data = await res.json().catch(() => ({}));
    setEnviando(false);
    if (!res.ok) {
      setError(data.error || 'No se pudo reservar. Intenta de nuevo.');
      if (res.status === 409) {
        setHoraSel(null);
        cargar();
      }
      return;
    }
    setExito({ fecha: fechaSel, hora: horaSel, etiqueta: dia?.etiqueta || '', nombre: form.nombre });
  }

  if (exito) {
    return (
      <div className="rsv-exito">
        <div className="rsv-exito-icon">✓</div>
        <h3>¡Tu sesión está reservada!</h3>
        <p>
          Te esperamos el <strong>{exito.etiqueta}</strong> a las{' '}
          <strong>{exito.hora} h</strong> <span className="rsv-tz">(hora Ciudad de México)</span>.
        </p>
        <p className="rsv-exito-sub">
          Ofelia se pondrá en contacto contigo para confirmar los detalles. Mientras tanto,
          guárdala en tu calendario:
        </p>
        <a
          className="btn-primario"
          href={googleCalUrl(exito)}
          target="_blank"
          rel="noopener noreferrer"
          style={{ padding: '14px 34px', fontSize: '.74rem' }}
        >
          Añadir a Google Calendar
        </a>
      </div>
    );
  }

  return (
    <div className="rsv">
      <div className="rsv-head">
        <span className="rsv-badge">30 min · gratis</span>
        <p className="rsv-tz-note">Horarios en hora de la Ciudad de México 🇲🇽</p>
      </div>

      {cargando ? (
        <div className="rsv-cargando">Cargando horarios disponibles…</div>
      ) : dias.length === 0 ? (
        <div className="rsv-cargando">
          Por ahora no hay horarios disponibles. Escríbeme por el formulario y lo agendamos. 🌸
        </div>
      ) : (
        <form onSubmit={reservar}>
          <div className="rsv-paso-label">1 · Elige el día</div>
          <div className="rsv-dias">
            {dias.map((d) => {
              const c = d.etiqueta.split(', ');
              return (
                <button
                  type="button"
                  key={d.fecha}
                  className={`rsv-dia${d.fecha === fechaSel ? ' activo' : ''}`}
                  onClick={() => {
                    setFechaSel(d.fecha);
                    setHoraSel(null);
                  }}
                >
                  <span className="rsv-dia-sem">{c[0]}</span>
                  <span className="rsv-dia-num">{c[1]}</span>
                </button>
              );
            })}
          </div>

          <div className="rsv-paso-label">2 · Elige el horario</div>
          <div className="rsv-horas">
            {dia?.slots.map((s) => (
              <button
                type="button"
                key={s}
                className={`rsv-hora${s === horaSel ? ' activo' : ''}`}
                onClick={() => setHoraSel(s)}
              >
                {rango(s)}
              </button>
            ))}
          </div>

          {horaSel && (
            <div className="rsv-datos">
              <div className="rsv-paso-label">3 · Tus datos</div>
              <div className="rsv-resumen">
                Reservas: <strong>{dia?.etiqueta}</strong> · <strong>{rango(horaSel)} h</strong>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre</label>
                  <input type="text" value={form.nombre} onChange={(e) => set('nombre', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Correo</label>
                  <input type="email" value={form.correo} onChange={(e) => set('correo', e.target.value)} required />
                </div>
              </div>
              <div className="form-group">
                <label>WhatsApp (opcional)</label>
                <input type="text" value={form.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} placeholder="Para confirmarte la sesión" />
              </div>
              <div className="form-group">
                <label>¿Algo que quieras contarme? (opcional)</label>
                <textarea value={form.mensaje} onChange={(e) => set('mensaje', e.target.value)} style={{ minHeight: 80 }} />
              </div>

              {error && <div className="form-error">{error}</div>}

              <button className="btn-primario" type="submit" disabled={enviando} style={{ width: '100%', padding: '18px' }}>
                {enviando ? 'Reservando…' : 'Reservar mi sesión gratis'}
              </button>
            </div>
          )}

          {!horaSel && error && <div className="form-error" style={{ marginTop: 12 }}>{error}</div>}
        </form>
      )}
    </div>
  );
}
