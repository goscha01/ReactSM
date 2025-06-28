/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",  // Static export configuration
  trailingSlash: true,  // Ensures that URLs end with a trailing slash
  images: {
    unoptimized: true,  // Disable image optimization for static export 
  },
};

export default nextConfig;
