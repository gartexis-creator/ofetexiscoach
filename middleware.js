import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request) {
  return await updateSession(request);
}

// Solo se ejecuta en las rutas del panel de administración.
export const config = {
  matcher: ['/admin/:path*'],
};
