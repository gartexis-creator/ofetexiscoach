import NewsletterForm from '../components/NewsletterForm';
import ProximamenteLink from '../components/ProximamenteLink';

export const metadata = {
  title: 'El Blog | Soberanía Relacional',
  description:
    'Artículos para la mujer que ya sabe que el cambio real no viene de más información, sino de una comprensión más profunda.',
};

const ARTICULOS = [
  {
    bg: 'bg-1',
    emoji: '🌿',
    cat: 'Relaciones',
    meta: 'Febrero 2026 · 6 min',
    titulo: 'Cuando controlas porque amas (o eso crees)',
    extracto:
      'El control disfrazado de amor es una de las trampas más comunes en las relaciones. Veamos qué hay debajo.',
  },
  {
    bg: 'bg-2',
    emoji: '🧠',
    cat: 'Mente',
    meta: 'Febrero 2026 · 5 min',
    titulo: 'El sobrepensamiento no es tu problema — es el síntoma',
    extracto:
      'Intentar dejar de pensar de más es como intentar no ver una ilusión óptica. La clave es comprender cómo funciona.',
  },
  {
    bg: 'bg-3',
    emoji: '✨',
    cat: 'Liderazgo',
    meta: 'Enero 2026 · 7 min',
    titulo: 'Liderar desde la claridad: el superpoder que nadie enseña',
    extracto:
      'Las mejores decisiones de liderazgo no vienen de más información. Vienen de una mente más quieta.',
  },
  {
    bg: 'bg-4',
    emoji: '🌙',
    cat: 'Bienestar',
    meta: 'Enero 2026 · 4 min',
    titulo: 'Por qué la meditación no te está funcionando',
    extracto:
      'No es que estés haciéndola mal. Es que estás buscando algo que ya tienes — y ninguna técnica puede dártelo.',
  },
  {
    bg: 'bg-5',
    emoji: '💫',
    cat: 'Soberanía',
    meta: 'Diciembre 2025 · 6 min',
    titulo: 'El día que dejé de necesitar que me entendieran',
    extracto:
      'Un artículo personal sobre el camino de soltar la necesidad de validación — y lo que encontré al otro lado.',
  },
];

export default function BlogPage() {
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
          <div className="blog-card blog-destacado reveal">
            <div className="blog-card-img">
              <div className="blog-card-img-bg bg-dest">🌸</div>
              <span className="blog-card-cat">Destacado</span>
            </div>
            <div className="blog-card-body">
              <div className="blog-card-meta">Marzo 2026 · 8 min lectura</div>
              <h3>La paz no se construye: se recupera</h3>
              <p>
                Durante años creí que la calma era algo que se ganaba con
                esfuerzo, disciplina y las condiciones correctas. Hasta que
                entendí que la estaba buscando en el lugar equivocado. Este
                artículo es el inicio de todo.
              </p>
              <ProximamenteLink mensaje="Próximamente: artículo completo">
                Leer artículo completo
              </ProximamenteLink>
            </div>
          </div>

          {/* Artículos regulares */}
          {ARTICULOS.map((a, i) => (
            <div className="blog-card reveal" key={i}>
              <div className="blog-card-img">
                <div className={`blog-card-img-bg ${a.bg}`}>{a.emoji}</div>
                <span className="blog-card-cat">{a.cat}</span>
              </div>
              <div className="blog-card-body">
                <div className="blog-card-meta">{a.meta}</div>
                <h3>{a.titulo}</h3>
                <p>{a.extracto}</p>
                <ProximamenteLink>Leer más</ProximamenteLink>
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
