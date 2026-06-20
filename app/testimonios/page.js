import Link from 'next/link';
import { getTestimonios } from '@/lib/content';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Testimonios | Soberanía Relacional',
  description:
    'Mujeres que eligieron la paz. Cada historia es única; lo que comparten es el mismo punto de llegada: una vida más fácil de habitar.',
};

export default async function TestimoniosPage() {
  const testimonios = await getTestimonios();
  const destacado = testimonios.find((t) => t.destacado) || null;
  const resto = testimonios.filter((t) => t !== destacado);

  return (
    <div className="page-testimonios">
      <div className="test-hero">
        <div className="seccion-label center">Mujeres que eligieron</div>
        <h2 className="reveal">
          Sus palabras,
          <br />
          no las mías
        </h2>
        <p className="reveal">
          Cada historia es única. Lo que comparten es el mismo punto de llegada:
          una vida más fácil de habitar.
        </p>
      </div>

      <div className="container" style={{ paddingBottom: 0 }}>
        <div className="test-grid">
          {destacado && (
            <div className="test-card test-destacado reveal">
              <div className="test-estrellas">{'★'.repeat(destacado.estrellas || 5)}</div>
              <blockquote>&ldquo;{destacado.texto}&rdquo;</blockquote>
              <div className="test-autora">
                <div className="test-avatar"></div>
                <div className="test-nombre">
                  <strong>{destacado.nombre}</strong>
                  <span>{destacado.detalle}</span>
                </div>
              </div>
            </div>
          )}

          {resto.map((t, i) => (
            <div className="test-card reveal" key={t.id || i}>
              <div className="test-estrellas">{'★'.repeat(t.estrellas || 5)}</div>
              <blockquote>&ldquo;{t.texto}&rdquo;</blockquote>
              <div className="test-autora">
                <div className="test-avatar"></div>
                <div className="test-nombre">
                  <strong>{t.nombre}</strong>
                  <span>{t.detalle}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="test-cta reveal">
        <div className="seccion-label center">Tu turno</div>
        <h3>
          ¿Lista para escribir
          <br />
          tu propia historia?
        </h3>
        <p>
          La próxima transformación puede ser la tuya. Empieza con una
          conversación honesta.
        </p>
        <Link className="btn-primario" href="/contacto">
          Agendar Sesión de Claridad
        </Link>
      </div>
    </div>
  );
}
