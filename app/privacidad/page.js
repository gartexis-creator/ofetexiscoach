export const metadata = {
  title: 'Aviso de Privacidad | Soberanía Relacional',
  description:
    'Cómo Soberanía Relacional (Ofelia Texis) recaba, usa y protege tus datos personales.',
};

const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'soberaniarelacional@gmail.com';

export default function PrivacidadPage() {
  return (
    <div className="page-legal">
      <div className="legal-hero">
        <div className="seccion-label center">Tu confianza importa</div>
        <h1>Aviso de Privacidad</h1>
        <p>Última actualización: junio de 2026</p>
      </div>

      <div className="legal-body">
        <p>
          En <strong>Soberanía Relacional</strong>, a cargo de{' '}
          <strong>Ofelia García Texis</strong> («Ofelia Texis»), tu privacidad y
          tu confianza son fundamentales. Este Aviso describe cómo recabamos,
          usamos y protegemos tus datos personales.
        </p>

        <h2>1. Responsable de tus datos</h2>
        <p>
          Ofelia García Texis (Soberanía Relacional) es la responsable del
          tratamiento de tus datos personales. Para cualquier asunto relacionado
          con tu privacidad, puedes escribirnos a{' '}
          <strong>{EMAIL}</strong>.
        </p>

        <h2>2. Datos que recabamos</h2>
        <p>
          Solo recabamos los datos que tú compartes de forma voluntaria a través
          del formulario de contacto o al reservar tu Sesión de Claridad:
        </p>
        <ul>
          <li>Nombre.</li>
          <li>Correo electrónico.</li>
          <li>Número de WhatsApp o teléfono (opcional).</li>
          <li>
            La información que decidas compartir en tus mensajes (por ejemplo, lo
            que te gustaría trabajar).
          </li>
        </ul>
        <p>
          No recabamos datos sensibles de forma deliberada. Te pedimos no incluir
          información de salud, financiera o especialmente sensible en los campos
          de texto abiertos.
        </p>

        <h2>3. Para qué usamos tus datos</h2>
        <ul>
          <li>
            Agendar, confirmar y dar seguimiento a tu Sesión de Claridad y, en su
            caso, a los programas de acompañamiento.
          </li>
          <li>Responder a tus consultas y mantener contacto contigo.</li>
          <li>Si lo autorizas, enviarte contenido y reflexiones (newsletter).</li>
          <li>Mejorar nuestros servicios y la experiencia del sitio.</li>
        </ul>
        <p>
          No utilizamos tus datos para fines distintos a los aquí señalados sin tu
          consentimiento.
        </p>

        <h2>4. Conservación y resguardo</h2>
        <p>
          Tus datos se almacenan de forma segura en plataformas de infraestructura
          confiables (como Supabase y Vercel), que pueden encontrarse fuera de
          México. Conservamos tu información únicamente durante el tiempo necesario
          para cumplir las finalidades descritas o hasta que solicites su
          eliminación.
        </p>

        <h2>5. No compartimos ni vendemos tus datos</h2>
        <p>
          Tus datos personales nunca se venden, rentan ni se comparten con
          terceros con fines comerciales. Únicamente se utilizan los proveedores
          tecnológicos necesarios para operar el sitio y agendar las sesiones.
        </p>

        <h2>6. Tus derechos (ARCO)</h2>
        <p>
          Tienes derecho a <strong>Acceder</strong>, <strong>Rectificar</strong>,{' '}
          <strong>Cancelar</strong> u <strong>Oponerte</strong> al uso de tus datos
          personales, así como a revocar tu consentimiento en cualquier momento.
          Para ejercer estos derechos, escríbenos a <strong>{EMAIL}</strong> y
          atenderemos tu solicitud.
        </p>

        <h2>7. Cookies</h2>
        <p>
          Este sitio utiliza únicamente cookies estrictamente necesarias para su
          funcionamiento (por ejemplo, para la sesión del panel de administración
          privado). No utilizamos cookies de publicidad ni de seguimiento de
          terceros.
        </p>

        <h2>8. Cambios a este Aviso</h2>
        <p>
          Podemos actualizar este Aviso de Privacidad para reflejar mejoras o
          cambios legales. La versión vigente estará siempre disponible en esta
          página.
        </p>

        <p className="legal-fecha">
          Si tienes dudas sobre este Aviso, contáctanos en {EMAIL}.
        </p>
      </div>
    </div>
  );
}
