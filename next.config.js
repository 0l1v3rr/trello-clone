/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**.unsplash.com" }],
  },
};

module.exports = nextConfig;
