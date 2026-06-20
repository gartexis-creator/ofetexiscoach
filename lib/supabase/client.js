'use client';

import { createBrowserClient } from '@supabase/ssr';

// Cliente de Supabase para el NAVEGADOR (solo se usa para iniciar/cerrar
// sesión en el panel). Usa la clave pública "anon".
export function createSupabaseBrowser() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return createBrowserClient(url, anonKey);
}
