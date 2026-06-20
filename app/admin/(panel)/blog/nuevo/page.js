import ArticuloForm from '../../../components/ArticuloForm';

export const dynamic = 'force-dynamic';

export default function NuevoArticuloPage() {
  return (
    <>
      <header className="admin-header">
        <div>
          <div className="admin-eyebrow">Blog</div>
          <h1>Escribir artículo</h1>
        </div>
      </header>
      <ArticuloForm />
    </>
  );
}
