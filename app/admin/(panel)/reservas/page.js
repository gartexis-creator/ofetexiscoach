import { getSupabaseServer } from '@/lib/supabaseServer';
import {
  etiquetaFecha, etiquetaFechaCorta, rangoHora, ahoraCDMX,
} from '@/lib/reservas';
import DeleteButton from '../../components/DeleteButton';
import ConfirmarReserva from '../../components/ConfirmarReserva';
import ReservasLive from '../../components/ReservasLive';

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
  const hoyCount = proximas.filter((r) => r.fecha === hoy).length;
  const porConfirmar = proximas.filter((r) => r.estado !== 'confirmada').length;
  const confirmadas = proximas.filter((r) => r.estado === 'confirmada').length;

  const stats = [
    { num: proximas.length, label: proximas.length === 1 ? 'Cita próxima' : 'Citas próximas' },
    { num: hoyCount, label: 'Hoy' },
    { num: porConfirmar, label: 'Por confirmar' },
    { num: confirmadas, label: 'Confirmadas' },
  ];

  return (
    <>
      <header className="admin-header">
        <div>
          <div className="admin-eyebrow">Sesiones agendadas desde la web</div>
          <h1>Citas</h1>
          <p>Cada reserva que alguien hace en tu página aparece aquí · horario Ciudad de México</p>
        </div>
        <ReservasLive />
      </header>

      <div className="stat-cards">
        {stats.map((s) => (
          <div className="stat-card stat-static" key={s.label}>
            <div className="num">{s.num}</div>
            <div className="label">{s.label}</div>
          </div>
        ))}
      </div>

      {reservas.length === 0 ? (
        <div className="tabla-wrap">
          <div className="vacio">
            <span className="em">📅</span>
            <p>Aún no tienes citas. Aparecerán aquí en cuanto alguien agende su sesión desde la web.</p>
          </div>
        </div>
      ) : (
        <>
          <Grupo titulo="Próximas" items={proximas} hoy={hoy} vacio="No tienes sesiones próximas por ahora." />
          {pasadas.length > 0 && <Grupo titulo="Pasadas" items={pasadas} hoy={hoy} atenuado />}
        </>
      )}
    </>
  );
}

function Grupo({ titulo, items, hoy, vacio, atenuado }) {
  return (
    <div className="cita-grupo">
      <div className="cita-grupo-titulo">
        {titulo} <span className="cita-grupo-num">{items.length}</span>
      </div>
      {items.length === 0 ? (
        <div className="tabla-wrap"><div className="vacio"><p>{vacio}</p></div></div>
      ) : (
        <div className="cita-lista">
          {items.map((r) => (
            <Cita key={r.id} r={r} hoy={hoy} atenuado={atenuado} />
          ))}
        </div>
      )}
    </div>
  );
}

function Cita({ r, hoy, atenuado }) {
  const c = etiquetaFechaCorta(r.fecha);
  const esHoy = r.fecha === hoy;
  const confirmada = r.estado === 'confirmada';

  return (
    <article className={`cita-card${atenuado ? ' atenuada' : ''}${confirmada ? ' confirmada' : ''}`}>
      <div className="cita-fecha">
        <span className="sem">{c.dia}</span>
        <span className="num">{c.num}</span>
        <span className="mes">{c.mes}</span>
        <span className="hora">{r.hora}</span>
      </div>

      <div className="cita-cuerpo">
        <div className="cita-top">
          <strong className="cita-nombre">{r.nombre}</strong>
          {esHoy && !atenuado && <span className="tag tag-new">Hoy</span>}
          {confirmada ? (
            <span className="tag tag-pub">Confirmada</span>
          ) : (
            !atenuado && <span className="tag tag-borr">Por confirmar</span>
          )}
        </div>

        <div className="cita-cuando">
          {etiquetaFecha(r.fecha)} · {rangoHora(r.hora)} h
        </div>

        <div className="cita-contactos">
          <a href={`mailto:${r.correo}`}>✉ {r.correo}</a>
          {r.whatsapp && (
            <a
              href={`https://wa.me/${r.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 {r.whatsapp}
            </a>
          )}
        </div>

        {r.mensaje && <p className="cita-mensaje">{r.mensaje}</p>}
      </div>

      <div className="cita-acciones">
        {!atenuado && <ConfirmarReserva id={r.id} estado={r.estado} />}
        <DeleteButton
          endpoint={`/api/admin/reservas/${r.id}`}
          confirmar={`¿Eliminar la cita de ${r.nombre}? El horario quedará libre de nuevo.`}
        />
      </div>
    </article>
  );
}
