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
   E'A veces, el ruido mental se vuelve tan ensordecedor que parece la única realidad disponible. Te encuentras analizando cada gesto de tu pareja, cada palabra no dicha o cada silencio, creyendo firmemente que si logras resolver ese rompecabezas emocional, por fin tendrás permiso para descansar.\n\nPero aquí hay un secreto que te devolverá el mando de tu vida: no estás sintiendo tu relación, estás sintiendo tu pensamiento sobre ella en este preciso instante.\n\nEl sobrepensamiento no es un defecto de tu carácter ni una señal de que algo está roto en ti. Es, en realidad, una forma de "Inocencia Psicológica": una señal de que has tomado una proyección mental momentánea como si fuera una verdad absoluta y permanente.\n\nEl espejismo del control\n\nPasamos años intentando "arreglar" lo que pensamos o forzando el entorno para que se ajuste a nuestras expectativas de orden. Sin embargo, la claridad no aparece cuando logras controlar el exterior, sino cuando comprendes la naturaleza de tu interior.\n\nTu bienestar no es un edificio que debas construir con esfuerzo; es una corriente de salud innata que fluye por debajo de cualquier tormenta. En el momento en que dejas de intentar fabricar tu paz, descubres que ella nunca te abandonó.\n\nLa vida se vuelve mucho más fácil cuando dejas de tomar tus narrativas de miedo como si fueran noticias de última hora.',
   'Mente', '🧠', 'bg-2', '5 min', true, true, 100, now()),

  ('y-si-tu-paz-no-dependiera-de-tu-entorno',
   '¿Y si tu paz no dependiera de que tu entorno se alinee?',
   '¿Y si tu calma no dependiera de que tu pareja o tu entorno cambien? Tu bienestar no es condicional: es de fábrica.',
   E'Pasamos gran parte de nuestra vida operando bajo una "Inocencia Psicológica": la creencia de que nuestro bienestar es una consecuencia directa de lo que sucede afuera. Te dices a ti misma que, si tu pareja fuera más atenta, más ordenada o más comprensiva, por fin podrías experimentar esa calma que tanto anhelas.\n\nPero la realidad es mucho más sencilla y, a la vez, más liberadora: tu bienestar no es condicional.\n\nCreer que necesitas que el otro cambie para estar bien es como intentar arreglar el reflejo en un espejo sin tocar el objeto original. El conflicto que sientes no es una disputa sobre hechos objetivos; es el choque de dos mundos psicológicos distintos operando desde sus propios sistemas de pensamiento.\n\nCuando comprendes que tu paz es de fábrica y que no depende de que las piezas de tu vida encajen perfectamente, dejas de ser una rehén de las circunstancias. La verdadera Soberanía nace cuando te das cuenta de que ya eres el océano, no importa qué tan fuerte sople el viento en la superficie.',
   'Relaciones', '🌿', 'bg-1', '4 min', false, true, 90, now()),

  ('no-necesitas-ser-mas-fuerte-sino-mas-presente',
   'No necesitas ser más fuerte, necesitas estar más presente',
   'No necesitas aguantar más ni ser más fuerte. La diferencia entre la resiliencia y el modo supervivencia es un momento de claridad.',
   E'A muchas de nosotras nos enseñaron que el valor de una mujer se mide por su capacidad de "aguantar". Nos convertimos en expertas de la resiliencia forzada, creyendo que ser una buena esposa o madre significa sostener el peso del mundo sobre los hombros sin quejarse.\n\nSin embargo, hay una gran diferencia entre ser resiliente y estar en modo supervivencia.\n\nEl agotamiento que sientes no es por la carga de tus tareas, sino por la energía que consumes intentando que la realidad sea distinta a lo que es. La verdadera Soberanía Relacional no se trata de aprender a tolerar más el malestar; se trata de ver que el malestar es solo una señal de que has perdido de vista tu salud innata.\n\nNo necesitas otra técnica de gestión del tiempo ni otro protocolo de comunicación agotador. Necesitas un momento de claridad para ver que ya eres libre. La vida se vuelve increíblemente fácil cuando dejas de luchar contra tus propios pensamientos y permites que tu sabiduría natural tome el mando.',
   'Soberanía', '💫', 'bg-5', '4 min', false, true, 80, now())
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
     'Claudia Aguilar', 'Ventas por catálogo', null, 5, false, true, 60);
  end if;
end $$;

-- ---- Programas ----
insert into public.programas (slug, badge, titulo, descripcion, items, duracion, cta_texto, cta_estilo, destacado, ancho_completo, requisito, publicado, orden)
select * from (values
  ('soberania-relacional-90-dias',
   '✦ Programa insignia',
   E'Soberanía Relacional\n90 días',
   'El programa completo de transformación. Diseñado para la mujer que está lista para ir a la raíz y no volver a vivir rehén de su mente o su entorno.',
   '["12 sesiones individuales de 60 min","Acceso a materiales exclusivos del método","Soporte por voz entre sesiones","Comunidad privada de mujeres en el proceso","Grabaciones de cada sesión"]'::jsonb,
   '90 días · Inicio por agenda', 'Quiero este programa', 'dorado', true, false, null, true, 100),

  ('dia-intensivo-de-claridad',
   'Inmersión VIP',
   'Día Intensivo de Claridad',
   'Una jornada completa de trabajo profundo para quienes necesitan un punto de quiebre inmediato. Ideal si tienes una decisión importante por tomar o una situación que se siente urgente.',
   '["4 horas de trabajo enfocado contigo","Pre-trabajo de diagnóstico personalizado","Plan de acción post-sesión","Seguimiento de 2 semanas por audio"]'::jsonb,
   '1 día · Formato presencial u online', 'Agendar mi día VIP', 'primario', false, false, null, true, 90),

  ('mentoria-de-mantenimiento',
   'Para quien ya inició',
   'Mentoría de Mantenimiento',
   'Para mujeres que ya han trabajado el método y quieren un espacio de continuidad, profundización y acompañamiento mensual.',
   '["2 sesiones al mes de 60 min","Soporte por voz entre sesiones","Acceso a nuevos materiales","Revisión trimestral de avances"]'::jsonb,
   'Renovable mensualmente', 'Consultar disponibilidad', 'secundario', false, true,
   'Haber completado el programa de 90 días o una sesión de claridad previa.', true, 80)
) as v(slug, badge, titulo, descripcion, items, duracion, cta_texto, cta_estilo, destacado, ancho_completo, requisito, publicado, orden)
on conflict (slug) do nothing;

-- ============================================================
--  ¡Listo! Ahora crea tu usuario de administración:
--  Authentication > Users > "Add user" (con tu correo y contraseña)
--  y desactiva el registro público en:
--  Authentication > Sign In / Providers > Email > "Allow new users to sign up" (OFF)
-- ============================================================
