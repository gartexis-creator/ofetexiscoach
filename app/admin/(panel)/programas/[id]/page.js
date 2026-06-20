import { notFound } from 'next/navigation';
import { getSupabaseServer } from '@/lib/supabaseServer';
import ProgramaForm from '../../../components/ProgramaForm';

export const dynamic = 'force-dynamic';

export default async function EditarProgramaPage({ params }) {
  const supabase = getSupabaseServer();
  if (!supabase) notFound();

  const { data: programa } = await supabase
    .from('programas')
    .select('*')
    .eq('id', params.id)
    .maybeSingle();

  if (!programa) notFound();

  return (
    <>
      <header className="admin-header">
        <div>
          <div className="admin-eyebrow">Programas</div>
          <h1>Editar programa</h1>
        </div>
        <a className="btn-admin ghost" href="/servicios" target="_blank" rel="noopener noreferrer">↗ Ver en la web</a>
      </header>
      <ProgramaForm programa={programa} />
    </>
  );
}
