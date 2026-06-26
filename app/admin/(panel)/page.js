import Link from 'next/link';
import { getSupabaseServer } from '@/lib/supabaseServer';
import { ahoraCDMX } from '@/lib/reservas';

export const dynamic = 'force-dynamic';

async function contar(supabase, tabla, filtro) {
  let q = supabase.from(tabla).select('*', { count: 'exact', head: true });
  if (filtro) q = filtro(q);
  const { count } = await q;
  return count || 0;
}

export default async function DashboardPage() {
  const supabase = getSupabaseServer();

  if (!supabase) {
    return (
      <>
        <header className="admin-header">
          <div>
            <div className="admin-eyebrow">Bienvenida</div>
            <h1>Panel de administración</h1>
          </div>
        </header>
        <div className="config-aviso">
          <h3>Falta conectar la base de datos</h3>
          <p>
            Has iniciado sesión, pero todavía no está configurada la clave{' '}
            <code>SUPABASE_SERVICE_ROLE_KEY</code> en el archivo{' '}
            <code>.env.local</code>. Sin ella no se pueden leer ni guardar
            contenidos.
          </p>
        </div>
      </>
    );
  }

  const hoy = ahoraCDMX().fecha;
  const [reservasProximas, mensajesNuevos, mensajesTotal, suscriptores, articulos, testimonios, programas] =
    await Promise.all([
      contar(supabase, 'reservas', (q) => q.gte('fecha', hoy)),
      contar(supabase, 'contactos', (q) => q.eq('leido', false)),
      contar(supabase, 'contactos'),
      contar(supabase, 'suscriptores'),
      contar(supabase, 'articulos'),
      contar(supabase, 'testimonios'),
      contar(supabase, 'programas'),
    ]);

  const tarjetas = [
    { href: '/admin/reservas', num: reservasProximas, label: reservasProximas === 1 ? 'Sesión próxima' : 'Sesiones próximas' },
    { href: '/admin/mensajes', num: mensajesNuevos, label: mensajesNuevos === 1 ? 'Mensaje sin leer' : 'Mensajes sin leer' },
    { href: '/admin/suscriptores', num: suscriptores, label: 'Suscriptores' },
    { href: '/admin/blog', num: articulos, label: 'Artículos' },
    { href: '/admin/testimonios', num: testimonios, label: 'Testimonios' },
    { href: '/admin/programas', num: programas, label: 'Programas' },
  ];

  return (
    <>
      <header className="admin-header">
        <div>
          <div className="admin-eyebrow">Bienvenida, Ofe</div>
          <h1>Tu panel</h1>
          <p>Administra tu contenido y revisa los mensajes de tus clientas.</p>
        </div>
      </header>

      <div className="stat-cards">
        {tarjetas.map((t) => (
          <Link key={t.href} href={t.href} className="stat-card">
            <div className="num">{t.num}</div>
            <div className="label">{t.label}</div>
          </Link>
        ))}
      </div>

      <div className="panel">
        <div className="panel-title">Atajos rápidos</div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Link className="btn-admin" href="/admin/reservas">📅 Ver reservas ({reservasProximas})</Link>
          <Link className="btn-admin ghost" href="/admin/blog/nuevo">✎ Escribir artículo</Link>
          <Link className="btn-admin ghost" href="/admin/testimonios/nuevo">★ Añadir testimonio</Link>
          <Link className="btn-admin ghost" href="/admin/mensajes">✉ Ver mensajes ({mensajesTotal})</Link>
          <Link className="btn-admin ghost" href="/admin/programas">✦ Editar programas</Link>
        </div>
      </div>
    </>
  );
}
