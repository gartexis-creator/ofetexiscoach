import Link from 'next/link';
import Hero from './components/Hero';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '525572473984';
const WA_MENSAJE = 'Hola Ofelia, vengo de tu página web y me gustaría agendar mi primera sesión gratuita. 🌸';

export default function InicioPage() {
  const waHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WA_MENSAJE)}`;

  return (
    <div className="page-inicio">
      {/* Hero */}
      <Hero />

      {/* ¿Te reconoces en esto? */}
      <section className="franja-problema">
        <div className="container">
          <div className="grid-2">
            <div className="reveal">
              <div className="seccion-label">¿Te suena familiar?</div>
              <h2 className="titulo-seccion">
                Cuando el agotamiento
                <br />
                se vuelve tu estado normal.
              </h2>
              <p className="texto-cuerpo">
                No es que seas débil. Es que llevas demasiado tiempo
                cargando con todo — las expectativas, las relaciones,
                las decisiones — sin que nadie te acompañe de verdad.
              </p>
              <ul className="lista-dolores">
                <li>Tu mente no para: rumias, anticipas, te agota</li>
                <li>Eres eficiente para todos, pero invisible para ti misma</li>
                <li>Tus relaciones te drenan más de lo que te nutren</li>
                <li>Sabes que algo tiene que cambiar, pero no sabes por dónde</li>
                <li>Llevas tiempo posponiendo tu propio bienestar</li>
              </ul>
            </div>
            <div className="reveal">
              <div className="quote-elegante">
                <blockquote>
                  &quot;No necesitas tenerlo todo resuelto para empezar.
                  Solo necesitas una conversación honesta — y las ganas
                  de vivir diferente.&quot;
                </blockquote>
                <cite>— Ofelia Texis</cite>
              </div>
              <div style={{ marginTop: '36px' }}>
                <Link
                  className="btn-primario"
                  href="/contacto"
                  style={{ padding: '16px 36px', fontSize: '.72rem' }}
                >
                  Quiero mi sesión gratuita
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Cómo trabajamos juntas? */}
      <section style={{ padding: '120px 0', background: 'var(--crema)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '70px' }} className="reveal">
            <div className="seccion-label center">El proceso</div>
            <h2 className="titulo-seccion" style={{ textAlign: 'center' }}>
              ¿Cómo trabajamos juntas?
            </h2>
            <p
              className="texto-cuerpo"
              style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto' }}
            >
              Sin formularios eternos, sin compromisos desde el día uno.
              Empezamos con una conversación.
            </p>
          </div>
          <div className="metodo-home-grid">
            <div className="reveal metodo-card">
              <div className="metodo-num">01</div>
              <h3>Agenda tu sesión gratis</h3>
              <p>
                Elige el día y horario que mejor te acomode. Una
                conversación de 30 minutos, online y sin ningún costo.
                Solo tú y yo.
              </p>
            </div>
            <div className="reveal metodo-card">
              <div className="metodo-num">02</div>
              <h3>Te escucho, sin rodeos</h3>
              <p>
                Platicamos sobre lo que estás viviendo. Entiendo tu
                situación y te digo con honestidad si creo que puedo
                ayudarte y cómo.
              </p>
            </div>
            <div className="reveal metodo-card">
              <div className="metodo-num">03</div>
              <h3>Avanzamos a tu ritmo</h3>
              <p>
                Si hay alineación, te hago una propuesta completamente
                personalizada — a tu medida, a tu momento, sin programas
                enlatados.
              </p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '60px' }} className="reveal">
            <Link className="btn-primario" href="/contacto">
              Empezar — primera sesión gratis
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section style={{ padding: '100px 0', background: 'var(--blanco)' }}>
        <div className="container-sm">
          <div style={{ textAlign: 'center', marginBottom: '50px' }} className="reveal">
            <div className="seccion-label center">Lo que dicen ellas</div>
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg,var(--ciruela-oscuro),#3D2030)',
              borderRadius: '28px',
              padding: '60px',
              textAlign: 'center',
            }}
            className="reveal"
          >
            <div
              style={{
                fontFamily: 'var(--serif)',
                fontSize: '6rem',
                color: 'rgba(201,135,138,.2)',
                lineHeight: '.5',
                marginBottom: '24px',
              }}
            >
              &quot;
            </div>
            <blockquote
              style={{
                fontSize: '1.25rem',
                fontStyle: 'italic',
                color: 'rgba(253,240,240,.9)',
                lineHeight: '1.65',
              }}
            >
              Pensé que necesitaba que mi vida entera cambiara para sentirme
              bien. Lo que descubrí fue que el cambio siempre empezó conmigo —
              y que nunca estuve sola en el proceso.
            </blockquote>
            <div
              style={{
                marginTop: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '14px',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg,var(--mauve-claro),var(--dorado))',
                }}
              />
              <div style={{ textAlign: 'left' }}>
                <strong
                  style={{ display: 'block', fontSize: '.88rem', color: 'var(--mauve-claro)' }}
                >
                  Directora de Operaciones
                </strong>
                <span style={{ fontSize: '.75rem', color: 'rgba(253,240,240,.4)' }}>
                  CDMX · Proceso de coaching personalizado
                </span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '36px' }} className="reveal">
            <Link className="btn-secundario" href="/testimonios">
              Leer más testimonios
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section
        style={{
          padding: '130px 40px',
          textAlign: 'center',
          background: 'var(--rosa-fondo)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            border: '1px solid rgba(201,135,138,.1)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '900px',
            height: '900px',
            borderRadius: '50%',
            border: '1px solid rgba(201,135,138,.05)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        />
        <div style={{ position: 'relative', zIndex: 2 }} className="reveal">
          <div className="seccion-label center">Tu siguiente paso</div>
          <h2
            className="titulo-seccion"
            style={{ textAlign: 'center', fontStyle: 'italic' }}
          >
            Tu primera sesión
            <br />
            no cuesta nada.
          </h2>
          <p
            className="texto-cuerpo"
            style={{
              textAlign: 'center',
              maxWidth: '500px',
              margin: '0 auto 40px',
              fontSize: '1.1rem',
            }}
          >
            Pero sí puede cambiarlo todo. 30 minutos, online, sin compromiso.
            Solo tú y yo, hablando de lo que más importa.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '18px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link className="btn-primario" href="/contacto">
              Agendar ahora — es gratis
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
          <p
            style={{
              marginTop: '28px',
              fontSize: '.75rem',
              letterSpacing: '1.5px',
              color: 'var(--nude-light)',
              textTransform: 'uppercase',
            }}
          >
            Sin tarjeta · Sin compromisos · Sin letra chica
          </p>
        </div>
      </section>
    </div>
  );
}
