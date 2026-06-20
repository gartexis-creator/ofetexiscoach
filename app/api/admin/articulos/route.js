import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import { getSupabaseServer } from '@/lib/supabaseServer';

function limpiar(body) {
  return {
    titulo: (body.titulo || '').trim(),
    slug: (body.slug || '').trim(),
    categoria: body.categoria?.trim() || null,
    extracto: body.extracto?.trim() || null,
    contenido: body.contenido || null,
    emoji: body.emoji?.trim() || '🌸',
    color_bg: body.color_bg || 'bg-1',
    tiempo_lectura: body.tiempo_lectura?.trim() || null,
    imagen_url: body.imagen_url?.trim() || null,
    destacado: Boolean(body.destacado),
    publicado: Boolean(body.publicado),
  };
}

export async function POST(request) {
  const { error: authError } = await requireUser();
  if (authError) return authError;

  const supabase = getSupabaseServer();
  if (!supabase) return NextResponse.json({ error: 'Supabase no configurado.' }, { status: 500 });

  const body = await request.json().catch(() => ({}));
  const datos = limpiar(body);

  if (!datos.titulo || !datos.slug) {
    return NextResponse.json({ error: 'El título es obligatorio.' }, { status: 400 });
  }

  datos.publicado_en = datos.publicado ? new Date().toISOString() : null;

  const { data, error } = await supabase.from('articulos').insert(datos).select().single();

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Ya existe un artículo con ese enlace (slug). Cámbialo.' }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, articulo: data });
}
