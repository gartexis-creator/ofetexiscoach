import Link from 'next/link';

export default function InicioPage() {
  return (
    <div className="page-inicio">
      {/* Hero */}
      <section className="hero">
        <div className="hero-ornament"></div>
        <span className="hero-eyebrow animate-fade-up">Mentoring de Alta Claridad</span>
        <h1 className="animate-fade-up delay-1">
          Soberanía<span className="hero-sub">Relacional</span>
        </h1>
        <p className="hero-desc animate-fade-up delay-2">
          Acompaño a mujeres líderes atrapadas en el sobrepensamiento y la
          autoexigencia a recuperar calma y claridad para habitar una vida más
          fácil — sin depender de que su entorno cambie.
        </p>
        <Link className="btn-primario animate-fade-up delay-3" href="/contacto">
          Inicia tu transformación
        </Link>
        <div className="hero-scroll-hint animate-fade-in delay-4">
          <span>Descubre</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* Franja problema */}
      <section className="franja-problema">
        <div className="container">
          <div className="grid-2">
            <div className="reveal">
              <div className="seccion-label">El punto de partida</div>
              <h2 className="titulo-seccion">
                ¿Tu bienestar es rehén de las circunstancias?
              </h2>
              <p className="texto-cuerpo">
                Es común creer que si tu pareja lograra alinearse con tu visión,
                o si existiera una armonía impecable en tu hogar, por fin podrías
                permitirte un descanso real.
              </p>
              <p className="texto-cuerpo">
                Ya sea que hoy intentes controlarlo todo o que te sientas como
                una hoja a la deriva, el origen es el mismo: has olvidado que tu
                paz es innata.
              </p>
              <ul className="lista-dolores">
                <li>Rumias conversaciones que aún no han pasado</li>
                <li>Tu productividad depende de cómo esté el ambiente</li>
                <li>La tranquilidad se siente como algo que hay que ganarse</li>
                <li>Eres eficiente para todos, pero no para ti misma</li>
              </ul>
            </div>
            <div className="reveal">
              <div className="quote-elegante">
                <blockquote>
                  &quot;No necesitas que el entorno se alinee para estar bien.
                  Necesitas recuperar el mando absoluto de tu claridad
                  mental.&quot;
                </blockquote>
                <cite>— Soberanía Relacional</cite>
              </div>
              <div
                style={{
                  marginTop: '36px',
                  display: 'flex',
                  gap: '14px',
                  flexWrap: 'wrap',
                }}
              >
                <Link
                  className="btn-primario"
                  href="/servicios"
                  style={{ padding: '16px 36px', fontSize: '.72rem' }}
                >
                  Ver programas
                </Link>
                <Link
                  className="btn-secundario"
                  href="/sobre-mi"
                  style={{ padding: '16px 32px', fontSize: '.72rem' }}
                >
                  Sobre mí
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner promesa */}
      <section className="banner-promesa">
        <div className="banner-inner reveal">
          <div className="badge-dorado">Maestría de Alto Rendimiento</div>
          <h2>
            Soberanía y Paz Mental
            <br />
            en 90 días
          </h2>
          <p>
            El único sistema diseñado para experimentar una vida más disfrutable
            a través de la comprensión profunda de la mente. No como destino:
            como punto de partida.
          </p>
          <Link
            className="btn-primario"
            href="/contacto"
            style={{
              background: 'linear-gradient(135deg,var(--dorado-oscuro),var(--dorado))',
              boxShadow: '0 8px 30px rgba(212,175,140,.3)',
            }}
          >
            Quiero comenzar
          </Link>
          <div className="stat-grid">
            <div className="stat-item">
              <span className="stat-num">90</span>
              <span className="stat-label">Días de transformación</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">3</span>
              <span className="stat-label">Pilares del método</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">∞</span>
              <span className="stat-label">Paz como base</span>
            </div>
          </div>
        </div>
      </section>

      {/* Método en inicio */}
      <section style={{ padding: '120px 0', background: 'var(--crema)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '70px' }} className="reveal">
            <div className="seccion-label center">El camino</div>
            <h2 className="titulo-seccion" style={{ textAlign: 'center' }}>
              El método en tres actos
            </h2>
            <p
              className="texto-cuerpo"
              style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto' }}
            >
              Recuperas el mando de tu realidad interna — de adentro hacia afuera.
            </p>
          </div>
          <div className="metodo-home-grid">
            <div className="reveal metodo-card">
              <div className="metodo-num">01</div>
              <h3>Claridad</h3>
              <p>
                Comprende cómo tu mente construye tu realidad y deja de ser
                víctima de una &quot;ilusión óptica&quot; emocional.
              </p>
            </div>
            <div className="reveal metodo-card">
              <div className="metodo-num">02</div>
              <h3>Soberanía</h3>
              <p>
                Recupera tu poder personal. Tu calma deja de ser negociable y
                deja de depender de los demás.
              </p>
            </div>
            <div className="reveal metodo-card">
              <div className="metodo-num">03</div>
              <h3>Plenitud</h3>
              <p>
                Habita un sistema de vida donde la facilidad y el disfrute son la
                norma, no la excepción.
              </p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '60px' }} className="reveal">
            <Link className="btn-primario" href="/servicios">
              Ver todos los programas
            </Link>
          </div>
        </div>
      </section>

      {/* Mini testimonial */}
      <section style={{ padding: '100px 0', background: 'var(--blanco)' }}>
        <div className="container-sm">
          <div style={{ textAlign: 'center', marginBottom: '50px' }} className="reveal">
            <div className="seccion-label center">Voces del camino</div>
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
              Pensé que necesitaba que mi relación cambiara para estar bien. Lo
              que descubrí fue que la relación siempre fue el espejo — y yo
              siempre tuve el poder que buscaba afuera.
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
              ></div>
              <div style={{ textAlign: 'left' }}>
                <strong
                  style={{ display: 'block', fontSize: '.88rem', color: 'var(--mauve-claro)' }}
                >
                  Directora de Operaciones
                </strong>
                <span style={{ fontSize: '.75rem', color: 'rgba(253,240,240,.4)' }}>
                  CDMX · Programa Soberanía 90 días
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

      {/* CTA final */}
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
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            border: '1px solid rgba(201,135,138,.1)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        ></div>
        <div style={{ position: 'relative', zIndex: 2 }} className="reveal">
          <div className="seccion-label center">Tu siguiente paso</div>
          <h2
            className="titulo-seccion"
            style={{ textAlign: 'center', fontStyle: 'italic' }}
          >
            ¿Lista para elegir
            <br />
            tu paz?
          </h2>
          <p
            className="texto-cuerpo"
            style={{ textAlign: 'center', maxWidth: '540px', margin: '0 auto 40px' }}
          >
            Agenda tu sesión exploratoria — sin compromiso, con toda la
            honestidad.
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
              Agendar Sesión de Claridad
            </Link>
            <Link className="btn-secundario" href="/blog">
              Leer el blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
