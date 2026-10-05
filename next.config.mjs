/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // Prevents leaking Next.js server technology
  compress: true,
  images: {
    unoptimized: true,
  },
  async headers() {
    const securityHeaders = [
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
      {
        key: "X-Frame-Options",
        value: "SAMEORIGIN",
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=()",
      },
      {
        key: "X-DNS-Prefetch-Control",
        value: "on",
      },
    ];

    if (isProd) {
      securityHeaders.push({
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      });
    }

    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/solutions",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/portfolio",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/news",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
