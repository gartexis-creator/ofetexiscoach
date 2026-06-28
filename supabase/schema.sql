-- ============================================================
--  Soberanía Relacional — Esquema de base de datos (Supabase)
-- ============================================================
--  CÓMO USARLO:
--  1. Entra a tu proyecto en https://supabase.com
--  2. Menú lateral > SQL Editor > New query
--  3. Pega TODO este archivo y pulsa "Run"
--
--  Esto crea las tablas del sitio y del panel de administración:
--    - contactos     (solicitudes del formulario de contacto)
--    - suscriptores  (newsletter del blog)
--    - articulos     (entradas del blog)
--    - testimonios   (testimonios de clientas)
--    - programas     (programas / servicios)
--  Además activa la seguridad (RLS) y carga contenido inicial
--  para que la web se vea igual que antes.
--
--  Es SEGURO ejecutarlo más de una vez: usa "if not exists" y
--  solo inserta el contenido inicial si las tablas están vacías.
-- ============================================================


-- ============================================================
--  1. TABLAS
-- ============================================================

-- ----------------------------------------------------------------
--  contactos — solicitudes de la "Sesión de Claridad"
-- ----------------------------------------------------------------
create table if not exists public.contactos (
  id          uuid primary key default gen_random_uuid(),
  creado_en   timestamptz not null default now(),
  nombre      text not null,
  correo      text not null,
  ocupacion   text,
  programa    text,
  mensaje     text,
  acepto      boolean not null default false,
  leido       boolean not null default false
);

-- Por si la tabla ya existía sin la columna "leido":
alter table public.contactos add column if not exists leido boolean not null default false;

-- ----------------------------------------------------------------
--  suscriptores — newsletter del blog
-- ----------------------------------------------------------------
create table if not exists public.suscriptores (
  id          uuid primary key default gen_random_uuid(),
  creado_en   timestamptz not null default now(),
  correo      text not null unique
);

-- ----------------------------------------------------------------
--  articulos — entradas del blog
-- ----------------------------------------------------------------
create table if not exists public.articulos (
  id              uuid primary key default gen_random_uuid(),
  creado_en       timestamptz not null default now(),
  actualizado_en  timestamptz not null default now(),
  publicado_en    timestamptz,
  slug            text not null unique,
  titulo          text not null,
  extracto        text,
  contenido       text,
  categoria       text,
  emoji           text default '🌸',
  color_bg        text default 'bg-1',     -- bg-1 .. bg-6 (degradado de la tarjeta)
  imagen_url      text,                    -- opcional: portada subida
  tiempo_lectura  text,                    -- ej. "6 min"
  destacado       boolean not null default false,
  publicado       boolean not null default true,
  orden           integer not null default 0
);

-- ----------------------------------------------------------------
--  testimonios
-- ----------------------------------------------------------------
create table if not exists public.testimonios (
  id          uuid primary key default gen_random_uuid(),
  creado_en   timestamptz not null default now(),
  texto       text not null,
  nombre      text not null,
  detalle     text,
  foto_url    text,
  estrellas   integer not null default 5,
  destacado   boolean not null default false,
  publicado   boolean not null default true,
  orden       integer not null default 0
);

-- Por si la tabla ya existía sin la columna "foto_url":
alter table public.testimonios add column if not exists foto_url text;

-- ----------------------------------------------------------------
--  programas — programas y servicios
-- ----------------------------------------------------------------
create table if not exists public.programas (
  id              uuid primary key default gen_random_uuid(),
  creado_en       timestamptz not null default now(),
  actualizado_en  timestamptz not null default now(),
  slug            text not null unique,
  badge           text,
  titulo          text not null,
  descripcion     text,
  items           jsonb not null default '[]'::jsonb,  -- lista de viñetas (textos)
  duracion        text,
  cta_texto       text default 'Quiero este programa',
  cta_estilo      text default 'primario',             -- primario | secundario | dorado
  destacado       boolean not null default false,      -- tarjeta oscura destacada
  ancho_completo  boolean not null default false,      -- ocupa toda la fila
  requisito       text,                                -- caja de "requisito" (opcional)
  publicado       boolean not null default true,
  orden           integer not null default 0
);

