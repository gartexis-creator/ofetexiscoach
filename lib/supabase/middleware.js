import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

// Refresca la sesión en cada petición a /admin y protege las rutas:
// si no hay sesión y la ruta no es el login, redirige a /admin/login.
export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Sin configuración de Supabase no podemos autenticar: dejamos pasar para
  // no romper el sitio (el panel mostrará un aviso de configuración).
  if (!url || !anonKey) return supabaseResponse;

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const esLogin = pathname === '/admin/login';

  // Sin sesión y fuera del login -> al login.
  if (!user && !esLogin) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/admin/login';
    return NextResponse.redirect(redirectUrl);
  }

  // Con sesión y en el login -> al panel.
  if (user && esLogin) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/admin';
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}
