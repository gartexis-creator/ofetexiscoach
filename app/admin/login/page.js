'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowser } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const configurado =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  async function onSubmit(e) {
    e.preventDefault();
    setError('');

    if (!configurado) {
      setError('Supabase aún no está configurado. Revisa el archivo .env.local.');
      return;
    }

    setCargando(true);
    const supabase = createSupabaseBrowser();
    const { error } = await supabase.auth.signInWithPassword({
      email: correo.trim(),
      password,
    });
    setCargando(false);

    if (error) {
      setError('Correo o contraseña incorrectos.');
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-logo">Soberanía Relacional</div>
        <div className="login-sub">Panel de administración</div>

        {!configurado && (
          <div className="login-aviso">
            ⚠️ Falta conectar Supabase. Crea el archivo <code>.env.local</code>{' '}
            con tus claves y reinicia el servidor.
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div className="fg">
            <label htmlFor="correo">Correo</label>
            <input
              id="correo"
              type="email"
              autoComplete="username"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="tu@correo.com"
              required
            />
          </div>
          <div className="fg">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="form-msg err" style={{ marginBottom: 16 }}>{error}</div>}

          <button className="btn-admin" type="submit" disabled={cargando}>
            {cargando ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