-- ----------------------------------------------------------------
--  reservas — Sesiones de Claridad agendadas (30 min gratis)
-- ----------------------------------------------------------------
create table if not exists public.reservas (
  id          uuid primary key default gen_random_uuid(),
  creado_en   timestamptz not null default now(),
  nombre      text not null,
  correo      text not null,
  whatsapp    text,
  fecha       date not null,                       -- día de la sesión (CDMX)
  hora        text not null,                       -- 'HH:MM' inicio del bloque (CDMX)
  inicio      timestamptz,                         -- momento exacto, para ordenar
  mensaje     text,
  estado      text not null default 'pendiente',   -- pendiente | confirmada
  leido       boolean not null default false,
  unique (fecha, hora)                             -- evita doble reserva del mismo horario
);


-- ============================================================
--  2. SEGURIDAD A NIVEL DE FILA (RLS)
-- ============================================================
--  La web y el panel escriben/leen desde el SERVIDOR con la clave
--  service_role, que IGNORA estas políticas. Activamos RLS y NO
--  añadimos políticas públicas: así, con la clave pública (anon)
--  nadie puede leer ni escribir datos directamente desde el navegador.
alter table public.contactos    enable row level security;
alter table public.suscriptores enable row level security;
alter table public.articulos    enable row level security;
alter table public.testimonios  enable row level security;
alter table public.programas    enable row level security;
alter table public.reservas     enable row level security;


-- ============================================================
--  3. ALMACENAMIENTO DE IMÁGENES (Storage)
-- ============================================================
--  Bucket público "imagenes" para portadas de artículos, etc.
insert into storage.buckets (id, name, public)
values ('imagenes', 'imagenes', true)
on conflict (id) do nothing;

-- Lectura pública de las imágenes (las subidas las hace el servidor
-- con service_role, que ignora RLS).
drop policy if exists "imagenes lectura publica" on storage.objects;
create policy "imagenes lectura publica"
  on storage.objects for select
  using (bucket_id = 'imagenes');


-- ============================================================
--  4. CONTENIDO INICIAL (solo si las tablas están vacías)
-- ============================================================

