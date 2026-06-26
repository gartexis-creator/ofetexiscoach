// ============================================================
//  Avisos por correo (a Ofelia) usando Resend.
//  Se activa solo si está la variable RESEND_API_KEY.
//  Si no está, no se rompe nada: simplemente no envía el aviso
//  (los datos siempre quedan guardados en el panel).
// ============================================================

const DESTINO = process.env.NOTIFY_EMAIL || 'soberaniarelacional@gmail.com';
// Sin dominio verificado en Resend, el remitente debe ser onboarding@resend.dev
const REMITENTE = process.env.NOTIFY_FROM || 'Soberanía Relacional <onboarding@resend.dev>';

export async function enviarAviso({ asunto, html, responderA }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, skipped: true };

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: REMITENTE,
        to: [DESTINO],
        subject: asunto,
        html,
        ...(responderA ? { reply_to: responderA } : {}),
      }),
    });
    if (!res.ok) {
      console.error('[email] Resend respondió', res.status, await res.text().catch(() => ''));
      return { ok: false };
    }
    return { ok: true };
  } catch (e) {
    console.error('[email] Error al enviar:', e.message);
    return { ok: false };
  }
}

function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function fila(etiqueta, valor) {
  if (!valor) return '';
  return `<tr><td style="padding:6px 0;color:#7A6165;font-size:13px;width:140px;vertical-align:top">${etiqueta}</td><td style="padding:6px 0;color:#3D2B2E;font-size:14px">${esc(valor)}</td></tr>`;
}

function plantilla(titulo, filas, nota) {
  return `<div style="font-family:Arial,sans-serif;max-width:540px;margin:auto;border:1px solid #eadfe0;border-radius:16px;overflow:hidden">
    <div style="background:linear-gradient(135deg,#C9878A,#7D4E57);padding:22px 28px">
      <div style="color:#fff;font-size:18px;font-weight:bold">${titulo}</div>
      <div style="color:#FDE9EA;font-size:12px;margin-top:4px">Soberanía Relacional · Ofelia Texis</div>
    </div>
    <div style="padding:24px 28px;background:#fff">
      <table style="width:100%;border-collapse:collapse">${filas}</table>
      ${nota ? `<p style="margin:18px 0 0;color:#7A6165;font-size:13px">${nota}</p>` : ''}
    </div>
  </div>`;
}

export function htmlContacto(c) {
  const filas = fila('Nombre', c.nombre) + fila('Correo', c.correo) + fila('Ocupación', c.ocupacion) +
    fila('Interés', c.programa) + fila('Mensaje', c.mensaje);
  return plantilla('📩 Nuevo mensaje de contacto', filas, 'Puedes responder directo a este correo para contactar a la persona.');
}

export function htmlReserva(r, etiquetaFecha, rangoHora) {
  const filas = fila('Sesión', `${etiquetaFecha} · ${rangoHora} h (CDMX)`) + fila('Nombre', r.nombre) +
    fila('Correo', r.correo) + fila('WhatsApp', r.whatsapp) + fila('Mensaje', r.mensaje);
  return plantilla('📅 Nueva Sesión de Claridad reservada', filas, 'Confírmala o gestiónala desde tu panel: ofeliatexis.com/admin');
}
