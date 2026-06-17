import Link from 'next/link';

export const metadata = {
  title: 'Testimonios | Soberanía Relacional',
  description:
    'Mujeres que eligieron la paz. Cada historia es única; lo que comparten es el mismo punto de llegada: una vida más fácil de habitar.',
};

const TESTIMONIOS = [
  {
    texto:
      '"En 6 semanas entendí más sobre cómo funciona mi mente que en 3 años de terapia. No es que la terapia no sirva — es que esto trabaja desde otro lugar completamente."',
    nombre: 'Directora Creativa',
    detalle: 'Guadalajara · Programa 90 días',
  },
  {
    texto:
      '"Dejé de necesitar la aprobación de mi equipo para sentirme segura. Algo que sonaba imposible se volvió lo más natural del mundo. Mi liderazgo cambió por completo."',
    nombre: 'CEO · Startup de Salud',
    detalle: 'Monterrey · Día Intensivo VIP',
  },
  {
    texto:
      '"Por primera vez en años me fui de vacaciones sin sentir que algo estaba mal. La calma dejó de ser algo que tenía que merecer. Simplemente está."',
    nombre: 'Abogada · Bufete propio',
    detalle: 'Barcelona · Programa 90 días',
  },
  {
    texto:
      '"Me acompañó a tomar la decisión más difícil de mi vida desde un lugar de claridad, no de miedo. Eso no tiene precio."',
    nombre: 'Empresaria · Sector Moda',
    detalle: 'CDMX · Mentoría de continuidad',
  },
];

export default function TestimoniosPage() {
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
          <div className="test-card test-destacado reveal">
            <div className="test-estrellas">★★★★★</div>
            <blockquote>
              &quot;Llegué creyendo que mi problema era mi pareja. Me fui con la
              claridad de que yo era el problema — pero no en el sentido en que
              suena. Sino en el sentido de que yo también era la solución. Eso lo
              cambió todo.&quot;
            </blockquote>
            <div className="test-autora">
              <div className="test-avatar"></div>
              <div className="test-nombre">
                <strong>Gerente de Proyectos · Tech</strong>
                <span>CDMX · Programa 90 días</span>
              </div>
            </div>
          </div>

          {TESTIMONIOS.map((t, i) => (
            <div className="test-card reveal" key={i}>
              <div className="test-estrellas">★★★★★</div>
              <blockquote>{t.texto}</blockquote>
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
