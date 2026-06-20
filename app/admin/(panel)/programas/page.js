import Link from 'next/link';
import { getSupabaseServer } from '@/lib/supabaseServer';
import DeleteButton from '../../components/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function ProgramasAdminPage() {
  const supabase = getSupabaseServer();

  let programas = [];
  if (supabase) {
    const { data } = await supabase
      .from('programas')
      .select('*')
      .order('orden', { ascending: false })
      .order('creado_en', { ascending: true });
    programas = data || [];
  }

  return (
    <>
      <header className="admin-header">
        <div>
          <div className="admin-eyebrow">Tus servicios</div>
          <h1>Programas</h1>
          <p>Edita la información de tus programas tal como aparece en la web.</p>
        </div>
        <Link className="btn-admin" href="/admin/programas/nuevo">✦ Nuevo programa</Link>
      </header>

      {programas.length === 0 ? (
        <div className="tabla-wrap">
          <div className="vacio">
            <span className="em">✦</span>
            <p>No hay programas. Crea el primero o ejecuta el archivo de base de datos para cargar los iniciales.</p>
            <Link className="btn-admin" href="/admin/programas/nuevo" style={{ marginTop: 18 }}>Crear programa</Link>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 18 }}>
          {programas.map((p) => (
            <div className="panel" key={p.id} style={{ marginBottom: 0, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                {p.publicado ? <span className="tag tag-pub">Publicado</span> : <span className="tag tag-borr">Oculto</span>}
                {p.destacado && <span className="tag tag-dest">Destacado</span>}
              </div>
              {p.badge && <div style={{ fontSize: '.68rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--mauve)', fontWeight: 600, marginBottom: 6 }}>{p.badge}</div>}
              <h3 style={{ fontFamily: 'var(--serif)', color: 'var(--ciruela)', fontSize: '1.3rem', marginBottom: 10, whiteSpace: 'pre-line' }}>{p.titulo}</h3>
              <p style={{ color: 'var(--nude-light)', fontSize: '.88rem', lineHeight: 1.6, marginBottom: 14, flex: 1 }}>{p.descripcion}</p>
              <div style={{ fontSize: '.78rem', color: 'var(--dorado-oscuro)', marginBottom: 16 }}>{p.duracion}</div>
              <div className="celda-acciones">
                <Link className="btn-admin ghost peque" href={`/admin/programas/${p.id}`}>Editar</Link>
                <DeleteButton endpoint={`/api/admin/programas/${p.id}`} confirmar={`¿Eliminar el programa "${p.titulo.replace(/\n/g, ' ')}"?`} />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
