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

export async function PUT(request, { params }) {
  const { error: authError } = await requireUser();
  if (authError) return authError;

  const supabase = getSupabaseServer();
  if (!supabase) return NextResponse.json({ error: 'Supabase no configurado.' }, { status: 500 });

  const body = await request.json().catch(() => ({}));
  const datos = limpiar(body);

  if (!datos.titulo || !datos.slug) {
    return NextResponse.json({ error: 'El título es obligatorio.' }, { status: 400 });
  }

  datos.actualizado_en = new Date().toISOString();

  // Si se publica y no tenía fecha de publicación, la fijamos.
  const { data: actual } = await supabase
    .from('articulos')
    .select('publicado_en')
    .eq('id', params.id)
    .maybeSingle();
  if (datos.publicado && !actual?.publicado_en) {
    datos.publicado_en = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from('articulos')
    .update(datos)
    .eq('id', params.id)
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Ya existe un artículo con ese enlace (slug). Cámbialo.' }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, articulo: data });
}

export async function DELETE(request, { params }) {
  const { error: authError } = await requireUser();
  if (authError) return authError;

  const supabase = getSupabaseServer();
  if (!supabase) return NextResponse.json({ error: 'Supabase no configurado.' }, { status: 500 });

  const { error } = await supabase.from('articulos').delete().eq('id', params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
