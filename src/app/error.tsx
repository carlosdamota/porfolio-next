"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-[var(--color-background)] text-[var(--color-foreground)] px-4'>
      <div className='bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl shadow-lg p-10 flex flex-col items-center max-w-md w-full animate-fade-in'>
        <h2 className='text-3xl font-bold text-[var(--color-primary)] mb-4'>¡Algo salió mal!</h2>
        <p className='text-[var(--color-muted-foreground)] mb-8 text-center'>
          Ha ocurrido un error inesperado. Puedes intentar recargar la sección.
        </p>
        <button
          onClick={() => reset()}
          className='px-6 py-2 rounded-lg bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-semibold shadow hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-foreground)] transition-colors duration-200'
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}
