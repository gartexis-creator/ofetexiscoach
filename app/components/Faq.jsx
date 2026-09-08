'use client';

import { useState } from 'react';

const FAQS = [
  {
    q: '¿Cómo sé si este proceso es para mí?',
    a: 'Si estás agotada de esperar a que la otra persona cambie para poder estar tranquila, si reaccionas y luego te sientes mal, o si sientes que tu paz depende de lo que hagan los demás — este trabajo es para ti. La sesión gratuita de 30 minutos es el mejor primer paso para confirmarlo.',
  },
  {
    q: '¿Cuánto cuesta y cómo se paga?',
    a: 'El proceso Esencial son 4 sesiones ($2,800 MXN), que puedes pagar sesión por sesión o en un solo pago. El proceso Completo son 6 sesiones ($3,300 MXN) con pago único por adelantado. Los detalles los vemos juntas en tu sesión gratuita, sin ningún compromiso.',
  },
  {
    q: '¿Las sesiones son presenciales u online?',
    a: 'Todas las sesiones son online, de 60 minutos, para poder acompañarte estés donde estés —en México, Latinoamérica o Estados Unidos.',
  },
  {
    q: '¿En qué se diferencia esto de la terapia?',
    a: 'La terapia trabaja desde el pasado hacia el presente. Este acompañamiento trabaja desde la comprensión de cómo funciona la mente — sin necesidad de procesar el trauma, sino de ver su mecanismo. El resultado es una comprensión que transforma, no una catarsis que hay que repetir.',
  },
  {
    q: '¿Hay una sesión gratuita antes de comprometerme?',
    a: 'Sí. Es una sesión de 30 minutos donde conversamos sobre tu situación, lo que estás buscando y si tiene sentido trabajar juntas. Sin presión, con total honestidad.',
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
