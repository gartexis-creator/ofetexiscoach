export const metadata = {
  title: 'Términos y Condiciones | Soberanía Relacional',
  description:
    'Condiciones de uso del sitio y de los servicios de coaching y acompañamiento de Soberanía Relacional (Ofelia Texis).',
};

const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'soberaniarelacional@gmail.com';

export default function TerminosPage() {
  return (
    <div className="page-legal">
      <div className="legal-hero">
        <div className="seccion-label center">Acuerdos claros, vínculos sanos</div>
        <h1>Términos y Condiciones</h1>
        <p>Última actualización: junio de 2026</p>
      </div>

      <div className="legal-body">
        <p>
          Bienvenida a <strong>Soberanía Relacional</strong>, de{' '}
          <strong>Ofelia García Texis</strong> («Ofelia Texis»). Al utilizar este
          sitio y nuestros servicios, aceptas los siguientes términos.
        </p>

        <h2>1. Naturaleza de los servicios</h2>
        <p>
          Soberanía Relacional ofrece servicios de <strong>coaching y
          acompañamiento de transformación y bienestar</strong>, basados en la
          comprensión de los 3 Principios de la experiencia humana.
        </p>
        <div className="legal-aviso">
          <p>
            <strong>Importante:</strong> el coaching <strong>no es terapia,
            psicología clínica, asesoría médica ni psiquiátrica</strong>, y{' '}
            <strong>no sustituye</strong> ningún tratamiento o atención profesional
            de la salud física o mental. Si atraviesas una crisis emocional, un
            problema de salud o una emergencia, te pedimos acudir a un profesional
            de la salud o a los servicios de emergencia correspondientes.
          </p>
        </div>

        <h2>2. La Sesión de Claridad</h2>
        <p>
          La Sesión de Claridad de 30 minutos es <strong>gratuita, exploratoria y
          sin compromiso</strong>. Su objetivo es conocernos y valorar si hay una
          alineación genuina para trabajar juntas.
        </p>

        <h2>3. Reservas, puntualidad y cancelaciones</h2>
        <ul>
          <li>
            Las sesiones se agendan a través del sistema de reservas del sitio, en
            el horario disponible (hora de la Ciudad de México).
          </li>
          <li>
            Te pedimos puntualidad. Si necesitas cancelar o reprogramar, avísanos
            con la mayor anticipación posible.
          </li>
          <li>
            En caso de inasistencia sin aviso, la sesión podrá considerarse no
            realizada.
          </li>
        </ul>

        <h2>4. Compromiso y resultados</h2>
        <p>
          El coaching es un proceso de acompañamiento; los resultados dependen en
          gran medida de tu participación, apertura y compromiso. Por la
          naturaleza personal de cada proceso, <strong>no se garantizan resultados
          específicos</strong>.
        </p>

        <h2>5. Confidencialidad</h2>
        <p>
          Todo lo que compartas en las sesiones se trata con respeto y
          confidencialidad, salvo que la ley exija lo contrario o exista un riesgo
          para tu integridad o la de terceros.
        </p>

        <h2>6. Programas y pagos</h2>
        <p>
          La Sesión de Claridad es gratuita. Los programas y servicios de
          acompañamiento tienen un costo que se te informará de forma clara antes
          de contratarlos. Las condiciones de pago se acuerdan de manera
          individual.
        </p>

        <h2>7. Propiedad intelectual</h2>
        <p>
          Los contenidos de este sitio, el método, los materiales, textos e
          imágenes son propiedad de Ofelia García Texis (Soberanía Relacional). No
          podrán reproducirse, distribuirse ni utilizarse con fines comerciales sin
          autorización por escrito.
        </p>

        <h2>8. Uso del sitio y responsabilidad</h2>
        <p>
          Te comprometes a usar este sitio de forma lícita y respetuosa. Soberanía
          Relacional no será responsable por decisiones que tomes con base en el
          contenido del sitio o de las sesiones, ni por interrupciones técnicas
          ajenas a nuestro control.
        </p>

        <h2>9. Modificaciones</h2>
        <p>
          Podemos actualizar estos Términos en cualquier momento. La versión
          vigente estará siempre disponible en esta página.
        </p>

        <h2>10. Legislación aplicable</h2>
        <p>
          Estos Términos se rigen por las leyes de los Estados Unidos Mexicanos,
          con jurisdicción en la Ciudad de México.
        </p>

        <p className="legal-fecha">
          ¿Dudas sobre estos Términos? Escríbenos a {EMAIL}.
        </p>
      </div>
    </div>
  );
}
