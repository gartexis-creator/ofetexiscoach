import { getSupabaseServer } from '@/lib/supabaseServer';

// ============================================================
//  Lectura de contenido para la WEB PÚBLICA.
//  Se lee desde el servidor con la clave service_role.
//  Si Supabase no está configurado (o hay un error / no hay datos),
//  devolvemos contenido de respaldo para que la web nunca se rompa.
// ============================================================

export const revalidate = 0; // siempre datos frescos

// ---------- Respaldos estáticos ----------
const ARTICULOS_FALLBACK = [
  {
    slug: 'la-libertad-de-no-creer-todo-lo-que-piensas',
    titulo: 'La libertad de no creer todo lo que piensas',
    extracto:
      'El sobrepensamiento no es un defecto de tu carácter: es una señal de que tomaste un pensamiento pasajero como si fuera una verdad absoluta. Aprende a soltar el ruido mental.',
    contenido:
      'A veces, el ruido mental se vuelve tan ensordecedor que parece la única realidad disponible. Te encuentras analizando cada gesto de tu pareja, cada palabra no dicha o cada silencio, creyendo firmemente que si logras resolver ese rompecabezas emocional, por fin tendrás permiso para descansar.\n\nPero aquí hay un secreto que te devolverá el mando de tu vida: no estás sintiendo tu relación, estás sintiendo tu pensamiento sobre ella en este preciso instante.\n\nEl sobrepensamiento no es un defecto de tu carácter ni una señal de que algo está roto en ti. Es, en realidad, una forma de "Inocencia Psicológica": una señal de que has tomado una proyección mental momentánea como si fuera una verdad absoluta y permanente.\n\nEl espejismo del control\n\nPasamos años intentando "arreglar" lo que pensamos o forzando el entorno para que se ajuste a nuestras expectativas de orden. Sin embargo, la claridad no aparece cuando logras controlar el exterior, sino cuando comprendes la naturaleza de tu interior.\n\nTu bienestar no es un edificio que debas construir con esfuerzo; es una corriente de salud innata que fluye por debajo de cualquier tormenta. En el momento en que dejas de intentar fabricar tu paz, descubres que ella nunca te abandonó.\n\nLa vida se vuelve mucho más fácil cuando dejas de tomar tus narrativas de miedo como si fueran noticias de última hora.',
    categoria: 'Mente',
    emoji: '🧠',
    color_bg: 'bg-2',
    imagen_url: null,
    tiempo_lectura: '5 min',
    destacado: true,
    publicado: true,
  },
  {
    slug: 'y-si-tu-paz-no-dependiera-de-tu-entorno',
    titulo: '¿Y si tu paz no dependiera de que tu entorno se alinee?',
    extracto:
      '¿Y si tu calma no dependiera de que tu pareja o tu entorno cambien? Tu bienestar no es condicional: es de fábrica.',
    contenido:
      'Pasamos gran parte de nuestra vida operando bajo una "Inocencia Psicológica": la creencia de que nuestro bienestar es una consecuencia directa de lo que sucede afuera. Te dices a ti misma que, si tu pareja fuera más atenta, más ordenada o más comprensiva, por fin podrías experimentar esa calma que tanto anhelas.\n\nPero la realidad es mucho más sencilla y, a la vez, más liberadora: tu bienestar no es condicional.\n\nCreer que necesitas que el otro cambie para estar bien es como intentar arreglar el reflejo en un espejo sin tocar el objeto original. El conflicto que sientes no es una disputa sobre hechos objetivos; es el choque de dos mundos psicológicos distintos operando desde sus propios sistemas de pensamiento.\n\nCuando comprendes que tu paz es de fábrica y que no depende de que las piezas de tu vida encajen perfectamente, dejas de ser una rehén de las circunstancias. La verdadera Soberanía nace cuando te das cuenta de que ya eres el océano, no importa qué tan fuerte sople el viento en la superficie.',
    categoria: 'Relaciones',
    emoji: '🌿',
    color_bg: 'bg-1',
    imagen_url: null,
    tiempo_lectura: '4 min',
    destacado: false,
    publicado: true,
  },
  {
    slug: 'no-necesitas-ser-mas-fuerte-sino-mas-presente',
    titulo: 'No necesitas ser más fuerte, necesitas estar más presente',
    extracto:
      'No necesitas aguantar más ni ser más fuerte. La diferencia entre la resiliencia y el modo supervivencia es un momento de claridad.',
    contenido:
      'A muchas de nosotras nos enseñaron que el valor de una mujer se mide por su capacidad de "aguantar". Nos convertimos en expertas de la resiliencia forzada, creyendo que ser una buena esposa o madre significa sostener el peso del mundo sobre los hombros sin quejarse.\n\nSin embargo, hay una gran diferencia entre ser resiliente y estar en modo supervivencia.\n\nEl agotamiento que sientes no es por la carga de tus tareas, sino por la energía que consumes intentando que la realidad sea distinta a lo que es. La verdadera Soberanía Relacional no se trata de aprender a tolerar más el malestar; se trata de ver que el malestar es solo una señal de que has perdido de vista tu salud innata.\n\nNo necesitas otra técnica de gestión del tiempo ni otro protocolo de comunicación agotador. Necesitas un momento de claridad para ver que ya eres libre. La vida se vuelve increíblemente fácil cuando dejas de luchar contra tus propios pensamientos y permites que tu sabiduría natural tome el mando.',
    categoria: 'Soberanía',
    emoji: '💫',
    color_bg: 'bg-5',
    imagen_url: null,
    tiempo_lectura: '4 min',
    destacado: false,
    publicado: true,
  },
];

