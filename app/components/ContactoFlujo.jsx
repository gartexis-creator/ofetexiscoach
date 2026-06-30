'use client';

import Reservas from './Reservas';

// El flujo de contacto es directo: el calendario primero.
// La persona elige día y hora, luego deja sus datos. Mínima fricción.
export default function ContactoFlujo() {
  return (
    <div className="reservas-bloque reveal">
      <Reservas />
    </div>
  );
}
