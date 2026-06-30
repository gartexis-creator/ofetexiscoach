import ContactoFlujo from '../components/ContactoFlujo';

export const metadata = {
  title: 'Agenda tu primera sesión gratis | Ofelia Texis',
  description:
    'Reserva en línea tu primera sesión gratuita de coaching: 30 minutos, online, sin costo y sin compromiso. Elige tu día y horario.',
};

const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'soberaniarelacional@gmail.com';
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '525572473984';
const WA_MENSAJE = 'Hola Ofelia, vengo de tu página web y me gustaría agendar mi primera sesión gratuita. 🌸';

export default function ContactoPage() {
  const waHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WA_MENSAJE)}`;

  return (
    <div className="page-contacto">
      <div className="contacto-hero">
        <div className="seccion-label center">Hablemos</div>
        <h2 className="reveal">
          Agenda tu primera
          <br />
          sesión gratis
        </h2>
        <p className="reveal">
          Elige tu día y horario aquí abajo. Una conversación de 30 minutos,
          online, sin costo y sin compromiso.
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
              Me cuentas qué estás viviendo y qué buscas. Te escucho, te doy una
              primera mirada honesta y, si hay alineación, te explico cómo
              podríamos trabajar juntas. Sin presión y sin relleno.
            </p>
            <p className="contacto-destacado">
              Dura 30 minutos · Es online · Es gratuita
            </p>
            <p style={{ fontSize: '.92rem', color: 'var(--nude-light)', fontWeight: 300, marginTop: 20 }}>
              Elige tu día y horario, deja tus datos y listo. Así de simple.
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
