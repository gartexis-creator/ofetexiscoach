// ============================================================
//  Lógica de disponibilidad para las Sesiones de Claridad
//  (30 min gratis) — horario de la Ciudad de México.
// ============================================================

export const TZ = 'America/Mexico_City';
export const TZ_LABEL = 'Ciudad de México';
export const DURACION_MIN = 30;
export const VENTANA_DIAS = 30; // cuántos días hacia adelante ofrecer

// Horas de inicio de cada bloque de 30 min (hora CDMX)
export const SLOTS_LUN_VIE = [
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '16:00', '16:30', '17:00', '17:30',
];
export const SLOTS_SABADO = ['11:00', '11:30', '12:00', '12:30', '13:00', '13:30'];

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

// Día de la semana (0=Dom .. 6=Sáb) de una fecha 'YYYY-MM-DD'.
// Usamos mediodía UTC para evitar desfases por zona horaria.
function diaSemana(ymd) {
  return new Date(`${ymd}T12:00:00Z`).getUTCDay();
}

export function slotsParaFecha(ymd) {
  const d = diaSemana(ymd);
  if (d === 0) return []; // domingo: sin atención
  if (d === 6) return SLOTS_SABADO;
  return SLOTS_LUN_VIE;
}

// Hora y fecha actuales en la Ciudad de México.
export function ahoraCDMX() {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false,
  });
  const p = Object.fromEntries(fmt.formatToParts(new Date()).map((x) => [x.type, x.value]));
  let hh = parseInt(p.hour, 10);
  if (hh === 24) hh = 0;
  return {
    fecha: `${p.year}-${p.month}-${p.day}`,
    minutos: hh * 60 + parseInt(p.minute, 10),
  };
}

export function sumarDias(ymd, n) {
  const d = new Date(`${ymd}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export function etiquetaFecha(ymd) {
  const d = new Date(`${ymd}T12:00:00Z`);
  return `${DIAS[d.getUTCDay()]}, ${d.getUTCDate()} de ${MESES[d.getUTCMonth()]}`;
}

export function etiquetaFechaCorta(ymd) {
  const d = new Date(`${ymd}T12:00:00Z`);
  return { dia: DIAS[d.getUTCDay()].slice(0, 3), num: d.getUTCDate(), mes: MESES[d.getUTCMonth()].slice(0, 3) };
}

export function minutosDeHora(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

// Rango horario de un slot en formato legible: "11:00 a 11:30"
export function rangoHora(hhmm) {
  const fin = minutosDeHora(hhmm) + DURACION_MIN;
  const fh = String(Math.floor(fin / 60)).padStart(2, '0');
  const fm = String(fin % 60).padStart(2, '0');
  return `${hhmm} a ${fh}:${fm}`;
}

// Momento exacto del slot como ISO con offset CDMX (UTC-6, sin horario de verano).
export function inicioISO(ymd, hhmm) {
  return `${ymd}T${hhmm}:00-06:00`;
}

// Valida que un (fecha, hora) corresponda a un slot real del horario.
export function esSlotValido(ymd, hhmm) {
  return slotsParaFecha(ymd).includes(hhmm);
}
