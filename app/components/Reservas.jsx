'use client';

import { useEffect, useState } from 'react';
import { etiquetaFechaCorta } from '@/lib/reservas';

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
    text: 'Sesión gratuita con Ofelia Texis',
    dates: `${ini}/${fin}`,
    ctz: 'America/Mexico_City',
    details: `Primera sesión gratuita (30 min) para ${nombre}. Ofelia Texis · Coaching de vida y transformación.`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function Reservas({ inicial }) {
  const [dias, setDias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [fechaSel, setFechaSel] = useState(null);
  const [horaSel, setHoraSel] = useState(null);
  const [form, setForm] = useState({
    nombre: inicial?.nombre || '',
    correo: inicial?.correo || '',
    whatsapp: '',
    mensaje: '',
  });
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
  const paso = horaSel ? 3 : fechaSel ? 2 : 1;

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
        <h3>¡Listo, {exito.nombre.split(' ')[0]}! Tu sesión está agendada</h3>
        <p>
          Te espero el <strong>{exito.etiqueta}</strong> a las{' '}
          <strong>{exito.hora} h</strong> <span className="rsv-tz">(hora Ciudad de México)</span>.
        </p>
        <p className="rsv-exito-sub">
          Te contactaré para confirmar los detalles. Guárdala en tu calendario para no olvidarla:
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
        <div>
          <span className="rsv-badge">Primera sesión · 30 min · Gratis</span>
          <h3 className="rsv-titulo">Agenda tu sesión</h3>
        </div>
        <p className="rsv-tz-note">Horarios en hora de la Ciudad de México 🇲🇽</p>
      </div>

      {/* Barra de progreso */}
      {!cargando && dias.length > 0 && (
        <div className="rsv-steps" aria-hidden="true">
          <span className={`rsv-step${paso >= 1 ? ' on' : ''}`}>
            <i>1</i> Día
          </span>
          <span className="rsv-step-line" />
          <span className={`rsv-step${paso >= 2 ? ' on' : ''}`}>
            <i>2</i> Hora
          </span>
          <span className="rsv-step-line" />
          <span className={`rsv-step${paso >= 3 ? ' on' : ''}`}>
            <i>3</i> Tus datos
          </span>
        </div>
      )}

      {cargando ? (
        <div className="rsv-cargando">Cargando horarios disponibles…</div>
      ) : dias.length === 0 ? (
        <div className="rsv-cargando">
          Por ahora no hay horarios disponibles. Escríbeme por WhatsApp y lo agendamos. 🌸
        </div>
      ) : (
        <form onSubmit={reservar}>
          <div className="rsv-paso-label">
            <span className="rsv-paso-n">1</span> Elige el día
          </div>
          <div className="rsv-dias">
            {dias.map((d) => {
              const c = etiquetaFechaCorta(d.fecha);
              const activo = d.fecha === fechaSel;
              return (
                <button
                  type="button"
                  key={d.fecha}
                  className={`rsv-dia${activo ? ' activo' : ''}`}
                  onClick={() => {
                    setFechaSel(d.fecha);
                    setHoraSel(null);
                  }}
                >
                  <span className="rsv-dia-sem">{c.dia}</span>
                  <span className="rsv-dia-num">{c.num}</span>
                  <span className="rsv-dia-mes">{c.mes}</span>
                </button>
              );
            })}
          </div>

          <div className="rsv-paso-label">
            <span className="rsv-paso-n">2</span> Elige el horario
          </div>
          <div className="rsv-horas">
            {dia?.slots.map((s) => (
              <button
                type="button"
                key={s}
                className={`rsv-hora${s === horaSel ? ' activo' : ''}`}
                onClick={() => setHoraSel(s)}
              >
                {s}
                <small>{rango(s).split(' – ')[1]}</small>
              </button>
            ))}
          </div>

          {horaSel && (
            <div className="rsv-datos">
              <div className="rsv-paso-label">
                <span className="rsv-paso-n">3</span> Déjame tus datos
              </div>
              <div className="rsv-resumen">
                <span className="rsv-resumen-ico">📅</span>
                <span>
                  <strong>{dia?.etiqueta}</strong>
                  <br />
                  {rango(horaSel)} h · hora CDMX
                </span>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre*</label>
                  <input type="text" value={form.nombre} onChange={(e) => set('nombre', e.target.value)} required placeholder="¿Cómo te llamas?" />
                </div>
                <div className="form-group">
                  <label>Correo*</label>
                  <input type="email" value={form.correo} onChange={(e) => set('correo', e.target.value)} required placeholder="tucorreo@ejemplo.com" />
                </div>
              </div>
              <div className="form-group">
                <label>WhatsApp</label>
                <input type="text" value={form.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} placeholder="Para confirmarte la sesión" />
              </div>
              <div className="form-group">
                <label>¿Algo que quieras contarme? (opcional)</label>
                <textarea value={form.mensaje} onChange={(e) => set('mensaje', e.target.value)} style={{ minHeight: 80 }} placeholder="Cuéntame brevemente qué te trae aquí…" />
              </div>

              {error && <div className="form-error">{error}</div>}

              <button className="btn-primario rsv-confirmar" type="submit" disabled={enviando}>
                {enviando ? 'Agendando…' : 'Confirmar mi sesión gratuita'}
              </button>
              <p className="rsv-nota-final">Sin costo · Sin compromiso · Cancela cuando quieras</p>
            </div>
          )}

          {!horaSel && error && <div className="form-error" style={{ marginTop: 12 }}>{error}</div>}
        </form>
      )}
    </div>
  );
}
