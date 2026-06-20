import Link from 'next/link';
import { getSupabaseServer } from '@/lib/supabaseServer';
import DeleteButton from '../../components/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function TestimoniosAdminPage() {
  const supabase = getSupabaseServer();

  let testimonios = [];
  if (supabase) {
    const { data } = await supabase
      .from('testimonios')
      .select('*')
      .order('destacado', { ascending: false })
      .order('orden', { ascending: false })
      .order('creado_en', { ascending: false });
    testimonios = data || [];
  }

  return (
    <>
      <header className="admin-header">
        <div>
          <div className="admin-eyebrow">Voces de tus clientas</div>
          <h1>Testimonios</h1>
          <p>{testimonios.length} {testimonios.length === 1 ? 'testimonio' : 'testimonios'}.</p>
        </div>
        <Link className="btn-admin" href="/admin/testimonios/nuevo">★ Añadir testimonio</Link>
      </header>

      {testimonios.length === 0 ? (
        <div className="tabla-wrap">
          <div className="vacio">
            <span className="em">★</span>
            <p>Aún no hay testimonios.</p>
            <Link className="btn-admin" href="/admin/testimonios/nuevo" style={{ marginTop: 18 }}>Añadir el primero</Link>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 18 }}>
          {testimonios.map((t) => (
            <div className="panel" key={t.id} style={{ marginBottom: 0, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                {t.publicado ? <span className="tag tag-pub">Publicado</span> : <span className="tag tag-borr">Oculto</span>}
                {t.destacado && <span className="tag tag-dest">Destacado</span>}
                <span style={{ color: 'var(--dorado)', fontSize: '.85rem', marginLeft: 'auto' }}>{'★'.repeat(t.estrellas)}</span>
              </div>
              <blockquote style={{ fontStyle: 'italic', color: 'var(--ciruela-oscuro)', fontSize: '.95rem', lineHeight: 1.6, marginBottom: 14, flex: 1 }}>
                “{t.texto}”
              </blockquote>
              <div style={{ marginBottom: 16 }}>
                <strong style={{ color: 'var(--ciruela)', fontSize: '.9rem', display: 'block' }}>{t.nombre}</strong>
                {t.detalle && <span style={{ color: 'var(--nude-light)', fontSize: '.8rem' }}>{t.detalle}</span>}
              </div>
              <div className="celda-acciones">
                <Link className="btn-admin ghost peque" href={`/admin/testimonios/${t.id}`}>Editar</Link>
                <DeleteButton endpoint={`/api/admin/testimonios/${t.id}`} confirmar="¿Eliminar este testimonio?" />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