-- ---- Artículos ----
insert into public.articulos (slug, titulo, extracto, contenido, categoria, emoji, color_bg, tiempo_lectura, destacado, publicado, orden, publicado_en)
select * from (values
  ('la-libertad-de-no-creer-todo-lo-que-piensas',
   'La libertad de no creer todo lo que piensas',
   'El sobrepensamiento no es un defecto de tu carácter: es una señal de que tomaste un pensamiento pasajero como si fuera una verdad absoluta. Aprende a soltar el ruido mental.',
   E'A veces, el ruido mental se vuelve tan ensordecedor que parece la única realidad disponible. Te encuentras analizando cada gesto de tu pareja, cada palabra no dicha o cada silencio, convencida de que si logras resolver ese rompecabezas emocional, por fin tendrás permiso para descansar.\n\nPero aquí hay un secreto que puede devolverte el mando de tu vida: no estás sintiendo tu relación, ni tu trabajo, ni tu pasado. Estás sintiendo tu pensamiento sobre ellos en este preciso instante.\n\nLos tres principios de la experiencia humana\n\nHace décadas, Sydney Banks describió algo tan sencillo como profundo: toda nuestra vivencia nace de tres principios. La Mente, que es la inteligencia y la energía que da vida a todo lo que existe; la Consciencia, que es la capacidad de darnos cuenta y de hacer real, ante nuestros ojos, aquello que pensamos; y el Pensamiento, el poder creativo con el que, momento a momento, damos forma a nuestra experiencia.\n\nDicho de otro modo: no vivimos los hechos de nuestra vida, vivimos el pensamiento que tenemos sobre ellos, vuelto sensación gracias a la consciencia. Por eso dos personas pueden atravesar la misma situación y habitar dos mundos completamente distintos.\n\nEl sobrepensamiento no es tu enemigo\n\nCuando lo comprendes, el sobrepensamiento deja de ser un defecto de tu carácter o una señal de que algo está roto en ti. Es, simplemente, lo que ocurre cuando tomamos un pensamiento pasajero como si fuera una verdad permanente. A esa confusión tan humana se le llama "inocencia psicológica": creer, de buena fe, que lo que sentimos viene de afuera y no de nuestro propio pensar.\n\nIntentar controlar o "arreglar" cada pensamiento es como querer alisar con las manos el reflejo del agua: cuanto más la agitas, más se distorsiona la imagen.\n\nLa mente se aclara sola\n\nImagina un vaso de agua con tierra revuelta. No necesitas hacer nada para limpiarlo; solo dejar de moverlo. Las partículas se asientan por sí solas y el agua vuelve a estar clara. Tu mente funciona igual: la claridad no es algo que tengas que fabricar con esfuerzo, es tu estado natural cuando dejas de añadir pensamiento sobre pensamiento.\n\nTu bienestar no es un edificio que debas construir; es una corriente de salud innata que sigue fluyendo por debajo de cualquier tormenta. En el momento en que dejas de intentar fabricar tu paz, descubres que nunca te abandonó.\n\nComprensión, no técnica\n\nPor eso este camino no se trata de aprender una técnica más para "dejar de pensar". Se trata de ver —de comprender— cómo funciona realmente tu experiencia. Y un solo destello de esa comprensión, un instante de claridad genuina, transforma tu manera de vivir más que mil intentos de controlar la mente.\n\nLa vida se vuelve mucho más ligera cuando dejas de tomar tus narrativas de miedo como si fueran noticias de última hora. Porque, en el fondo, siempre estás a un solo pensamiento de distancia de la paz.',
   'Mente', '🧠', 'bg-2', '6 min', true, true, 100, now()),

  ('y-si-tu-paz-no-dependiera-de-tu-entorno',
   '¿Y si tu paz no dependiera de que tu entorno se alinee?',
   '¿Y si tu calma no dependiera de que tu pareja o tu entorno cambien? Tu bienestar no es condicional: es de fábrica.',
   E'Pasamos gran parte de la vida operando bajo una creencia silenciosa: que nuestro bienestar es una consecuencia directa de lo que sucede afuera. Te dices que, si tu pareja fuera más atenta, si tu familia fuera más comprensiva, si las circunstancias por fin se ordenaran, entonces sí podrías sentir esa calma que tanto anhelas.\n\nA esa creencia tan extendida la llamamos "inocencia psicológica". No es un error ni una falla de carácter: es, sencillamente, no haber visto todavía de dónde nace de verdad nuestra experiencia.\n\n¿De afuera hacia adentro, o de adentro hacia afuera?\n\nLos tres principios de la experiencia humana, articulados por primera vez por Sydney Banks, apuntan a algo que lo cambia todo: nuestra vivencia se crea de adentro hacia afuera, no de afuera hacia adentro. La Mente nos da la energía de la vida; el Pensamiento da forma a nuestra realidad personal; y la Consciencia la vuelve experiencia viva. Sentimos nuestro pensamiento, no el mundo.\n\nEsto significa que ninguna circunstancia —ni siquiera la persona más difícil— tiene el poder de meterse dentro de tu mente y crear lo que sientes. Lo que sientes siempre llega por la vía de tu propio pensar, instante a instante.\n\nEl conflicto, visto con otros ojos\n\nDesde aquí, una discusión deja de ser una disputa sobre hechos objetivos y se revela como lo que realmente es: el encuentro de dos mundos de pensamiento, cada uno viviendo su propia realidad como si fuera la única verdad posible.\n\nCreer que necesitas que el otro cambie para estar en paz es como intentar corregir tu reflejo en el espejo sin tocarte a ti misma. El cambio nunca estuvo ahí afuera.\n\nTu paz es de fábrica\n\nCuando comprendes que tu bienestar no es condicional —que es de fábrica, parte de tu naturaleza, siempre disponible por debajo del ruido—, dejas de ser rehén de las circunstancias. Te das cuenta de que eres el océano entero, no las olas de la superficie; y por fuerte que sople el viento, el fondo permanece en calma.\n\nY esto no es resignación ni "aguantar". Es justo lo contrario: cuando baja el ruido mental, dejas de responder desde el miedo o el control y empiezas a hacerlo desde la claridad. Muchas veces, sin siquiera proponértelo, tus vínculos comienzan a transformarse… porque la que cambió fuiste tú.\n\n¿Y si tu paz no dependiera de que tu entorno se alinee? Quizá descubras que esa libertad siempre estuvo dentro de ti, esperando ser recordada.',
   'Relaciones', '🌿', 'bg-1', '6 min', false, true, 90, now()),

  ('no-necesitas-ser-mas-fuerte-sino-mas-presente',
   'No necesitas ser más fuerte, necesitas estar más presente',
   'No necesitas aguantar más ni ser más fuerte. La diferencia entre la resiliencia y el modo supervivencia es un momento de claridad.',
   E'A muchas de nosotras nos enseñaron que el valor de una mujer se mide por su capacidad de "aguantar". Nos volvimos expertas en la resiliencia forzada, creyendo que ser buena hija, buena pareja o buena madre significaba sostener el peso del mundo sobre los hombros sin quejarnos.\n\nPero hay una diferencia enorme entre ser resiliente y vivir en modo supervivencia.\n\nDe dónde viene de verdad el agotamiento\n\nEl cansancio que sientes no nace tanto de tus tareas como de la energía que gastas peleándote, en silencio, con la realidad: con el pensamiento constante de que las cosas deberían ser distintas a como son.\n\nLos tres principios de la experiencia humana, que Sydney Banks articuló por primera vez, ofrecen aquí una clave preciosa. Nuestros sentimientos no nos informan de lo que pasa afuera; nos informan de la calidad de nuestro pensamiento en este momento. El malestar no es la prueba de que algo esté roto en ti: es una brújula. Te avisa, con cariño, de que te has enredado en el pensar… y de que también puedes soltar.\n\nNo necesitas más fuerza\n\nPor eso la salida no es endurecerte ni sumar otra técnica de gestión emocional. No necesitas ser más fuerte. Necesitas estar más presente: un momento de claridad para ver que, por debajo del ruido, tu bienestar sigue intacto.\n\nCuando la mente se aquieta —y lo hace sola, en cuanto dejas de alimentarla con esfuerzo—, emerge una sabiduría que ya vivía en ti. Esa salud innata es tu estado base, no una meta lejana que debas conquistar.\n\nLa paz no se construye: se recupera\n\nLa verdadera Soberanía Relacional no consiste en aprender a tolerar más el malestar, sino en recordar lo que siempre fuiste. No es un edificio que levantas con disciplina; es un regreso a casa. Dejas de luchar contra tus propios pensamientos, permites que tu sabiduría natural tome el mando, y la vida vuelve a sentirse posible.\n\nNo necesitas aguantar más. Necesitas, apenas por un instante, volver a ti.',
   'Soberanía', '💫', 'bg-5', '5 min', false, true, 80, now())
) as v(slug, titulo, extracto, contenido, categoria, emoji, color_bg, tiempo_lectura, destacado, publicado, orden, publicado_en)
on conflict (slug) do nothing;

