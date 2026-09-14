import type { Metadata } from 'next';
import '@/styles/styles.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata: Metadata = {
  title: 'Laboratorio de Errores — Práctica autoevaluable',
  description:
    'Práctica autoevaluable multi-unidad para materias de ingeniería: opción múltiple e ingreso de valores, con corrección automática por ejercicio.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* KaTeX se enlaza desde public/ y no se importa: sus @font-face apuntan
            a fonts/ relativo al CSS, y pasarlo por el bundler rompe esas rutas. */}
        <link rel="stylesheet" href={`${basePath}/vendor/katex/katex.min.css`} />
      </head>
      <body>{children}</body>
    </html>
  );
}
