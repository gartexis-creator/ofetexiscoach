-- ============================================================
--  Soberanía Relacional — Esquema de base de datos (Supabase)
-- ============================================================
--  Cómo usarlo:
--  1. Entra a tu proyecto en https://supabase.com
--  2. Menú lateral > SQL Editor > New query
--  3. Pega TODO este archivo y pulsa "Run"
--  Esto crea las dos tablas que usa la web: contactos y suscriptores.
-- ============================================================

-- ----------------------------------------------------------------
--  Tabla: contactos (solicitudes de la "Sesión de Claridad")
-- ----------------------------------------------------------------
create table if not exists public.contactos (
  id          uuid primary key default gen_random_uuid(),
  creado_en   timestamptz not null default now(),
  nombre      text not null,
  correo      text not null,
  ocupacion   text,
  programa    text,
  mensaje     text,
  acepto      boolean not null default false
);

-- ----------------------------------------------------------------
--  Tabla: suscriptores (newsletter del blog)
-- ----------------------------------------------------------------
create table if not exists public.suscriptores (
  id          uuid primary key default gen_random_uuid(),
  creado_en   timestamptz not null default now(),
  correo      text not null unique
);

-- ----------------------------------------------------------------
--  Seguridad a nivel de fila (RLS)
-- ----------------------------------------------------------------
--  La web escribe desde el servidor con la clave service_role,
--  que IGNORA estas políticas. Aun así activamos RLS para que
--  nadie pueda leer/escribir con la clave pública (anon).
alter table public.contactos    enable row level security;
alter table public.suscriptores enable row level security;

-- (Opcional) Permitir que cualquiera SOLO inserte desde el navegador
-- con la clave anon. Descomenta si prefieres no usar el service_role.
--
-- create policy "insertar contacto publico"
--   on public.contactos for insert to anon with check (true);
-- create policy "insertar suscriptor publico"
--   on public.suscriptores for insert to anon with check (true);
