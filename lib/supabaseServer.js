import { createClient } from '@supabase/supabase-js';

// Cliente de Supabase para usar SOLO en el servidor (API routes).
// Usa la clave service_role, que nunca debe llegar al navegador.
//
// Si las variables de entorno no están configuradas, devolvemos null
// para que la web siga funcionando en local sin guardar datos.
export function getSupabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !serviceKey) {
    return null;
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    // Evita que Next.js cachee las lecturas: así los cambios hechos en el
    // panel (o en la base de datos) se reflejan de inmediato en la web.
    global: {
      fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }),
    },
  });
}
