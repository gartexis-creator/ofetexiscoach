import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseServer';
import {
  ahoraCDMX, sumarDias, slotsParaFecha, etiquetaFecha, minutosDeHora,
  esSlotValido, inicioISO, VENTANA_DIAS, TZ_LABEL,
} from '@/lib/reservas';

export const dynamic = 'force-dynamic';

const BUFFER_MIN = 30; // no permitir reservar con menos de 30 min de anticipación

// ---------- GET: días y horarios disponibles ----------
export async function GET() {
  const supabase = getSupabaseServer();
  const ahora = ahoraCDMX();
  const finVentana = sumarDias(ahora.fecha, VENTANA_DIAS);

  // Slots ya ocupados en la ventana
  const ocupados = new Set();
  if (supabase) {
    const { data } = await supabase
      .from('reservas')
      .select('fecha, hora')
      .gte('fecha', ahora.fecha)
      .lte('fecha', finVentana);
    (data || []).forEach((r) => ocupados.add(`${r.fecha} ${r.hora}`));
  }

  const dias = [];
  for (let i = 0; i <= VENTANA_DIAS; i++) {
    const fecha = sumarDias(ahora.fecha, i);
    let slots = slotsParaFecha(fecha);
    if (!slots.length) continue;

    if (fecha === ahora.fecha) {
      slots = slots.filter((s) => minutosDeHora(s) > ahora.minutos + BUFFER_MIN);
    }
    slots = slots.filter((s) => !ocupados.has(`${fecha} ${s}`));

    if (slots.length) dias.push({ fecha, etiqueta: etiquetaFecha(fecha), slots });
  }

  return NextResponse.json({ dias, tz: TZ_LABEL, configurado: !!supabase });
}

// ---------- POST: crear una reserva ----------
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Datos inválidos.' }, { status: 400 });
  }

  const { nombre, correo, whatsapp, fecha, hora, mensaje } = body || {};

  if (!nombre || !correo) {
    return NextResponse.json({ error: 'El nombre y el correo son obligatorios.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    return NextResponse.json({ error: 'Escribe un correo electrónico válido.' }, { status: 400 });
  }
  if (!fecha || !hora || !esSlotValido(fecha, hora)) {
    return NextResponse.json({ error: 'Ese horario no es válido. Elige otro, por favor.' }, { status: 400 });
  }

  // No permitir reservar en el pasado
  const ahora = ahoraCDMX();
  if (fecha < ahora.fecha || (fecha === ahora.fecha && minutosDeHora(hora) <= ahora.minutos)) {
    return NextResponse.json({ error: 'Ese horario ya pasó. Elige otro, por favor.' }, { status: 400 });
  }

  const supabase = getSupabaseServer();
  if (!supabase) {
    // Sin base de datos no podemos reservar de verdad.
    return NextResponse.json({ ok: true, stored: false });
  }

  const { error } = await supabase.from('reservas').insert({
    nombre,
    correo,
    whatsapp: whatsapp || null,
    fecha,
    hora,
    inicio: inicioISO(fecha, hora),
    mensaje: mensaje || null,
    estado: 'pendiente',
  });

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'Ese horario acaba de ocuparse. Por favor elige otro.' },
        { status: 409 }
      );
    }
    console.error('[reservar] Error:', error.message);
    return NextResponse.json({ error: 'No se pudo completar la reserva. Intenta de nuevo.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true, stored: true });
}
