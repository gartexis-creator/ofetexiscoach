import Link from 'next/link';
import Faq from '../components/Faq';
import { getProgramas } from '@/lib/content';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Programas & Servicios | Soberanía Relacional',
  description:
    'Cada programa está diseñado para un momento específico de tu camino. Escoge el que resuena con donde estás hoy.',
};

function botonClase(estilo) {
  return estilo === 'secundario' ? 'btn-secundario' : 'btn-primario';
}
function botonEstilo(estilo) {
  const base = { padding: '14px 32px', fontSize: '.72rem' };
  if (estilo === 'dorado') {
    return {
      ...base,
      background: 'linear-gradient(135deg,var(--dorado-oscuro),var(--dorado))',
      boxShadow: '0 6px 20px rgba(212,175,140,.3)',
    };
  }
  return base;
}

function Titulo({ texto }) {
  const lineas = (texto || '').split('\n');
  return (
    <>
      {lineas.map((l, i) => (
        <span key={i}>
          {l}
          {i < lineas.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

function ProgramaCard({ p }) {
  const clases = [
    'programa-card',
    'reveal',
    p.destacado ? 'programa-destacado' : '',
    p.ancho_completo ? 'intensivo-full' : '',
  ].filter(Boolean).join(' ');

  const items = Array.isArray(p.items) ? p.items : [];

  const bloquePrincipal = (
    <div>
      {p.badge && <span className="programa-badge">{p.badge}</span>}
      <h3><Titulo texto={p.titulo} /></h3>
      {p.descripcion && <p>{p.descripcion}</p>}
      {items.length > 0 && (
        <ul className="programa-lista">
          {items.map((it, i) => <li key={i}>{it}</li>)}
        </ul>
      )}
    </div>
  );

  return (
    <div className={clases} style={p.ancho_completo ? { gridColumn: '1/-1' } : undefined}>
      <div className="programa-card-top">
        {p.ancho_completo && p.requisito ? (
          <>
            {bloquePrincipal}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <div style={{ background: 'var(--rosa-fondo)', borderRadius: '18px', padding: '30px', textAlign: 'center' }}>
                <span style={{ fontSize: '.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--mauve)', fontWeight: 600 }}>
                  Requisito
                </span>
                <p style={{ fontSize: '.9rem', color: 'var(--nude-light)', fontWeight: 300, margin: '10px 0 0', lineHeight: 1.6 }}>
                  {p.requisito}
                </p>
              </div>
            </div>
          </>
        ) : (
          bloquePrincipal
        )}
      </div>
      <div className="programa-card-bottom">
        {p.duracion && <span className="programa-duracion">{p.duracion}</span>}
        <Link className={botonClase(p.cta_estilo)} href="/contacto" style={botonEstilo(p.cta_estilo)}>
          {p.cta_texto || 'Quiero este programa'}
        </Link>
      </div>
    </div>
  );
}

export default async function ServiciosPage() {
  const programas = await getProgramas();

  return (
    <div className="page-servicios">
      <section className="servicios-hero">
        <div className="seccion-label center" style={{ justifyContent: 'center' }}>
          Lo que ofrezco
        </div>
        <h2 className="reveal">Programas &amp; Servicios</h2>
        <p className="reveal">
          Cada programa está diseñado para un momento específico de tu camino.
          Escoge el que resuena con donde estás hoy.
        </p>
      </section>

      <div className="container">
        <div className="programa-grid">
          {programas.map((p, i) => (
            <ProgramaCard p={p} key={p.id || p.slug || i} />
          ))}
        </div>

        {/* FAQ */}
        <section style={{ padding: '30px 0 100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }} className="reveal">
            <div className="seccion-label center">Preguntas frecuentes</div>
            <h2 className="titulo-seccion" style={{ textAlign: 'center' }}>
              Lo que suelen preguntar
            </h2>
          </div>
          <Faq />
        </section>
      </div>
    </div>
  );
}
