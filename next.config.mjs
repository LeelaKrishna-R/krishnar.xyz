/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // Routes the old site had that no longer exist.
    return [
      { source: "/github", destination: "/about", permanent: true },
      { source: "/forbidden", destination: "/", permanent: true },
      { source: "/projects", destination: "/work", permanent: true },
    ];
  },
};

export default nextConfig;
