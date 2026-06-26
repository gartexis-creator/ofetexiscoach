import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseServer';
import { enviarAviso, htmlContacto } from '@/lib/email';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Datos inválidos.' }, { status: 400 });
  }

  const { nombre, correo, ocupacion, programa, mensaje, acepto } = body || {};

  if (!nombre || !correo) {
    return NextResponse.json(
      { error: 'El nombre y el correo son obligatorios.' },
      { status: 400 }
    );
  }

  const supabase = getSupabaseServer();

  // Si Supabase no está configurado todavía, no rompemos la experiencia:
  // confirmamos al usuario y dejamos aviso en el log del servidor.
  if (!supabase) {
    console.warn(
      '[contacto] Supabase no configurado. Mensaje recibido pero NO guardado:',
      { nombre, correo }
    );
    return NextResponse.json({ ok: true, stored: false });
  }

  const { error } = await supabase.from('contactos').insert({
    nombre,
    correo,
    ocupacion: ocupacion || null,
    programa: programa || null,
    mensaje: mensaje || null,
    acepto: Boolean(acepto),
  });

  if (error) {
    console.error('[contacto] Error guardando en Supabase:', error.message);
    return NextResponse.json(
      { error: 'No se pudo guardar tu mensaje. Intenta más tarde.' },
      { status: 500 }
    );
  }

  // Aviso por correo (si está configurado RESEND_API_KEY). No bloquea la respuesta.
  await enviarAviso({
    asunto: `Nuevo mensaje de ${nombre}`,
    html: htmlContacto({ nombre, correo, ocupacion, programa, mensaje }),
    responderA: correo,
  }).catch(() => {});

  return NextResponse.json({ ok: true, stored: true });
}
