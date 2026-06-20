import { getSupabaseServer } from '@/lib/supabaseServer';
import ToggleLeido from '../../components/ToggleLeido';
import DeleteButton from '../../components/DeleteButton';

export const dynamic = 'force-dynamic';

function fecha(iso) {
  try {
    return new Date(iso).toLocaleString('es-MX', {
      day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

export default async function MensajesPage() {
  const supabase = getSupabaseServer();

  let mensajes = [];
  if (supabase) {
    const { data } = await supabase
      .from('contactos')
      .select('*')
      .order('creado_en', { ascending: false });
    mensajes = data || [];
  }

  return (
    <>
      <header className="admin-header">
        <div>
          <div className="admin-eyebrow">Formularios recibidos</div>
          <h1>Mensajes</h1>
          <p>Solicitudes de la Sesión de Claridad enviadas desde la web.</p>
        </div>
      </header>

      {mensajes.length === 0 ? (
        <div className="tabla-wrap">
          <div className="vacio">
            <span className="em">✉</span>
            <p>Todavía no hay mensajes. Aparecerán aquí en cuanto alguien complete el formulario de contacto.</p>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {mensajes.map((m) => (
            <div className="panel" key={m.id} style={{ marginBottom: 0, opacity: m.leido ? 0.78 : 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap', marginBottom: 14 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <strong style={{ fontSize: '1.05rem', color: 'var(--ciruela)' }}>{m.nombre}</strong>
                    {!m.leido && <span className="tag tag-new">Nuevo</span>}
                    {m.programa && <span className="tag tag-dest">{m.programa}</span>}
                  </div>
                  <div style={{ fontSize: '.82rem', color: 'var(--nude-light)', marginTop: 4 }}>{fecha(m.creado_en)}</div>
                </div>
                <div className="celda-acciones">
                  <ToggleLeido id={m.id} leido={m.leido} />
                  <DeleteButton endpoint={`/api/admin/contactos/${m.id}`} confirmar="¿Eliminar este mensaje?" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: m.mensaje ? 16 : 0 }}>
                <Dato etiqueta="Correo" valor={<a href={`mailto:${m.correo}`} style={{ color: 'var(--mauve)' }}>{m.correo}</a>} />
                {m.ocupacion && <Dato etiqueta="Ocupación" valor={m.ocupacion} />}
                <Dato etiqueta="Acepta contacto" valor={m.acepto ? 'Sí' : 'No'} />
              </div>

              {m.mensaje && (
                <div style={{ background: 'var(--rosa-fondo)', borderRadius: 12, padding: '16px 18px', fontSize: '.92rem', lineHeight: 1.7, color: 'var(--nude)', whiteSpace: 'pre-wrap' }}>
                  {m.mensaje}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function Dato({ etiqueta, valor }) {
  return (
    <div>
      <div style={{ fontSize: '.66rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--nude-light)', fontWeight: 600, marginBottom: 4 }}>{etiqueta}</div>
      <div style={{ fontSize: '.9rem', color: 'var(--nude)' }}>{valor}</div>
    </div>
  );
}
