import { redirect } from 'next/navigation';
import { getUsuario } from '@/lib/supabase/server';
import AdminSidebar from '../components/AdminSidebar';

export const dynamic = 'force-dynamic';

// Layout protegido: todo lo que cuelga de aquí exige sesión iniciada.
export default async function PanelLayout({ children }) {
  const user = await getUsuario();
  if (!user) redirect('/admin/login');

  return (
    <div className="admin-shell">
      <AdminSidebar email={user.email} />
      <main className="admin-main">{children}</main>
    </div>
  );
}
