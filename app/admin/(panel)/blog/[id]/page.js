import { notFound } from 'next/navigation';
import { getSupabaseServer } from '@/lib/supabaseServer';
import ArticuloForm from '../../../components/ArticuloForm';

export const dynamic = 'force-dynamic';

export default async function EditarArticuloPage({ params }) {
  const supabase = getSupabaseServer();
  if (!supabase) notFound();

  const { data: articulo } = await supabase
    .from('articulos')
    .select('*')
    .eq('id', params.id)
    .maybeSingle();

  if (!articulo) notFound();

  return (
    <>
      <header className="admin-header">
        <div>
          <div className="admin-eyebrow">Blog</div>
          <h1>Editar artículo</h1>
        </div>
        <a className="btn-admin ghost" href={`/blog/${articulo.slug}`} target="_blank" rel="noopener noreferrer">↗ Ver en la web</a>
      </header>
      <ArticuloForm articulo={articulo} />
    </>
  );
}
