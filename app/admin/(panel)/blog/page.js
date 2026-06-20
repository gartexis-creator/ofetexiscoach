import Link from 'next/link';
import { getSupabaseServer } from '@/lib/supabaseServer';
import DeleteButton from '../../components/DeleteButton';

export const dynamic = 'force-dynamic';

function fecha(iso) {
  try {
    return new Date(iso).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return '';
  }
}

export default async function BlogAdminPage() {
  const supabase = getSupabaseServer();

  let articulos = [];
  if (supabase) {
    const { data } = await supabase
      .from('articulos')
      .select('*')
      .order('destacado', { ascending: false })
      .order('orden', { ascending: false })
      .order('creado_en', { ascending: false });
    articulos = data || [];
  }

  return (
    <>
      <header className="admin-header">
        <div>
          <div className="admin-eyebrow">Contenido del blog</div>
          <h1>Artículos</h1>
          <p>{articulos.length} {articulos.length === 1 ? 'artículo' : 'artículos'} en tu blog.</p>
        </div>
        <Link className="btn-admin" href="/admin/blog/nuevo">✎ Escribir artículo</Link>
      </header>

      {articulos.length === 0 ? (
        <div className="tabla-wrap">
          <div className="vacio">
            <span className="em">✎</span>
            <p>Todavía no has publicado ningún artículo.</p>
            <Link className="btn-admin" href="/admin/blog/nuevo" style={{ marginTop: 18 }}>Escribir el primero</Link>
          </div>
        </div>
      ) : (
        <div className="tabla-wrap">
          <table className="admin-tabla">
            <thead>
              <tr>
                <th>Artículo</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th style={{ textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {articulos.map((a) => (
                <tr key={a.id}>
                  <td>
                    <span style={{ fontSize: '1.1rem', marginRight: 8 }}>{a.emoji}</span>
                    {a.titulo}
                    <span className="sub">{a.categoria} · {a.tiempo_lectura}</span>
                  </td>
                  <td>
                    {a.publicado
                      ? <span className="tag tag-pub">Publicado</span>
                      : <span className="tag tag-borr">Borrador</span>}
                    {a.destacado && <span className="tag tag-dest" style={{ marginLeft: 6 }}>Destacado</span>}
                  </td>
                  <td>{fecha(a.creado_en)}</td>
                  <td>
                    <div className="celda-acciones" style={{ justifyContent: 'flex-end' }}>
                      <Link className="btn-admin ghost peque" href={`/admin/blog/${a.id}`}>Editar</Link>
                      <DeleteButton endpoint={`/api/admin/articulos/${a.id}`} confirmar={`¿Eliminar el artículo "${a.titulo}"?`} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
