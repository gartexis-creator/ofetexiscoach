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
      'A veces, el ruido mental se vuelve tan ensordecedor que parece la única realidad disponible. Te encuentras analizando cada gesto de tu pareja, cada palabra no dicha o cada silencio, convencida de que si logras resolver ese rompecabezas emocional, por fin tendrás permiso para descansar.\n\nPero aquí hay un secreto que puede devolverte el mando de tu vida: no estás sintiendo tu relación, ni tu trabajo, ni tu pasado. Estás sintiendo tu pensamiento sobre ellos en este preciso instante.\n\nLos tres principios de la experiencia humana\n\nHace décadas, Sydney Banks describió algo tan sencillo como profundo: toda nuestra vivencia nace de tres principios. La Mente, que es la inteligencia y la energía que da vida a todo lo que existe; la Consciencia, que es la capacidad de darnos cuenta y de hacer real, ante nuestros ojos, aquello que pensamos; y el Pensamiento, el poder creativo con el que, momento a momento, damos forma a nuestra experiencia.\n\nDicho de otro modo: no vivimos los hechos de nuestra vida, vivimos el pensamiento que tenemos sobre ellos, vuelto sensación gracias a la consciencia. Por eso dos personas pueden atravesar la misma situación y habitar dos mundos completamente distintos.\n\nEl sobrepensamiento no es tu enemigo\n\nCuando lo comprendes, el sobrepensamiento deja de ser un defecto de tu carácter o una señal de que algo está roto en ti. Es, simplemente, lo que ocurre cuando tomamos un pensamiento pasajero como si fuera una verdad permanente. A esa confusión tan humana se le llama "inocencia psicológica": creer, de buena fe, que lo que sentimos viene de afuera y no de nuestro propio pensar.\n\nIntentar controlar o "arreglar" cada pensamiento es como querer alisar con las manos el reflejo del agua: cuanto más la agitas, más se distorsiona la imagen.\n\nLa mente se aclara sola\n\nImagina un vaso de agua con tierra revuelta. No necesitas hacer nada para limpiarlo; solo dejar de moverlo. Las partículas se asientan por sí solas y el agua vuelve a estar clara. Tu mente funciona igual: la claridad no es algo que tengas que fabricar con esfuerzo, es tu estado natural cuando dejas de añadir pensamiento sobre pensamiento.\n\nTu bienestar no es un edificio que debas construir; es una corriente de salud innata que sigue fluyendo por debajo de cualquier tormenta. En el momento en que dejas de intentar fabricar tu paz, descubres que nunca te abandonó.\n\nComprensión, no técnica\n\nPor eso este camino no se trata de aprender una técnica más para "dejar de pensar". Se trata de ver —de comprender— cómo funciona realmente tu experiencia. Y un solo destello de esa comprensión, un instante de claridad genuina, transforma tu manera de vivir más que mil intentos de controlar la mente.\n\nLa vida se vuelve mucho más ligera cuando dejas de tomar tus narrativas de miedo como si fueran noticias de última hora. Porque, en el fondo, siempre estás a un solo pensamiento de distancia de la paz.',
    categoria: 'Mente',
    emoji: '🧠',
    color_bg: 'bg-2',
    imagen_url: null,
    tiempo_lectura: '6 min',
    destacado: true,
    publicado: true,
  },
  {
    slug: 'y-si-tu-paz-no-dependiera-de-tu-entorno',
    titulo: '¿Y si tu paz no dependiera de que tu entorno se alinee?',
    extracto:
      '¿Y si tu calma no dependiera de que tu pareja o tu entorno cambien? Tu bienestar no es condicional: es de fábrica.',
    contenido:
      'Pasamos gran parte de la vida operando bajo una creencia silenciosa: que nuestro bienestar es una consecuencia directa de lo que sucede afuera. Te dices que, si tu pareja fuera más atenta, si tu familia fuera más comprensiva, si las circunstancias por fin se ordenaran, entonces sí podrías sentir esa calma que tanto anhelas.\n\nA esa creencia tan extendida la llamamos "inocencia psicológica". No es un error ni una falla de carácter: es, sencillamente, no haber visto todavía de dónde nace de verdad nuestra experiencia.\n\n¿De afuera hacia adentro, o de adentro hacia afuera?\n\nLos tres principios de la experiencia humana, articulados por primera vez por Sydney Banks, apuntan a algo que lo cambia todo: nuestra vivencia se crea de adentro hacia afuera, no de afuera hacia adentro. La Mente nos da la energía de la vida; el Pensamiento da forma a nuestra realidad personal; y la Consciencia la vuelve experiencia viva. Sentimos nuestro pensamiento, no el mundo.\n\nEsto significa que ninguna circunstancia —ni siquiera la persona más difícil— tiene el poder de meterse dentro de tu mente y crear lo que sientes. Lo que sientes siempre llega por la vía de tu propio pensar, instante a instante.\n\nEl conflicto, visto con otros ojos\n\nDesde aquí, una discusión deja de ser una disputa sobre hechos objetivos y se revela como lo que realmente es: el encuentro de dos mundos de pensamiento, cada uno viviendo su propia realidad como si fuera la única verdad posible.\n\nCreer que necesitas que el otro cambie para estar en paz es como intentar corregir tu reflejo en el espejo sin tocarte a ti misma. El cambio nunca estuvo ahí afuera.\n\nTu paz es de fábrica\n\nCuando comprendes que tu bienestar no es condicional —que es de fábrica, parte de tu naturaleza, siempre disponible por debajo del ruido—, dejas de ser rehén de las circunstancias. Te das cuenta de que eres el océano entero, no las olas de la superficie; y por fuerte que sople el viento, el fondo permanece en calma.\n\nY esto no es resignación ni "aguantar". Es justo lo contrario: cuando baja el ruido mental, dejas de responder desde el miedo o el control y empiezas a hacerlo desde la claridad. Muchas veces, sin siquiera proponértelo, tus vínculos comienzan a transformarse… porque la que cambió fuiste tú.\n\n¿Y si tu paz no dependiera de que tu entorno se alinee? Quizá descubras que esa libertad siempre estuvo dentro de ti, esperando ser recordada.',
    categoria: 'Relaciones',
    emoji: '🌿',
    color_bg: 'bg-1',
    imagen_url: null,
    tiempo_lectura: '6 min',
    destacado: false,
    publicado: true,
  },
  {
    slug: 'no-necesitas-ser-mas-fuerte-sino-mas-presente',
    titulo: 'No necesitas ser más fuerte, necesitas estar más presente',
    extracto:
      'No necesitas aguantar más ni ser más fuerte. La diferencia entre la resiliencia y el modo supervivencia es un momento de claridad.',
    contenido:
      'A muchas de nosotras nos enseñaron que el valor de una mujer se mide por su capacidad de "aguantar". Nos volvimos expertas en la resiliencia forzada, creyendo que ser buena hija, buena pareja o buena madre significaba sostener el peso del mundo sobre los hombros sin quejarnos.\n\nPero hay una diferencia enorme entre ser resiliente y vivir en modo supervivencia.\n\nDe dónde viene de verdad el agotamiento\n\nEl cansancio que sientes no nace tanto de tus tareas como de la energía que gastas peleándote, en silencio, con la realidad: con el pensamiento constante de que las cosas deberían ser distintas a como son.\n\nLos tres principios de la experiencia humana, que Sydney Banks articuló por primera vez, ofrecen aquí una clave preciosa. Nuestros sentimientos no nos informan de lo que pasa afuera; nos informan de la calidad de nuestro pensamiento en este momento. El malestar no es la prueba de que algo esté roto en ti: es una brújula. Te avisa, con cariño, de que te has enredado en el pensar… y de que también puedes soltar.\n\nNo necesitas más fuerza\n\nPor eso la salida no es endurecerte ni sumar otra técnica de gestión emocional. No necesitas ser más fuerte. Necesitas estar más presente: un momento de claridad para ver que, por debajo del ruido, tu bienestar sigue intacto.\n\nCuando la mente se aquieta —y lo hace sola, en cuanto dejas de alimentarla con esfuerzo—, emerge una sabiduría que ya vivía en ti. Esa salud innata es tu estado base, no una meta lejana que debas conquistar.\n\nLa paz no se construye: se recupera\n\nLa verdadera Soberanía Relacional no consiste en aprender a tolerar más el malestar, sino en recordar lo que siempre fuiste. No es un edificio que levantas con disciplina; es un regreso a casa. Dejas de luchar contra tus propios pensamientos, permites que tu sabiduría natural tome el mando, y la vida vuelve a sentirse posible.\n\nNo necesitas aguantar más. Necesitas, apenas por un instante, volver a ti.',
    categoria: 'Soberanía',
    emoji: '💫',
    color_bg: 'bg-5',
    imagen_url: null,
    tiempo_lectura: '5 min',
    destacado: false,
    publicado: true,
  },
];

