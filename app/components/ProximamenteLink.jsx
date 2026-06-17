'use client';

export default function ProximamenteLink({
  children = 'Leer más',
  mensaje = 'Próximamente',
}) {
  return (
    <button
      type="button"
      className="blog-card-link"
      onClick={() => alert(mensaje)}
    >
      {children}
    </button>
  );
}
