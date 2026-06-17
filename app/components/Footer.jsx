import Link from 'next/link';

const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hola@soberaniarelacional.com';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-logo-sec">
            <div className="footer-logo">Soberanía Relacional</div>
            <p>
              Mentoring exclusivo para la mujer que elige la paz. Basado en los
              Tres Principios y la Soberanía Interna.
            </p>
          </div>
          <div className="footer-col">
            <h5>Navegar</h5>
            <ul>
              <li><Link href="/">Inicio</Link></li>
              <li><Link href="/servicios">Programas</Link></li>
              <li><Link href="/sobre-mi">Sobre mí</Link></li>
              <li><Link href="/testimonios">Testimonios</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Recursos</h5>
            <ul>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contacto">Agendar sesión</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Contacto</h5>
            <ul>
              <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              <li><Link href="/contacto">WhatsApp</Link></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Soberanía Relacional · Todos los derechos reservados</p>
          <div className="footer-social">
            <a title="Instagram" href="https://instagram.com" target="_blank" rel="noopener noreferrer">&#9769;</a>
            <a title="WhatsApp" href="/contacto">&#9742;</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
