'use client';

import { useState } from 'react';

const FAQS = [
  {
    q: '¿Cómo sé si este programa es para mí?',
    a: 'Si te identificas con sentirte sobrepasada emocionalmente aunque tengas todo "en orden" externamente, si eres exigente contigo misma y tu bienestar depende de que todo salga bien — este trabajo es para ti. La sesión exploratoria gratuita es el mejor primer paso para verificarlo.',
  },
  {
    q: '¿Las sesiones son presenciales u online?',
    a: 'Todas las sesiones son online vía videollamada, lo cual permite acompañar a mujeres en cualquier ciudad o país. El Día Intensivo VIP puede ser presencial en CDMX bajo consulta previa.',
  },
  {
    q: '¿En qué se diferencia esto de la terapia?',
    a: 'La terapia trabaja desde el pasado hacia el presente. Este mentoring trabaja desde la comprensión de cómo funciona la mente — sin necesidad de procesar el trauma, sino de ver su mecanismo. El resultado es una comprensión que transforma, no una catarsis que hay que repetir.',
  },
  {
    q: '¿Hay una sesión gratuita antes de comprometerme?',
    a: 'Sí. Ofrezco una Sesión de Claridad exploratoria de 30 minutos donde conversamos sobre tu situación, lo que estás buscando y si hay una alineación genuina para trabajar juntas. Sin presión, con total honestidad.',
  },
];

export default function Faq() {
  const [open, setOpen] = useState(null);

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto' }} id="faq">
      {FAQS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div className="faq-item reveal" key={i}>
            <div
              className="faq-head"
              onClick={() => setOpen(isOpen ? null : i)}
              role="button"
            >
              <h4>{item.q}</h4>
              <span
                className="faq-icon"
                style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
              >
                +
              </span>
            </div>
            <p
              className="faq-body"
              style={{
                maxHeight: isOpen ? '400px' : '0px',
                marginTop: isOpen ? '16px' : '0',
              }}
            >
              {item.a}
            </p>
          </div>
        );
      })}
    </div>
  );
}
