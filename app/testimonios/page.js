import Link from 'next/link';
import { getTestimonios } from '@/lib/content';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Testimonios | Soberanía Relacional',
  description:
    'Mujeres que eligieron la paz. Cada historia es única; lo que comparten es el mismo punto de llegada: una vida más fácil de habitar, sin depender de que su entorno cambie.',
};

const CONECTORES = new Set(['de', 'del', 'la', 'el', 'y', 'en', '·', '&']);

function iniciales(nombre) {
  const palabras = (nombre || '')
    .split(/[\s·&]+/)
    .filter((w) => w && !CONECTORES.has(w.toLowerCase()));
  if (palabras.length === 0) return '✦';
  if (palabras.length === 1) return palabras[0].slice(0, 2).toUpperCase();
  return (palabras[0][0] + palabras[palabras.length - 1][0]).toUpperCase();
}

function Estrellas({ n = 5 }) {
  return (
    <div className="tst-stars" aria-label={`${n} de 5 estrellas`}>
      {'★'.repeat(n)}
      <span className="tst-stars-off">{'★'.repeat(5 - n)}</span>
    </div>
  );
}

function Autora({ nombre, detalle, foto, pais, bandera, dorado }) {
  return (
    <figcaption className="tst-author">
      <span className={`tst-avatar${foto ? ' tst-avatar-photo' : dorado ? ' tst-avatar-gold' : ''}`}>
        {foto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={foto} alt={nombre} />
        ) : (
          iniciales(nombre)
        )}
      </span>
      <span className="tst-author-meta">
        <strong>{nombre}</strong>
        {detalle && <span className="tst-detalle">{detalle}</span>}
        {pais &&
          (bandera ? (
            <span className="tst-pais">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={bandera} alt="" />
              {pais}
            </span>
          ) : (
            <span className="tst-detalle">{pais}</span>
          ))}
      </span>
    </figcaption>
  );
}

export default async function TestimoniosPage() {
  const testimonios = await getTestimonios();
  const destacado = testimonios.find((t) => t.destacado) || testimonios[0] || null;
  const conVideo = testimonios.find((t) => t.video_url && t !== destacado) || null;
  const resto = testimonios.filter((t) => t !== destacado && t !== conVideo);

  return (
    <div className="page-testimonios tst-page">
      <section className="tst-hero">
        <div className="container-sm">
          <div className="seccion-label center">Mujeres que eligieron la paz</div>
          <h1 className="tst-hero-title reveal">
            Sus palabras,
            <br />
            <em>no las mías</em>
          </h1>
          <p className="tst-hero-sub reveal">
            Cada historia es única. Lo que comparten es el mismo punto de
            llegada: una vida más fácil de habitar, sin depender de que su
            entorno cambie.
          </p>

          <div className="tst-trust reveal">
            <div className="tst-trust-item">
              <span className="tst-trust-stars">★★★★★</span>
              <span className="tst-trust-label">Valoración de quienes la viven</span>
            </div>
            <span className="tst-trust-div" />
            <div className="tst-trust-item">
              <strong>100%</strong>
              <span className="tst-trust-label">Acompañamiento individual</span>
            </div>
            <span className="tst-trust-div" />
            <div className="tst-trust-item">
              <strong>Internacional</strong>
              <span className="tst-trust-label">México · Colombia · España</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {destacado && (
          <figure className="tst-featured reveal">
            <span className="tst-featured-mark" aria-hidden="true">
              &ldquo;
            </span>
            <div className="tst-featured-body">
              <Estrellas n={destacado.estrellas || 5} />
              <blockquote>{destacado.texto}</blockquote>
              <Autora
                nombre={destacado.nombre}
                detalle={destacado.detalle}
                foto={destacado.foto_url}
                pais={destacado.pais}
                bandera={destacado.bandera}
                dorado
              />
            </div>
          </figure>
        )}

        {conVideo && (
          <section className="tst-video reveal">
            <div className="tst-video-player">
              <video
                controls
                preload="none"
                playsInline
                poster={conVideo.poster_url || undefined}
              >
                <source src={conVideo.video_url} type="video/mp4" />
                Tu navegador no puede reproducir el video.
              </video>
              <span className="tst-video-badge">▶ Testimonio en video</span>
            </div>
            <div className="tst-video-info">
              <div className="seccion-label">En sus propias palabras</div>
              <Estrellas n={conVideo.estrellas || 5} />
              {conVideo.texto && <blockquote>{conVideo.texto}</blockquote>}
              <Autora
                nombre={conVideo.nombre}
                detalle={conVideo.detalle}
                foto={conVideo.foto_url}
                pais={conVideo.pais}
                bandera={conVideo.bandera}
              />
            </div>
          </section>
        )}

        {resto.length > 0 && (
          <div className="tst-grid">
            {resto.map((t, i) => (
              <figure className="tst-card reveal" key={t.id || i}>
                <span className="tst-card-mark" aria-hidden="true">
                  &ldquo;
                </span>
                <Estrellas n={t.estrellas || 5} />
                <blockquote>{t.texto}</blockquote>
                <Autora
                  nombre={t.nombre}
                  detalle={t.detalle}
                  foto={t.foto_url}
                  pais={t.pais}
                  bandera={t.bandera}
                />
              </figure>
            ))}
          </div>
        )}
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
