import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

// Cliente de Supabase para el SERVIDOR (Server Components y Route Handlers).
// Lee la sesión desde las cookies para saber si Ofe ha iniciado sesión.
// Devuelve null si faltan las variables de entorno (para no romper la web).
export function createSupabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  const cookieStore = cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Llamado desde un Server Component: ignorar. El refresco de la
          // sesión lo hace el middleware.
        }
      },
    },
  });
}

// Devuelve el usuario autenticado (o null). Úsalo para proteger rutas.
export async function getUsuario() {
  const supabase = createSupabaseServer();
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
