import Link from 'next/link';

export const metadata = {
  title: 'Sobre mí | Ofelia García Texis — Soberanía Relacional',
  description:
    'Soy Ofelia García Texis, coach en transformación y bienestar. Acompaño a mujeres latinas a recuperar su paz y su claridad, sin depender de que su entorno cambie.',
};

const RETRATO =
  'https://bizgyycqbwyczqcavmrp.supabase.co/storage/v1/object/public/imagenes/ofelia/ofelia-principal.jpg';
const OFICINA =
  'https://bizgyycqbwyczqcavmrp.supabase.co/storage/v1/object/public/imagenes/ofelia/ofelia-oficina.jpg';

const TRAYECTORIA = [
  {
    anio: '2014',
    titulo: 'El quiebre',
    texto:
      'Una separación desmoronó mi mundo y me obligó a cuestionar, por primera vez, el sistema de creencias con el que crecí.',
  },
  {
    anio: '2017',
    titulo: 'La fortaleza',
    texto:
      'Perdí a mi padre de crianza tras su batalla contra el cáncer. Esa pérdida me reveló una fuerza interior que no sabía que tenía.',
  },
  {
    anio: '2024',
    titulo: 'La convicción',
    texto:
      'Acompañé a mi madre durante su proceso contra el cáncer —que hoy, con profunda gratitud, ha superado—. Confirmé que es posible vivir en bienestar sin que las circunstancias tengan que cambiar.',
  },
];

const VALORES = [
  { h: 'Experiencia real', p: '28 años como mujer, esposa y madre, aplicados a tu realidad.' },
  { h: 'Resiliencia probada', p: 'Te acompaño a navegar pérdidas y crisis sin perder tu eje.' },
  { h: 'Cercanía cultural', p: 'Conozco lo que cuesta ser el eje de una familia latina sin perderse a una misma.' },
  { h: 'Metodología certificada', p: 'Basada en los 3 Principios del funcionamiento psicológico humano.' },
];

export default function SobreMiPage() {
  return (
    <div className="page-sobre">
      <div className="sobre-hero">
        <div className="container">
          <div className="sobre-grid">
            {/* Foto */}
            <div className="sobre-foto-wrap reveal">
              <div className="sobre-foto sobre-foto-real">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="sobre-foto-img" src={RETRATO} alt="Ofelia García Texis" />
                <div className="sobre-foto-grad" />
                <div className="sobre-foto-tag">
                  <strong>Ofelia García Texis</strong>
                  <span>Coach en Transformación &amp; Bienestar</span>
                </div>
              </div>
              <div className="sobre-stats">
                <div className="sobre-stat">
                  <span className="sobre-stat-num">28</span>
                  <span className="sobre-stat-label">Años de experiencia de vida</span>
                </div>
                <div className="sobre-stat">
                  <span className="sobre-stat-num">3</span>
                  <span className="sobre-stat-label">Principios que guían el método</span>
                </div>
              </div>
            </div>

            {/* Contenido */}
            <div className="sobre-contenido reveal">
              <div className="seccion-label">Sobre mí</div>
              <h2>Hola, soy Ofelia</h2>
              <span className="sobre-titulo-sub">
                Coach en Transformación y Bienestar · Mentora de Soberanía Emocional
              </span>

              <p>
                Quizá me conozcas como <strong>Ofelia Texis</strong>. Es un
                nombre que llevo con orgullo y gratitud, en honor a mi padre de
                crianza —mi tío materno—, quien me dio no solo su apellido, sino
                el ejemplo de amor más poderoso que he conocido.
              </p>
              <p>
                Acompaño a mujeres latinas —en toda Latinoamérica y en Estados
                Unidos— que sienten que sostienen el mundo sobre sus hombros y
                que hoy están listas para reclamar lo que siempre fue suyo: su
                propia paz.
              </p>
              <p>
                Mi historia no comenzó en la comodidad. Crecí aprendiendo
                resiliencia antes de saber que esa palabra existía: navegué la
                inestabilidad, el dolor familiar y la creencia —tan común en
                nuestra cultura— de que ser mujer significaba darse a los demás
                antes que a una misma. Cargué esas creencias durante años, hasta
                que las cuestioné a fondo y entendí algo que lo cambió todo: no
                eran verdad. Eran creencias. Y las creencias pueden romperse.
              </p>
              <p>
                Cada mujer que llega a mí carga una historia; algunas, muy
                pesadas. Lo primero que descubrimos juntas es que esa historia no
                es su límite: es su punto de partida. Porque la paz, la claridad y
                la plenitud no se construyen desde afuera. Ya están en ti. Solo
                necesitan ser recordadas.
              </p>

              <div className="sobre-quote">
                <blockquote>
                  &quot;La paz no es la ausencia de tormentas, sino la estabilidad
                  absoluta en medio de ellas.&quot;
                </blockquote>
              </div>

              <h3 className="sobre-form-h3">Mi forja: de la crisis a la sabiduría</h3>
              <p style={{ marginBottom: '8px' }}>
                Mi metodología no nació en un libro, sino en los momentos más
                duros de mi propia vida.
              </p>
              <div className="sobre-timeline">
                {TRAYECTORIA.map((h) => (
                  <div className="sobre-hito" key={h.anio}>
                    <span className="sobre-hito-anio">{h.anio}</span>
                    <div className="sobre-hito-cuerpo">
                      <strong>{h.titulo}</strong>
                      <p>{h.texto}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="sobre-form-h3">¿Por qué trabajar juntas?</h3>
              <div className="sobre-valores">
                {VALORES.map((v) => (
                  <div className="valor-item" key={v.h}>
                    <h4>{v.h}</h4>
                    <p>{v.p}</p>
                  </div>
                ))}
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

      {/* Banner de cierre con filosofía + segunda foto */}
      <section className="sobre-banner">
        <div className="container">
          <div className="sobre-banner-grid reveal">
            <div className="sobre-banner-foto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={OFICINA} alt="Ofelia García Texis" />
            </div>
            <div className="sobre-banner-texto">
              <div className="seccion-label">Mi filosofía</div>
              <h2>
                &quot;Cuando tú cambias desde tu ser,
                <br />
                todo cambia.&quot;
              </h2>
              <p>
                No busco víctimas: busco soberanas en el exilio. Mujeres con toda
                la capacidad de liderar su vida, que solo necesitan recuperar las
                llaves de su propia paz —para que, por fin, sea independiente de
                su entorno.
              </p>
              <Link className="btn-secundario" href="/servicios">
                Conoce el método
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
