import Link from 'next/link';

export const metadata = {
  title: 'Sobre mí | Soberanía Relacional',
  description:
    'Mentora de Claridad Mental & Soberanía Interna. Acompaño a mujeres líderes a recuperar la paz que siempre fue suya.',
};

export default function SobreMiPage() {
  return (
    <div className="page-sobre">
      <div className="sobre-hero">
        <div className="container">
          <div className="sobre-grid">
            <div className="sobre-foto-wrap reveal">
              <div className="sobre-foto">
                <div className="sobre-foto-deco">
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill="white"
                      d="M100,20 C140,20 170,50 170,100 C170,150 140,180 100,180 C60,180 30,150 30,100 C30,50 60,20 100,20 Z"
                    />
                  </svg>
                </div>
                <div className="sobre-foto-tag">
                  <strong>Tu nombre aquí</strong>
                  <span>Mentora · Soberanía Relacional</span>
                </div>
              </div>
              <div className="sobre-stats">
                <div className="sobre-stat">
                  <span className="sobre-stat-num">+5</span>
                  <span className="sobre-stat-label">Años acompañando</span>
                </div>
                <div className="sobre-stat">
                  <span className="sobre-stat-num">+200</span>
                  <span className="sobre-stat-label">Mujeres acompañadas</span>
                </div>
              </div>
            </div>

            <div className="sobre-contenido reveal">
              <div className="seccion-label">Sobre mí</div>
              <h2>Hola, soy [Tu Nombre]</h2>
              <span className="sobre-titulo-sub">
                Mentora de Claridad Mental &amp; Soberanía Interna
              </span>

              <p>
                Sé lo que se siente vivir con la mente a mil por hora creyendo que
                si controlas lo suficiente, si das lo suficiente, si eres lo
                suficiente — por fin todo estará bien.
              </p>
              <p>
                Durante años viví así. Exitosa afuera, exhausta adentro. Hasta que
                descubrí los Tres Principios y comprendí algo que lo cambió todo:
                mi bienestar nunca dependió de mi entorno. Dependía de si yo
                entendía cómo funciona mi mente.
              </p>
              <p>
                Desde entonces acompaño a mujeres líderes — directivas,
                empresarias, profesionistas — a hacer ese mismo descubrimiento:
                que la paz no se construye, se recupera.
              </p>

              <div className="sobre-quote">
                <blockquote>
                  &quot;No entreno mentes, las libero de la ilusión que las tiene
                  ocupadas.&quot;
                </blockquote>
              </div>

              <div className="sobre-valores">
                <div className="valor-item">
                  <h4>Honestidad radical</h4>
                  <p>
                    No te digo lo que quieres oír. Te acompaño a ver lo que ya
                    está ahí.
                  </p>
                </div>
                <div className="valor-item">
                  <h4>Sin recetas</h4>
                  <p>
                    La comprensión real no viene de técnicas. Viene de ver con
                    claridad.
                  </p>
                </div>
                <div className="valor-item">
                  <h4>Profundidad real</h4>
                  <p>Vamos a la raíz, no a los síntomas. Siempre.</p>
                </div>
                <div className="valor-item">
                  <h4>Desde la experiencia</h4>
                  <p>
                    Este camino lo he transitado yo primero. No teoría: vivencia.
                  </p>
                </div>
              </div>

              <h3 className="sobre-form-h3">Formación &amp; Certificaciones</h3>
              <div className="formacion-grid">
                <div className="formacion-item">
                  <div className="formacion-icon">🎓</div>
                  <div className="formacion-text">
                    <strong>Tres Principios</strong>
                    <span>Certificación internacional · Sydney Banks Institute</span>
                  </div>
                </div>
                <div className="formacion-item">
                  <div className="formacion-icon">✦</div>
                  <div className="formacion-text">
                    <strong>Coaching Ontológico</strong>
                    <span>Escuela de Coaches de México</span>
                  </div>
                </div>
                <div className="formacion-item">
                  <div className="formacion-icon">📚</div>
                  <div className="formacion-text">
                    <strong>Psicología Positiva</strong>
                    <span>Universidad Iberoamericana</span>
                  </div>
                </div>
                <div className="formacion-item">
                  <div className="formacion-icon">🌿</div>
                  <div className="formacion-text">
                    <strong>Mindfulness Aplicado</strong>
                    <span>Formación continuada · 200hrs</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '44px' }}>
                <Link className="btn-primario" href="/contacto">
                  Agendar sesión exploratoria
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
