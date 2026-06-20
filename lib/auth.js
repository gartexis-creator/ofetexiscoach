import { NextResponse } from 'next/server';
import { getUsuario } from '@/lib/supabase/server';

// Para usar dentro de las rutas API del panel (/api/admin/*).
// Verifica que haya sesión; si no, devuelve una respuesta 401.
// Uso:
//   const { user, error } = await requireUser();
//   if (error) return error;
export async function requireUser() {
  const user = await getUsuario();
  if (!user) {
    return {
      user: null,
      error: NextResponse.json(
        { error: 'No autorizado. Inicia sesión.' },
        { status: 401 }
      ),
    };
  }
  return { user, error: null };
}
