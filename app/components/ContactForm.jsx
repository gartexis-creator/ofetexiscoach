'use client';

import { useState } from 'react';

const PROGRAMAS = [
  'Estoy en relación y quiero más calma en ella',
  'Me cuesta desconectarme del trabajo',
  'El sobrepensamiento me agota',
  'Busco claridad para una decisión importante',
  'Simplemente quiero una vida más fácil',
];

export default function ContactForm() {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    ocupacion: '',
    programa: '',
    mensaje: '',
    acepto: false,
  });
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const update = (campo) => (e) => {
    const valor = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [campo]: valor }));
  };

  async function enviarFormulario() {
    setError('');
    if (!form.nombre || !form.correo) {
      setError('Por favor completa tu nombre y correo.');
      return;
    }
    if (!form.acepto) {
      setError('Por favor acepta la política de privacidad para continuar.');
      return;
    }

    setEnviando(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'No se pudo enviar el mensaje.');
      }
      setEnviado(true);
    } catch (err) {
      setError(err.message || 'Ocurrió un error. Intenta de nuevo.');
    } finally {
      setEnviando(false);
    }
  }

  if (enviado) {
    return (
      <div className="contacto-form reveal">
        <div className="form-success">
          <div className="success-icon">✨</div>
          <h4>¡Tu mensaje llegó!</h4>
          <p>
            Gracias por dar este paso. Me pondré en contacto contigo en menos de
            24 horas para coordinar nuestra sesión. Con calma y presencia.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="contacto-form reveal">
      <h3 className="form-titulo">Cuéntame un poco</h3>
      <span className="form-sub">Sesión exploratoria gratuita</span>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="nombre">Tu nombre</label>
          <input
            type="text"
            id="nombre"
            placeholder="¿Cómo te llamas?"
            value={form.nombre}
            onChange={update('nombre')}
          />
        </div>
        <div className="form-group">
          <label htmlFor="correo">Tu correo</label>
          <input
            type="email"
            id="correo"
            placeholder="correo@ejemplo.com"
            value={form.correo}
            onChange={update('correo')}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="ocupacion">¿A qué te dedicas?</label>
        <input
          type="text"
          id="ocupacion"
          placeholder="Título o área de trabajo"
          value={form.ocupacion}
          onChange={update('ocupacion')}
        />
      </div>

      <div className="form-group">
        <label htmlFor="programa">¿Qué te trajo hasta aquí?</label>
        <select id="programa" value={form.programa} onChange={update('programa')}>
          <option value="">Selecciona una opción</option>
          {PROGRAMAS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="mensaje">¿Algo más que quieras compartir?</label>
        <textarea
          id="mensaje"
          placeholder="Cuéntame lo que necesites..."
          value={form.mensaje}
          onChange={update('mensaje')}
        />
      </div>

      <div className="form-check">
        <input
          type="checkbox"
          id="acepto"
          checked={form.acepto}
          onChange={update('acepto')}
        />
        <label htmlFor="acepto">
          He leído y acepto la política de privacidad. Entiendo que esta es una
          sesión exploratoria gratuita y sin compromiso.
        </label>
      </div>

      {error && <p className="form-error">{error}</p>}

      <button
        className="btn-primario"
        onClick={enviarFormulario}
        disabled={enviando}
        style={{ width: '100%', textAlign: 'center' }}
      >
        {enviando ? 'Enviando…' : 'Solicitar mi sesión gratuita'}
      </button>
    </div>
  );
}
