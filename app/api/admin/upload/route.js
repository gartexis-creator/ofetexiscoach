import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import { getSupabaseServer } from '@/lib/supabaseServer';

const BUCKET = 'imagenes';
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(request) {
  const { error: authError } = await requireUser();
  if (authError) return authError;

  const supabase = getSupabaseServer();
  if (!supabase) return NextResponse.json({ error: 'Supabase no configurado.' }, { status: 500 });

  const formData = await request.formData().catch(() => null);
  const file = formData?.get('file');

  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No se recibió ninguna imagen.' }, { status: 400 });
  }
  if (!file.type?.startsWith('image/')) {
    return NextResponse.json({ error: 'El archivo debe ser una imagen.' }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'La imagen supera el límite de 5 MB.' }, { status: 400 });
  }

  const ext = (file.name?.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
  const nombre = `articulos/${Date.now()}-${Math.round(Math.random() * 1e6)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(nombre, buffer, { contentType: file.type, upsert: false });

  if (error) {
    const falta = /bucket|not found/i.test(error.message);
    return NextResponse.json(
      { error: falta ? 'Falta crear el bucket "imagenes" en Supabase (ejecuta schema.sql).' : error.message },
      { status: 500 }
    );
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(nombre);
  return NextResponse.json({ ok: true, url: data.publicUrl });
}
