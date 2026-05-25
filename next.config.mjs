/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    formats: ["image/avif", "image/webp"], // modern formats, smaller files
    deviceSizes: [640, 750, 828, 1080, 1200], // responsive breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256], // thumbnail sizes
  },
};

export default nextConfig;
