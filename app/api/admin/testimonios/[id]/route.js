import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import { getSupabaseServer } from '@/lib/supabaseServer';

function limpiar(body) {
  let estrellas = Number(body.estrellas);
  if (!Number.isFinite(estrellas) || estrellas < 1 || estrellas > 5) estrellas = 5;
  return {
    texto: (body.texto || '').trim(),
    nombre: (body.nombre || '').trim(),
    detalle: body.detalle?.trim() || null,
    estrellas,
    destacado: Boolean(body.destacado),
    publicado: Boolean(body.publicado),
  };
}

export async function PUT(request, { params }) {
  const { error: authError } = await requireUser();
  if (authError) return authError;

  const supabase = getSupabaseServer();
  if (!supabase) return NextResponse.json({ error: 'Supabase no configurado.' }, { status: 500 });

  const datos = limpiar(await request.json().catch(() => ({})));
  if (!datos.texto || !datos.nombre) {
    return NextResponse.json({ error: 'El testimonio y el nombre son obligatorios.' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('testimonios')
    .update(datos)
    .eq('id', params.id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, testimonio: data });
}

export async function DELETE(request, { params }) {
  const { error: authError } = await requireUser();
  if (authError) return authError;

  const supabase = getSupabaseServer();
  if (!supabase) return NextResponse.json({ error: 'Supabase no configurado.' }, { status: 500 });

  const { error } = await supabase.from('testimonios').delete().eq('id', params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