-- ---- Testimonios (solo si está vacía) ----
do $$
begin
  if not exists (select 1 from public.testimonios) then
    insert into public.testimonios (texto, nombre, detalle, foto_url, estrellas, destacado, publicado, orden) values
    ('Antes de trabajar con ella me sentía estancada y sin dirección clara en varios aspectos de mi vida. Desde nuestra primera sesión demostró una increíble capacidad para escuchar y entender mi situación. A través de sus preguntas reflexivas y su curiosidad por conocer sin juzgar, pude identificar mi verdadero malestar y comprender muchas cosas. La claridad y el enfoque que gané han sido transformadores: no solo me dio herramientas prácticas, también la confianza para enfrentar y superar obstáculos. La recomiendo a cualquiera que busque mejorar su vida personal y profesional.',
     'Verónica Marcos', 'Teaching assistant',
     'https://bizgyycqbwyczqcavmrp.supabase.co/storage/v1/object/public/imagenes/testimonios/veronica-marcos.jpg',
     5, true, true, 100),
    ('Entré al coaching porque todos necesitamos revisarnos de manera cíclica para evolucionar. Mi experiencia fue muy positiva: a través de mis conversaciones con Ofe pude ser consciente de pensamientos propios que me limitaban y me generaban estrés innecesario. Recomiendo este trabajo para mejorar como persona y estar más en el presente.',
     'Ana María Molano', 'Terapeuta holística',
     'https://bizgyycqbwyczqcavmrp.supabase.co/storage/v1/object/public/imagenes/testimonios/ana-maria-molano.jpg',
     5, false, true, 90),
    ('Hice mi proceso de coaching porque me sentía sin un sentido claro en mi vida. Desde la primera sesión me ayudó a valorarme como mujer y a tomar la vida en equilibrio. Antes me deprimía y me bloqueaba para encontrar soluciones; ahora encuentro enfoques más claros y prácticos. Pude ser menos dura conmigo, abrazarme, comprenderme y dejar de juzgarme. La recomiendo ampliamente.',
     'Haydeé Barrera', 'Estilista',
     'https://bizgyycqbwyczqcavmrp.supabase.co/storage/v1/object/public/imagenes/testimonios/haydee-barrera.jpg',
     5, false, true, 80),
    ('Excelente coaching de Ofelia Texis, siempre precisa y objetiva. Cada vez que hablo con ella tiene las palabras indicadas para la situación por la que esté pasando, y me deja mucha reflexión y aprendizaje. Me ha ayudado a descubrirme, a valorarme y a aceptar que no todo se puede controlar. La recomiendo ampliamente.',
     'Elizabeth Escudero', null, null, 5, false, true, 70),
    ('Desde que la escuché por primera vez me sentí muy cómoda; me inspiró confianza y me tiene mucha paciencia. Ofelia me ha dado herramientas para seguir adelante con mi vida. La recomiendo ampliamente porque me está enseñando a ser yo misma, a sanar, a valorarme y a cuidarme. Le agradezco de todo corazón porque en cada sesión me escucha y me apoya para ver diferente lo que siento y pienso.',
     'Claudia Aguilar', null, null, 5, false, true, 60);
  end if;
