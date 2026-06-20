import ProgramaForm from '../../../components/ProgramaForm';

export const dynamic = 'force-dynamic';

export default function NuevoProgramaPage() {
  return (
    <>
      <header className="admin-header">
        <div>
          <div className="admin-eyebrow">Programas</div>
          <h1>Nuevo programa</h1>
        </div>
      </header>
      <ProgramaForm />
    </>
  );
}