const TESTIMONIOS_FALLBACK = [
  { texto: 'Llegué creyendo que mi problema era mi pareja. Me fui con la claridad de que yo era el problema — pero no en el sentido en que suena. Sino en el sentido de que yo también era la solución. Eso lo cambió todo.', nombre: 'Gerente de Proyectos · Tech', detalle: 'CDMX · Programa 90 días', estrellas: 5, destacado: true, publicado: true },
  { texto: 'En 6 semanas entendí más sobre cómo funciona mi mente que en 3 años de terapia. No es que la terapia no sirva — es que esto trabaja desde otro lugar completamente.', nombre: 'Directora Creativa', detalle: 'Guadalajara · Programa 90 días', estrellas: 5, destacado: false, publicado: true },
  { texto: 'Dejé de necesitar la aprobación de mi equipo para sentirme segura. Algo que sonaba imposible se volvió lo más natural del mundo. Mi liderazgo cambió por completo.', nombre: 'CEO · Startup de Salud', detalle: 'Monterrey · Día Intensivo VIP', estrellas: 5, destacado: false, publicado: true },
  { texto: 'Por primera vez en años me fui de vacaciones sin sentir que algo estaba mal. La calma dejó de ser algo que tenía que merecer. Simplemente está.', nombre: 'Abogada · Bufete propio', detalle: 'Barcelona · Programa 90 días', estrellas: 5, destacado: false, publicado: true },
  { texto: 'Me acompañó a tomar la decisión más difícil de mi vida desde un lugar de claridad, no de miedo. Eso no tiene precio.', nombre: 'Empresaria · Sector Moda', detalle: 'CDMX · Mentoría de continuidad', estrellas: 5, destacado: false, publicado: true },
];

const PROGRAMAS_FALLBACK = [
  { slug: 'soberania-relacional-90-dias', badge: '✦ Programa insignia', titulo: 'Soberanía Relacional\n90 días', descripcion: 'El programa completo de transformación. Diseñado para la mujer que está lista para ir a la raíz y no volver a vivir rehén de su mente o su entorno.', items: ['12 sesiones individuales de 60 min', 'Acceso a materiales exclusivos del método', 'Soporte por voz entre sesiones', 'Comunidad privada de mujeres en el proceso', 'Grabaciones de cada sesión'], duracion: '90 días · Inicio por agenda', cta_texto: 'Quiero este programa', cta_estilo: 'dorado', destacado: true, ancho_completo: false, requisito: null, publicado: true },
  { slug: 'dia-intensivo-de-claridad', badge: 'Inmersión VIP', titulo: 'Día Intensivo de Claridad', descripcion: 'Una jornada completa de trabajo profundo para quienes necesitan un punto de quiebre inmediato. Ideal si tienes una decisión importante por tomar o una situación que se siente urgente.', items: ['4 horas de trabajo enfocado contigo', 'Pre-trabajo de diagnóstico personalizado', 'Plan de acción post-sesión', 'Seguimiento de 2 semanas por audio'], duracion: '1 día · Formato presencial u online', cta_texto: 'Agendar mi día VIP', cta_estilo: 'primario', destacado: false, ancho_completo: false, requisito: null, publicado: true },
  { slug: 'mentoria-de-mantenimiento', badge: 'Para quien ya inició', titulo: 'Mentoría de Mantenimiento', descripcion: 'Para mujeres que ya han trabajado el método y quieren un espacio de continuidad, profundización y acompañamiento mensual.', items: ['2 sesiones al mes de 60 min', 'Soporte por voz entre sesiones', 'Acceso a nuevos materiales', 'Revisión trimestral de avances'], duracion: 'Renovable mensualmente', cta_texto: 'Consultar disponibilidad', cta_estilo: 'secundario', destacado: false, ancho_completo: true, requisito: 'Haber completado el programa de 90 días o una sesión de claridad previa.', publicado: true },
];

// ---------- Lectores ----------
export async function getArticulos() {
  const supabase = getSupabaseServer();
  if (!supabase) return ARTICULOS_FALLBACK;
  const { data, error } = await supabase
    .from('articulos')
    .select('*')
    .eq('publicado', true)
    .order('destacado', { ascending: false })
    .order('orden', { ascending: false })
    .order('creado_en', { ascending: false });
  if (error || !data || data.length === 0) return ARTICULOS_FALLBACK;
  return data;
}

export async function getArticuloBySlug(slug) {
  const supabase = getSupabaseServer();
  if (!supabase) return ARTICULOS_FALLBACK.find((a) => a.slug === slug) || null;
  const { data, error } = await supabase
    .from('articulos')
    .select('*')
    .eq('slug', slug)
    .eq('publicado', true)
    .maybeSingle();
  if (error || !data)
    return ARTICULOS_FALLBACK.find((a) => a.slug === slug) || null;
  return data;
}

export async function getTestimonios() {
  const supabase = getSupabaseServer();
  if (!supabase) return TESTIMONIOS_FALLBACK;
  const { data, error } = await supabase
    .from('testimonios')
    .select('*')
    .eq('publicado', true)
    .order('destacado', { ascending: false })
    .order('orden', { ascending: false })
    .order('creado_en', { ascending: false });
  if (error || !data || data.length === 0) return TESTIMONIOS_FALLBACK;
  return data;
}

export async function getProgramas() {
  const supabase = getSupabaseServer();
  if (!supabase) return PROGRAMAS_FALLBACK;
  const { data, error } = await supabase
    .from('programas')
    .select('*')
    .eq('publicado', true)
    .order('orden', { ascending: false })
    .order('creado_en', { ascending: true });
  if (error || !data || data.length === 0) return PROGRAMAS_FALLBACK;
  return data;
}
