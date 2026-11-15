/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // The site moved to ravuri.dev; the old domain sends every path there
      // so search engines see one site, not two copies.
      {
        source: "/:path*",
        has: [{ type: "host", value: "(www\\.)?krishnar\\.xyz" }],
        destination: "https://www.ravuri.dev/:path*",
        permanent: true,
      },
      // Routes the old site had that no longer exist.
      { source: "/github", destination: "/about", permanent: true },
      { source: "/forbidden", destination: "/", permanent: true },
      { source: "/projects", destination: "/work", permanent: true },
      // Old resume files (removed: they carried a phone number and were out of date).
      // The resume PDF is now Leelakrishna-Ravuri-Resume.pdf (printed by scripts/resume-pdf.mjs).
      { source: "/resume/Leelakrishna-Ravuri-ATS.pdf", destination: "/resume/Leelakrishna-Ravuri-Resume.pdf", permanent: true },
      { source: "/resume/Krishna-Ravuri-Resume.pdf", destination: "/resume/Leelakrishna-Ravuri-Resume.pdf", permanent: true },
      { source: "/resume/Leelakrishna_Ravuri_Original.pdf", destination: "/resume/Leelakrishna-Ravuri-Resume.pdf", permanent: true },
      { source: "/resume/resume-ats.txt", destination: "/resume.txt", permanent: true },
    ];
  },
};

export default nextConfig;
