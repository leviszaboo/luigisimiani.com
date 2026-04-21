// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Local images only - no remote patterns needed
  images: {
    unoptimized: false,
  },
  // Rewrite /admin to serve static admin page
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/admin",
          destination: "/admin/index.html",
        },
        {
          source: "/config.yml",
          destination: "/admin/config.yml",
        },
      ],
    };
  },
  // Security headers for production
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  // Compression and performance
  compress: true,
  poweredByHeader: false,
};

module.exports = nextConfig;