const FOTO = 'https://bizgyycqbwyczqcavmrp.supabase.co/storage/v1/object/public/imagenes/testimonios';
const BANDERA = 'https://bizgyycqbwyczqcavmrp.supabase.co/storage/v1/object/public/imagenes/banderas';

// Atributos extra (foto, país, bandera, video) por nombre. Se aplican como
// respaldo cuando la fila de la BD no los trae (p. ej. si la columna aún no
// existe). Si la BD sí trae el valor, ese tiene prioridad.
const EXTRAS = {
  'Verónica Marcos': { foto_url: `${FOTO}/veronica-marcos.jpg`, pais: 'España', bandera: `${BANDERA}/es.png` },
  'Ana María Molano': { foto_url: `${FOTO}/ana-maria-molano.jpg`, pais: 'Colombia', bandera: `${BANDERA}/co.png` },
  'Haydeé Barrera': { foto_url: `${FOTO}/haydee-barrera.jpg`, pais: 'México', bandera: `${BANDERA}/mx.png` },
  'Elizabeth Escudero': { pais: 'México', bandera: `${BANDERA}/mx.png`, video_url: `${FOTO}/testimonio-ely.mp4`, poster_url: `${FOTO}/ely-poster.jpg` },
  'Claudia Aguilar': { pais: 'México', bandera: `${BANDERA}/mx.png` },
};

