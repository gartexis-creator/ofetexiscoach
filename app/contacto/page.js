import ContactoFlujo from '../components/ContactoFlujo';

export const metadata = {
  title: 'Agenda tu Sesión de Claridad | Soberanía Relacional',
  description:
    'Reserva en línea tu Sesión de Claridad: 30 minutos, sin costo y sin compromiso. Honesta, directa y desde la claridad.',
};

const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'soberaniarelacional@gmail.com';
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '525572473984';
const WA_MENSAJE = 'Hola Ofelia, vengo de tu página web y me gustaría agendar mi Sesión de Claridad. 🌸';

export default function ContactoPage() {
  const waHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WA_MENSAJE)}`;

  return (
    <div className="page-contacto">
      <div className="contacto-hero">
        <div className="seccion-label center">Hablemos</div>
        <h2 className="reveal">
          Agenda tu Sesión
          <br />
          de Claridad
        </h2>
        <p className="reveal">
          Una conversación de 30 minutos, sin costo y sin compromiso. Honesta,
          directa y desde la claridad.
        </p>
      </div>

      <div className="container">
        <div className="contacto-grid">
          <div className="contacto-info reveal">
            <h3>
              ¿Qué pasa en
              <br />
              esta sesión?
            </h3>
            <p>
              Conversamos sobre dónde estás, qué estás buscando y si hay una
              alineación genuina para trabajar juntas. Sin presión, sin relleno,
              con toda la presencia.
            </p>
            <p className="contacto-destacado">
              Dura 30 minutos · Es online · Es gratuita
            </p>
            <p style={{ fontSize: '.92rem', color: 'var(--nude-light)', fontWeight: 300, marginTop: 20 }}>
              Déjame tus datos y enseguida podrás elegir tu día y horario.
            </p>
            <div className="contacto-metodos">
              <a className="contacto-metodo" href={waHref} target="_blank" rel="noopener noreferrer">
                <div className="contacto-metodo-icon">💬</div>
                <div className="contacto-metodo-text">
                  <strong>WhatsApp directo</strong>
                  <span>Respuesta en menos de 24hrs</span>
                </div>
              </a>
              <a className="contacto-metodo" href={`mailto:${EMAIL}`}>
                <div className="contacto-metodo-icon">✉️</div>
                <div className="contacto-metodo-text">
                  <strong>{EMAIL}</strong>
                  <span>Para consultas o preguntas previas</span>
                </div>
              </a>
            </div>
          </div>

          <ContactoFlujo />
        </div>
      </div>
    </div>
  );
}
