/** @type {import('next').NextConfig} */
const nextConfig = {
  // No bloqueamos el build de producción (Vercel) por avisos de ESLint.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
