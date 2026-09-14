/** @type {import('next').NextConfig} */

// GitHub Pages sirve los project sites bajo /<repo>, así que todas las rutas y
// assets necesitan ese prefijo. En dev el basePath vacío mantiene localhost:3000
// limpio; el workflow de deploy exporta con NEXT_PUBLIC_BASE_PATH seteado.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,
  // El export estático no tiene servidor que optimice imágenes al vuelo.
  images: { unoptimized: true },
  // Cada ruta se emite como carpeta/index.html: es lo que Pages sabe servir
  // sin reglas de reescritura.
  trailingSlash: true,
};

export default nextConfig;
