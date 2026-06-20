import './admin.css';

export const metadata = {
  title: 'Panel de administración | Soberanía Relacional',
  robots: { index: false, follow: false },
};

// Layout base del panel: solo aporta los estilos y el fondo.
// La protección de sesión y la barra lateral viven en el grupo (panel).
export default function AdminLayout({ children }) {
  return <div className="admin-body">{children}</div>;
}
