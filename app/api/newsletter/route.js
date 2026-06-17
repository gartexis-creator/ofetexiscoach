import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseServer';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Datos inválidos.' }, { status: 400 });
  }

  const { correo } = body || {};

  if (!correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    return NextResponse.json(
      { error: 'Escribe un correo electrónico válido.' },
      { status: 400 }
    );
  }

  const supabase = getSupabaseServer();

  if (!supabase) {
    console.warn(
      '[newsletter] Supabase no configurado. Suscripción recibida pero NO guardada:',
      correo
    );
    return NextResponse.json({ ok: true, stored: false });
  }

  const { error } = await supabase
    .from('suscriptores')
    .insert({ correo })
    .select();

  // El correo ya existe (restricción unique): lo tratamos como éxito.
  if (error && error.code !== '23505') {
    console.error('[newsletter] Error guardando en Supabase:', error.message);
    return NextResponse.json(
      { error: 'No se pudo completar la suscripción. Intenta más tarde.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, stored: true });
}
