import { getSupabaseServer } from '@/lib/supabaseServer';
import DeleteButton from '../../components/DeleteButton';

export const dynamic = 'force-dynamic';

function fecha(iso) {
  try {
    return new Date(iso).toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch {
    return iso;
  }
}

export default async function SuscriptoresPage() {
  const supabase = getSupabaseServer();

  let subs = [];
  if (supabase) {
    const { data } = await supabase
      .from('suscriptores')
      .select('*')
      .order('creado_en', { ascending: false });
    subs = data || [];
  }

  return (
    <>
      <header className="admin-header">
        <div>
          <div className="admin-eyebrow">Newsletter del blog</div>
          <h1>Suscriptores</h1>
          <p>{subs.length} {subs.length === 1 ? 'persona suscrita' : 'personas suscritas'} a tus reflexiones.</p>
        </div>
      </header>

      {subs.length === 0 ? (
        <div className="tabla-wrap">
          <div className="vacio">
            <span className="em">❤</span>
            <p>Aún no hay suscriptores. Aparecerán aquí cuando se registren desde el blog.</p>
          </div>
        </div>
      ) : (
        <div className="tabla-wrap">
          <table className="admin-tabla">
            <thead>
              <tr>
                <th>Correo</th>
                <th>Fecha de alta</th>
                <th style={{ textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((s) => (
                <tr key={s.id}>
                  <td><a href={`mailto:${s.correo}`} style={{ color: 'var(--mauve)' }}>{s.correo}</a></td>
                  <td>{fecha(s.creado_en)}</td>
                  <td>
                    <div className="celda-acciones" style={{ justifyContent: 'flex-end' }}>
                      <DeleteButton endpoint={`/api/admin/suscriptores/${s.id}`} confirmar="¿Eliminar este suscriptor?" />
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
