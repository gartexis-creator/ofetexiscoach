import { getSupabaseServer } from '@/lib/supabaseServer';
import { etiquetaFecha, rangoHora, ahoraCDMX } from '@/lib/reservas';
import DeleteButton from '../../components/DeleteButton';
import ConfirmarReserva from '../../components/ConfirmarReserva';

export const dynamic = 'force-dynamic';

export default async function ReservasAdminPage() {
  const supabase = getSupabaseServer();

  let reservas = [];
  if (supabase) {
    const { data } = await supabase
      .from('reservas')
      .select('*')
      .order('fecha', { ascending: true })
      .order('hora', { ascending: true });
    reservas = data || [];
  }

  const hoy = ahoraCDMX().fecha;
  const proximas = reservas.filter((r) => r.fecha >= hoy);
  const pasadas = reservas.filter((r) => r.fecha < hoy).reverse();

  return (
    <>
      <header className="admin-header">
        <div>
          <div className="admin-eyebrow">Sesiones de Claridad agendadas</div>
          <h1>Reservas</h1>
          <p>
            {proximas.length} {proximas.length === 1 ? 'sesión próxima' : 'sesiones próximas'} · horario Ciudad de México
          </p>
        </div>
      </header>

      {reservas.length === 0 ? (
        <div className="tabla-wrap">
          <div className="vacio">
            <span className="em">📅</span>
            <p>Aún no tienes reservas. Aparecerán aquí cuando alguien agende su Sesión de Claridad.</p>
          </div>
        </div>
      ) : (
        <>
          <Lista titulo="Próximas" items={proximas} vacio="No tienes sesiones próximas." />
          {pasadas.length > 0 && <Lista titulo="Pasadas" items={pasadas} atenuado />}
        </>
      )}
    </>
  );
}

function Lista({ titulo, items, vacio, atenuado }) {
  return (
    <div style={{ marginBottom: 30 }}>
      <div className="panel-title" style={{ marginBottom: 14 }}>{titulo}</div>
      {items.length === 0 ? (
        <div className="tabla-wrap"><div className="vacio"><p>{vacio}</p></div></div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {items.map((r) => (
            <div className="panel" key={r.id} style={{ marginBottom: 0, opacity: atenuado ? 0.65 : 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 4 }}>
                    <strong style={{ fontSize: '1.05rem', color: 'var(--ciruela)' }}>{r.nombre}</strong>
                    {r.estado === 'confirmada'
                      ? <span className="tag tag-pub">Confirmada</span>
                      : <span className="tag tag-new">Por confirmar</span>}
                  </div>
                  <div style={{ fontSize: '.92rem', color: 'var(--nude)' }}>
                    📅 <strong>{etiquetaFecha(r.fecha)}</strong> · 🕐 {rangoHora(r.hora)} h
                  </div>
                </div>
                {!atenuado && (
                  <div className="celda-acciones">
                    <ConfirmarReserva id={r.id} estado={r.estado} />
                    <DeleteButton endpoint={`/api/admin/reservas/${r.id}`} confirmar={`¿Eliminar la reserva de ${r.nombre}? El horario quedará libre de nuevo.`} />
                  </div>
                )}
                {atenuado && (
                  <DeleteButton endpoint={`/api/admin/reservas/${r.id}`} confirmar={`¿Eliminar la reserva de ${r.nombre}?`} />
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 12, marginTop: 14 }}>
                <Dato etiqueta="Correo" valor={<a href={`mailto:${r.correo}`} style={{ color: 'var(--mauve)' }}>{r.correo}</a>} />
                {r.whatsapp && (
                  <Dato etiqueta="WhatsApp" valor={<a href={`https://wa.me/${r.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--mauve)' }}>{r.whatsapp}</a>} />
                )}
              </div>

              {r.mensaje && (
                <div style={{ background: 'var(--rosa-fondo)', borderRadius: 12, padding: '14px 16px', fontSize: '.9rem', lineHeight: 1.6, color: 'var(--nude)', whiteSpace: 'pre-wrap', marginTop: 14 }}>
                  {r.mensaje}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
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
