import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import { getSupabaseServer } from '@/lib/supabaseServer';

export async function DELETE(request, { params }) {
  const { error: authError } = await requireUser();
  if (authError) return authError;

  const supabase = getSupabaseServer();
  if (!supabase) return NextResponse.json({ error: 'Supabase no configurado.' }, { status: 500 });

  const { error } = await supabase.from('suscriptores').delete().eq('id', params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
