import Link from 'next/link';
import Hero from './components/Hero';
import { getTestimonios } from '@/lib/content';

export const dynamic = 'force-dynamic';

const BANNER =
  'https://bizgyycqbwyczqcavmrp.supabase.co/storage/v1/object/public/imagenes/ofelia/ofelia-banner.jpg';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '525572473984';
const WA_MENSAJE =
  'Hola Ofelia, vengo de tu página web y me gustaría agendar mi primera sesión gratuita. 🌸';

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
      <span
        className={`tst-avatar${foto ? ' tst-avatar-photo' : dorado ? ' tst-avatar-gold' : ''}`}
      >
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

export default async function InicioPage() {
  const waHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WA_MENSAJE)}`;

  const testimonios = await getTestimonios();
  const destacado = testimonios.find((t) => t.destacado) || testimonios[0] || null;
  const cards = testimonios.filter((t) => t !== destacado).slice(0, 3);

  return (
    <div className="page-inicio">
      {/* Hero */}
      <Hero />

      {/* ¿Te identificas? */}
      <section className="home-dolor">
        <div className="container-sm" style={{ textAlign: 'center' }}>
          <div className="seccion-label center">¿Te identificas?</div>
          <h2 className="titulo-seccion" style={{ textAlign: 'center' }}>
            Estás aquí por una razón.
          </h2>
          <p
            className="texto-cuerpo"
            style={{ textAlign: 'center', maxWidth: '480px', margin: '0 auto 14px' }}
          >
            Si algo de esto te suena, una sesión conmigo puede ayudarte:
          </p>
          <ul className="dolor-grid reveal">
            <li>Vives con ansiedad o sobrepensamiento constante</li>
            <li>El agotamiento se volvió tu estado normal</li>
            <li>Tus relaciones te drenan en lugar de sumarte</li>
            <li>Quieres un cambio, pero no sabes por dónde empezar</li>
          </ul>
        </div>
      </section>

      {/* ¿Cómo funciona? */}
      <section className="home-pasos">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }} className="reveal">
            <div className="seccion-label center">Cómo funciona</div>
            <h2 className="titulo-seccion" style={{ textAlign: 'center' }}>
              Empezar es simple
            </h2>
          </div>
          <div className="metodo-home-grid">
            <div className="reveal metodo-card">
              <div className="metodo-num">01</div>
              <h3>Agenda tu sesión gratis</h3>
              <p>Eliges día y hora. 30 minutos, online y sin costo.</p>
            </div>
            <div className="reveal metodo-card">
              <div className="metodo-num">02</div>
              <h3>Hablamos de tu situación</h3>
              <p>Me cuentas qué estás viviendo y te digo cómo puedo ayudarte.</p>
            </div>
            <div className="reveal metodo-card">
              <div className="metodo-num">03</div>
              <h3>Diseñamos tu proceso</h3>
              <p>Si avanzamos, armo un plan a tu medida. Nada enlatado.</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '54px' }} className="reveal">
            <Link className="btn-primario" href="/contacto">
              Agenda tu sesión gratis
            </Link>
          </div>
        </div>
      </section>

      {/* Quién te acompaña */}
      <section className="home-quien">
        <div className="container">
          <div className="home-quien-grid reveal">
            <div className="home-quien-foto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={BANNER} alt="Ofelia Texis, coach de vida y transformación" />
            </div>
            <div className="home-quien-texto">
              <div className="seccion-label">Quién te acompaña</div>
              <h2 className="titulo-seccion">Hola, soy Ofelia Texis</h2>
              <p className="texto-cuerpo">
                Coach certificada en transformación y bienestar. Llevo más de 5
                años acompañando a mujeres a recuperar su claridad y su calma,
                con un método basado en los 3 principios de la experiencia
                humana.
              </p>
              <p className="texto-cuerpo">
                No trabajo con fórmulas genéricas: cada proceso se diseña según
                lo que tú necesitas hoy.
              </p>
              <Link className="hero-link" href="/sobre-mi">
                Conoce mi historia <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios reales */}
      <section className="home-testimonios">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '46px' }} className="reveal">
            <div className="seccion-label center">Testimonios reales</div>
            <h2 className="titulo-seccion" style={{ textAlign: 'center' }}>
              Lo que viven mis clientas
            </h2>
          </div>

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

          {cards.length > 0 && (
            <div className="tst-grid" style={{ marginTop: '28px' }}>
              {cards.map((t, i) => (
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

          <div style={{ textAlign: 'center', marginTop: '44px' }} className="reveal">
            <Link className="btn-secundario" href="/testimonios">
              Ver todos los testimonios
            </Link>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="home-cta-final">
        <div className="home-cta-ring" />
        <div className="home-cta-ring home-cta-ring-2" />
        <div style={{ position: 'relative', zIndex: 2 }} className="reveal">
          <div className="seccion-label center">Tu primer paso</div>
          <h2 className="titulo-seccion" style={{ textAlign: 'center' }}>
            Tu primera sesión es gratis.
          </h2>
          <p
            className="texto-cuerpo"
            style={{
              textAlign: 'center',
              maxWidth: '480px',
              margin: '0 auto 38px',
              fontSize: '1.1rem',
            }}
          >
            30 minutos, online, sin compromiso. El primer paso para cambiar cómo
            te sientes.
          </p>
          <div className="home-cta-botones">
            <Link className="btn-primario" href="/contacto">
              Agenda ahora — es gratis
            </Link>
            <a
              className="btn-secundario"
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Escribir por WhatsApp
            </a>
          </div>
          <p className="home-cta-nota">Sin tarjeta · Sin compromiso</p>
        </div>
      </section>
    </div>
  );
}
