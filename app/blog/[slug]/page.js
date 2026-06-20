import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticuloBySlug } from '@/lib/content';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const articulo = await getArticuloBySlug(params.slug);
  if (!articulo) return { title: 'Artículo no encontrado | Soberanía Relacional' };
  return {
    title: `${articulo.titulo} | Soberanía Relacional`,
    description: articulo.extracto || undefined,
  };
}

function fecha(iso) {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return null;
  }
}

export default async function ArticuloPage({ params }) {
  const articulo = await getArticuloBySlug(params.slug);
  if (!articulo) notFound();

  const parrafos = (articulo.contenido || articulo.extracto || '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const f = fecha(articulo.publicado_en || articulo.creado_en);

  return (
    <div className="page-blog">
      <article className="container-sm" style={{ padding: '150px 40px 40px' }}>
        <Link href="/blog" className="blog-card-link" style={{ marginBottom: 28, display: 'inline-flex' }}>
          ← Volver al blog
        </Link>

        <div className="seccion-label">
          {[articulo.categoria, articulo.tiempo_lectura].filter(Boolean).join(' · ') || 'Reflexiones'}
        </div>
        <h1 className="titulo-seccion" style={{ fontStyle: 'italic' }}>{articulo.titulo}</h1>
        {f && <p style={{ color: 'var(--nude-light)', fontSize: '.85rem', letterSpacing: '1px', marginBottom: 10 }}>{f}</p>}

        {articulo.imagen_url ? (
          <div style={{ borderRadius: 24, overflow: 'hidden', margin: '30px 0' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={articulo.imagen_url} alt={articulo.titulo} style={{ width: '100%', display: 'block' }} />
          </div>
        ) : (
          <div className={`blog-card-img-bg ${articulo.color_bg || 'bg-1'}`} style={{ height: 280, borderRadius: 24, margin: '30px 0', fontSize: '4.5rem' }}>
            {articulo.emoji || '🌸'}
          </div>
        )}

        <div className="divider" style={{ margin: '10px 0 34px' }} />

        <div>
          {parrafos.map((p, i) => (
            <p className="texto-cuerpo" key={i} style={{ whiteSpace: 'pre-line' }}>{p}</p>
          ))}
        </div>
      </article>

      <div className="test-cta reveal" style={{ paddingTop: 40 }}>
        <div className="seccion-label center">¿Resonó contigo?</div>
        <h3 style={{ fontSize: '2.2rem', color: 'var(--ciruela-oscuro)', fontStyle: 'italic', marginBottom: 14 }}>
          Demos el siguiente paso juntas
        </h3>
        <p style={{ fontSize: '1rem', color: 'var(--nude-light)', maxWidth: 520, margin: '0 auto 36px', fontWeight: 300 }}>
          Si quieres llevar esto a tu propia vida, empecemos con una conversación honesta.
        </p>
        <Link className="btn-primario" href="/contacto">Agendar Sesión de Claridad</Link>
      </div>
    </div>
  );
}
