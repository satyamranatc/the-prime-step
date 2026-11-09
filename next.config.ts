import type { NextConfig } from "next";

const securityHeaders = [
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
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  cacheComponents: true,
  partialPrefetching: true,

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/brand/:all*(svg|png|jpg|webp|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/tech/:all*(svg|png|jpg|webp|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/cartoon_sports_car.glb",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // 301 Permanent Redirects to preserve existing SEO equity & historical rankings
      {
        source: "/courses",
        destination: "/#programs",
        permanent: true,
      },
      {
        source: "/courses/:slug",
        destination: "/#programs",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/#admission",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/#admission",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/#learning",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "/#learning",
        permanent: true,
      },
      {
        source: "/placement",
        destination: "/#careers",
        permanent: true,
      },
      {
        source: "/java-full-stack-developer",
        destination: "/roadmap/java",
        permanent: true,
      },
      {
        source: "/python-programming-classes",
        destination: "/roadmap/python",
        permanent: true,
      },
      {
        source: "/mern-stack-developer-course",
        destination: "/roadmap/mern",
        permanent: true,
      },
      {
        source: "/android-app-development",
        destination: "/#programs",
        permanent: true,
      },
      {
        source: "/data-science-and-analytics-courses-in-indore",
        destination: "/#programs",
        permanent: true,
      },
      {
        source: "/power-bi-course-in-indore",
        destination: "/#programs",
        permanent: true,
      },
      {
        source: "/tally-gst-mastery-course",
        destination: "/#programs",
        permanent: true,
      },
    ];
  },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
