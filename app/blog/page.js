import Link from 'next/link';
import NewsletterForm from '../components/NewsletterForm';
import { getArticulos } from '@/lib/content';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'El Blog | Soberanía Relacional',
  description:
    'Artículos para la mujer que ya sabe que el cambio real no viene de más información, sino de una comprensión más profunda.',
};

export default async function BlogPage() {
  const articulos = await getArticulos();
  const destacado = articulos.find((a) => a.destacado) || null;
  const resto = articulos.filter((a) => a !== destacado);

  return (
    <div className="page-blog">
      <div className="blog-hero">
        <div className="seccion-label center">Reflexiones &amp; Claridad</div>
        <h2 className="reveal">El Blog</h2>
        <p className="reveal">
          Artículos para la mujer que ya sabe que el cambio real no viene de más
          información, sino de una comprensión más profunda.
        </p>
      </div>

      <div className="container">
        <div className="blog-grid">
          {/* Artículo destacado */}
          {destacado && (
            <div className="blog-card blog-destacado reveal">
              <div className="blog-card-img">
                {destacado.imagen_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={destacado.imagen_url} alt={destacado.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div className="blog-card-img-bg bg-dest">{destacado.emoji || '🌸'}</div>
                )}
                <span className="blog-card-cat">Destacado</span>
              </div>
              <div className="blog-card-body">
                <div className="blog-card-meta">
                  {[destacado.categoria, destacado.tiempo_lectura].filter(Boolean).join(' · ')}
                </div>
                <h3>{destacado.titulo}</h3>
                <p>{destacado.extracto}</p>
                <Link className="blog-card-link" href={`/blog/${destacado.slug}`}>
                  Leer artículo completo
                </Link>
              </div>
            </div>
          )}

          {/* Artículos regulares */}
          {resto.map((a) => (
            <div className="blog-card reveal" key={a.slug}>
              <div className="blog-card-img">
                {a.imagen_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={a.imagen_url} alt={a.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div className={`blog-card-img-bg ${a.color_bg || 'bg-1'}`}>{a.emoji || '🌸'}</div>
                )}
                {a.categoria && <span className="blog-card-cat">{a.categoria}</span>}
              </div>
              <div className="blog-card-body">
                <div className="blog-card-meta">
                  {[a.categoria, a.tiempo_lectura].filter(Boolean).join(' · ')}
                </div>
                <h3>{a.titulo}</h3>
                <p>{a.extracto}</p>
                <Link className="blog-card-link" href={`/blog/${a.slug}`}>Leer más</Link>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="blog-newsletter reveal">
          <div className="seccion-label center">Para tu bandeja de entrada</div>
          <h3>Reflexiones que llegan cuando las necesitas</h3>
          <p>
            Una vez al mes, un artículo que va a la raíz. Sin ruido, sin
            fórmulas. Solo claridad.
          </p>
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
}
