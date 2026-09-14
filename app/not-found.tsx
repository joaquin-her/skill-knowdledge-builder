import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="wrap">
      <section className="intro">
        <h2>Esta página no existe</h2>
        <p className="intro-note">
          El enlace puede estar viejo o mal copiado.{' '}
          <Link href="/">Volver al inicio</Link>.
        </p>
      </section>
    </main>
  );
}
