import TestimonioForm from '../../../components/TestimonioForm';

export const dynamic = 'force-dynamic';

export default function NuevoTestimonioPage() {
  return (
    <>
      <header className="admin-header">
        <div>
          <div className="admin-eyebrow">Testimonios</div>
          <h1>Añadir testimonio</h1>
        </div>
      </header>
      <TestimonioForm />
    </>
  );
}