function conExtras(t) {
  const ex = EXTRAS[t.nombre] || {};
  return {
    ...t,
    foto_url: t.foto_url || ex.foto_url || null,
    pais: t.pais || ex.pais || null,
    bandera: t.bandera || ex.bandera || null,
    video_url: t.video_url || ex.video_url || null,
    poster_url: t.poster_url || ex.poster_url || null,
  };
}

const TESTIMONIOS_FALLBACK = [
  { texto: 'Antes de trabajar con ella me sentía estancada y sin dirección clara en varios aspectos de mi vida. Desde nuestra primera sesión demostró una increíble capacidad para escuchar y entender mi situación. A través de sus preguntas reflexivas y su curiosidad por conocer sin juzgar, pude identificar mi verdadero malestar y comprender muchas cosas. La claridad y el enfoque que gané han sido transformadores: no solo me dio herramientas prácticas, también la confianza para enfrentar y superar obstáculos. La recomiendo a cualquiera que busque mejorar su vida personal y profesional.', nombre: 'Verónica Marcos', detalle: 'Teaching assistant', estrellas: 5, destacado: true, publicado: true },
  { texto: 'Entré al coaching porque todos necesitamos revisarnos de manera cíclica para evolucionar. Mi experiencia fue muy positiva: a través de mis conversaciones con Ofe pude ser consciente de pensamientos propios que me limitaban y me generaban estrés innecesario. Recomiendo este trabajo para mejorar como persona y estar más en el presente.', nombre: 'Ana María Molano', detalle: 'Terapeuta holística', estrellas: 5, destacado: false, publicado: true },
  { texto: 'Hice mi proceso de coaching porque me sentía sin un sentido claro en mi vida. Desde la primera sesión me ayudó a valorarme como mujer y a tomar la vida en equilibrio. Antes me deprimía y me bloqueaba para encontrar soluciones; ahora encuentro enfoques más claros y prácticos. Pude ser menos dura conmigo, abrazarme, comprenderme y dejar de juzgarme. La recomiendo ampliamente.', nombre: 'Haydeé Barrera', detalle: 'Estilista', estrellas: 5, destacado: false, publicado: true },
  { texto: 'Excelente coaching de Ofelia Texis, siempre precisa y objetiva. Cada vez que hablo con ella tiene las palabras indicadas para la situación por la que esté pasando, y me deja mucha reflexión y aprendizaje. Me ha ayudado a descubrirme, a valorarme y a aceptar que no todo se puede controlar. La recomiendo ampliamente.', nombre: 'Elizabeth Escudero', detalle: null, estrellas: 5, destacado: false, publicado: true },
  { texto: 'Desde que la escuché por primera vez me sentí muy cómoda; me inspiró confianza y me tiene mucha paciencia. Ofelia me ha dado herramientas para seguir adelante con mi vida. La recomiendo ampliamente porque me está enseñando a ser yo misma, a sanar, a valorarme y a cuidarme. Le agradezco de todo corazón porque en cada sesión me escucha y me apoya para ver diferente lo que siento y pienso.', nombre: 'Claudia Aguilar', detalle: null, estrellas: 5, destacado: false, publicado: true },
].map(conExtras);

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
  // Completa por nombre los atributos extra (foto, país, bandera, video)
  // que aún no viven en columnas de la BD.
  return data.map(conExtras);
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
