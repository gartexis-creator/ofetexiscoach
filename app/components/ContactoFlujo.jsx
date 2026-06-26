'use client';

import { useState } from 'react';
import ContactForm from './ContactForm';
import Reservas from './Reservas';

export default function ContactoFlujo() {
  const [datos, setDatos] = useState(null);

  if (datos) {
    return (
      <div className="contacto-form reveal">
        <div className="flujo-gracias">
          <div className="success-icon">✨</div>
          <h4>¡Gracias, {datos.nombre}!</h4>
          <p>
            Tu mensaje llegó. Como último paso, elige el día y el horario para tu
            Sesión de Claridad gratuita de 30 min 👇
          </p>
        </div>
        <Reservas inicial={datos} />
      </div>
    );
  }

  return <ContactForm onEnviado={setDatos} />;
}
