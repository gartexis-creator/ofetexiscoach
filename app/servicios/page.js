import Link from 'next/link';
import Faq from '../components/Faq';

export const metadata = {
  title: 'Programas & Servicios | Soberanía Relacional',
  description:
    'Cada programa está diseñado para un momento específico de tu camino. Escoge el que resuena con donde estás hoy.',
};

export default function ServiciosPage() {
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
          {/* Programa principal */}
          <div className="programa-card programa-destacado reveal">
            <div className="programa-card-top">
              <span className="programa-badge">✦ Programa insignia</span>
              <h3>
                Soberanía Relacional
                <br />
                90 días
              </h3>
              <p>
                El programa completo de transformación. Diseñado para la mujer que
                está lista para ir a la raíz y no volver a vivir rehén de su mente
                o su entorno.
              </p>
              <ul className="programa-lista">
                <li>12 sesiones individuales de 60 min</li>
                <li>Acceso a materiales exclusivos del método</li>
                <li>Soporte por voz entre sesiones</li>
                <li>Comunidad privada de mujeres en el proceso</li>
                <li>Grabaciones de cada sesión</li>
              </ul>
            </div>
            <div className="programa-card-bottom">
              <span className="programa-duracion">90 días · Inicio por agenda</span>
              <Link
                className="btn-primario"
                href="/contacto"
                style={{
                  padding: '14px 32px',
                  fontSize: '.72rem',
                  background: 'linear-gradient(135deg,var(--dorado-oscuro),var(--dorado))',
                  boxShadow: '0 6px 20px rgba(212,175,140,.3)',
                }}
              >
                Quiero este programa
              </Link>
            </div>
          </div>

          {/* Programa VIP */}
          <div className="programa-card reveal">
            <div className="programa-card-top">
              <span className="programa-badge">Inmersión VIP</span>
              <h3>Día Intensivo de Claridad</h3>
              <p>
                Una jornada completa de trabajo profundo para quienes necesitan un
                punto de quiebre inmediato. Ideal si tienes una decisión importante
                por tomar o una situación que se siente urgente.
              </p>
              <ul className="programa-lista">
                <li>4 horas de trabajo enfocado contigo</li>
                <li>Pre-trabajo de diagnóstico personalizado</li>
                <li>Plan de acción post-sesión</li>
                <li>Seguimiento de 2 semanas por audio</li>
              </ul>
            </div>
            <div className="programa-card-bottom">
              <span className="programa-duracion">
                1 día · Formato presencial u online
              </span>
              <Link
                className="btn-primario"
                href="/contacto"
                style={{ padding: '14px 32px', fontSize: '.72rem' }}
              >
                Agendar mi día VIP
              </Link>
            </div>
          </div>

          {/* Mentoría mensual */}
          <div
            className="programa-card intensivo-full reveal"
            style={{ gridColumn: '1/-1' }}
          >
            <div className="programa-card-top">
              <div>
                <span className="programa-badge">Para quien ya inició</span>
                <h3>Mentoría de Mantenimiento</h3>
                <p>
                  Para mujeres que ya han trabajado el método y quieren un espacio
                  de continuidad, profundización y acompañamiento mensual.
                </p>
                <ul className="programa-lista">
                  <li>2 sesiones al mes de 60 min</li>
                  <li>Soporte por voz entre sesiones</li>
                  <li>Acceso a nuevos materiales</li>
                  <li>Revisión trimestral de avances</li>
                </ul>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <div
                  style={{
                    background: 'var(--rosa-fondo)',
                    borderRadius: '18px',
                    padding: '30px',
                    textAlign: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: '.7rem',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      color: 'var(--mauve)',
                      fontWeight: 600,
                    }}
                  >
                    Requisito
                  </span>
                  <p
                    style={{
                      fontSize: '.9rem',
                      color: 'var(--nude-light)',
                      fontWeight: 300,
                      margin: '10px 0 0',
                      lineHeight: 1.6,
                    }}
                  >
                    Haber completado el programa de 90 días o una sesión de
                    claridad previa.
                  </p>
                </div>
              </div>
            </div>
            <div className="programa-card-bottom">
              <span className="programa-duracion">Renovable mensualmente</span>
              <Link
                className="btn-secundario"
                href="/contacto"
                style={{ padding: '14px 32px', fontSize: '.72rem' }}
              >
                Consultar disponibilidad
              </Link>
            </div>
          </div>
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
