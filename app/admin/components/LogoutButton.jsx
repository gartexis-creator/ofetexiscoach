'use client';

import { useRouter } from 'next/navigation';
import { createSupabaseBrowser } from '@/lib/supabase/client';

export default function LogoutButton() {
  const router = useRouter();

  async function salir() {
    const supabase = createSupabaseBrowser();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <button className="admin-logout" onClick={salir} type="button">
      Cerrar sesión
    </button>
  );
}