end $$;

-- ---- Programas ----
insert into public.programas (slug, badge, titulo, descripcion, items, duracion, cta_texto, cta_estilo, destacado, ancho_completo, requisito, publicado, orden)
select * from (values
  ('soberania-relacional-90-dias',
   '✦ Programa insignia',
   E'Soberanía Relacional\n90 días',
   'El contenedor definitivo de transformación para la mujer líder que decidió dejar de pagar el precio invisible de sostenerlo todo. En 90 días desmontamos de raíz el sobrepensamiento y la autoexigencia —desde la Mente, la Consciencia y el Pensamiento— para devolverte una libertad interna y relacional innegociable. No aprenderás a tolerar el estrés: dejarás de creer que tu paz depende de que tu entorno cambie.',
   '["12 encuentros individuales de alta claridad (mentoría 1 a 1)","Línea directa de contención por nota de voz entre sesiones","Biblioteca de soberanía mental y grabación de cada sesión","Comunidad privada de mujeres en el mismo camino"]'::jsonb,
   '90 días · Inicio por agenda', 'Quiero mi transformación', 'dorado', true, false, null, true, 100),

  ('talleres-de-alta-claridad',
   'Encuentros grupales',
   'Talleres de Alta Claridad',
   'Espacios de comprensión grupal, en vivo, para pausar el ruido del entorno y volver a tu centro. Una vez al mes abrimos un contenedor enfocado en los desafíos más reales de la mujer de hoy —la culpa, los límites, la carga mental— mirados desde los 3 Principios. Profundo, cercano y en comunidad.',
   '["Masterclass temática en vivo (90 a 120 min)","Espacio de mentoría directa para tus situaciones reales","Acceso a la grabación durante 30 días"]'::jsonb,
   'Mensual · En vivo y online', 'Quiero participar', 'primario', false, false, null, true, 90),

  ('mentoria-de-maestria',
   'Para quien ya inició',
   'Mentoría de Maestría',
   'El espacio exclusivo para proteger tu claridad y expandir tu soberanía mes a mes. Integrar los 3 Principios en el día a día es un camino de profundización continua: aquí sigues navegando tus desafíos profesionales y familiares con ligereza, evitando que la mente vuelva al piloto automático de la sobrecarga.',
   '["2 calibraciones de centro al mes (60 min cada una)","Línea de acompañamiento activo por nota de voz","Acceso a las nuevas herramientas de la metodología","Auditoría trimestral de tu evolución relacional"]'::jsonb,
   'Renovable mensualmente', 'Consultar disponibilidad', 'secundario', false, true,
   'Haber completado el programa de 90 días o una Sesión de Claridad previa.', true, 80)
) as v(slug, badge, titulo, descripcion, items, duracion, cta_texto, cta_estilo, destacado, ancho_completo, requisito, publicado, orden)
on conflict (slug) do nothing;

-- ============================================================
--  ¡Listo! Ahora crea tu usuario de administración:
--  Authentication > Users > "Add user" (con tu correo y contraseña)
--  y desactiva el registro público en:
--  Authentication > Sign In / Providers > Email > "Allow new users to sign up" (OFF)
-- ============================================================
