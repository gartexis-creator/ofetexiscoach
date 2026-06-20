import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import { getSupabaseServer } from '@/lib/supabaseServer';

const ESTILOS = ['primario', 'secundario', 'dorado'];

function limpiar(body) {
  return {
    titulo: (body.titulo || '').trim(),
    slug: (body.slug || '').trim(),
    badge: body.badge?.trim() || null,
    descripcion: body.descripcion?.trim() || null,
    items: Array.isArray(body.items) ? body.items.map((s) => String(s).trim()).filter(Boolean) : [],
    duracion: body.duracion?.trim() || null,
    cta_texto: body.cta_texto?.trim() || 'Quiero este programa',
    cta_estilo: ESTILOS.includes(body.cta_estilo) ? body.cta_estilo : 'primario',
    requisito: body.requisito?.trim() || null,
    destacado: Boolean(body.destacado),
    ancho_completo: Boolean(body.ancho_completo),
    publicado: Boolean(body.publicado),
  };
}

export async function POST(request) {
  const { error: authError } = await requireUser();
  if (authError) return authError;

  const supabase = getSupabaseServer();
  if (!supabase) return NextResponse.json({ error: 'Supabase no configurado.' }, { status: 500 });

  const datos = limpiar(await request.json().catch(() => ({})));
  if (!datos.titulo || !datos.slug) {
    return NextResponse.json({ error: 'El título es obligatorio.' }, { status: 400 });
  }

  const { data, error } = await supabase.from('programas').insert(datos).select().single();
  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Ya existe un programa con ese enlace (slug). Cámbialo.' }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, programa: data });
}
