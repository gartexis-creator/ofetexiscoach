import { notFound } from 'next/navigation';
import { getSupabaseServer } from '@/lib/supabaseServer';
import TestimonioForm from '../../../components/TestimonioForm';

export const dynamic = 'force-dynamic';

export default async function EditarTestimonioPage({ params }) {
  const supabase = getSupabaseServer();
  if (!supabase) notFound();

  const { data: testimonio } = await supabase
    .from('testimonios')
    .select('*')
    .eq('id', params.id)
    .maybeSingle();

  if (!testimonio) notFound();

  return (
    <>
      <header className="admin-header">
        <div>
          <div className="admin-eyebrow">Testimonios</div>
          <h1>Editar testimonio</h1>
        </div>
      </header>
      <TestimonioForm testimonio={testimonio} />
    </>
  );
}
