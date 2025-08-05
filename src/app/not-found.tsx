import Link from "next/link";

export default function NotFound() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-[var(--color-background)] text-[var(--color-foreground)] px-4'>
      <div className='bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl shadow-lg p-10 flex flex-col items-center max-w-md w-full animate-fade-in'>
        <h2 className='text-3xl font-bold text-[var(--color-accent)] mb-4'>Página no encontrada</h2>
        <p className='text-[var(--color-muted-foreground)] mb-8 text-center'>
          No se pudo encontrar el recurso solicitado.
        </p>
        <Link
          href='/'
          className='px-6 py-2 rounded-lg bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-semibold shadow hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-foreground)] transition-colors duration-200'
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
