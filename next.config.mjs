/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",  // Static export configuration
  trailingSlash: true,  // Ensures that URLs end with a trailing slash
  distDir: 'build',  // Output directory (you'll upload this folder to S3)
  images: {
    unoptimized: true,  // Disable image optimization for static export 
  },
};

export default nextConfig;
