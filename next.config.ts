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
      // 301 Permanent Redirects preserving 100% historical SEO equity & Live Google SERP rankings
      // CRITICAL: Live Google AI Overview & Top Organic Sitelinks
      { source: "/home-2", destination: "/", permanent: true },
      { source: "/the-prime-step-in-bhawarkua", destination: "/bhawarkua", permanent: true },
      { source: "/the-prime-step-in-annapurna", destination: "/annapurna", permanent: true },
      { source: "/the-prime-step-in-vijay-nagar", destination: "/vijay-nagar", permanent: true },
      { source: "/about-us-2/the-prime-step-institute-2", destination: "/about-us", permanent: true },

      // About Us
      { source: "/about", destination: "/about-us", permanent: true },
      { source: "/about-us-2", destination: "/about-us", permanent: true },
      { source: "/about-us-2/:slug*", destination: "/about-us", permanent: true },
      { source: "/why-the-prime-step-institute-is-indores-most-trusted-it-training-center", destination: "/about-us", permanent: true },
      { source: "/instructors", destination: "/about-us", permanent: true },

      // Contact Us
      { source: "/contact", destination: "/contact-us", permanent: true },
      { source: "/the-prime-step-contact-us", destination: "/contact-us", permanent: true },

      // Python
      { source: "/courses/best-python-training-institute-in-indore", destination: "/python-programming-classes", permanent: true },
      { source: "/courses/python-core-advanced", destination: "/python-programming-classes", permanent: true },
      { source: "/which-programming-language-to-learn-first-in-2024", destination: "/python-programming-classes", permanent: true },
      { source: "/top-5-programming-languages-2025-indore", destination: "/python-programming-classes", permanent: true },
      { source: "/top-8-programming-languages-of-2024", destination: "/python-programming-classes", permanent: true },

      // Java
      { source: "/java-full-stack-developer-course-in-indore", destination: "/java-full-stack-developer", permanent: true },
      { source: "/courses/java-core-advanced", destination: "/java-full-stack-developer", permanent: true },

      // MERN & Web Development & PHP
      { source: "/best-php-training-institute-in-indore", destination: "/web-design-and-php-full-stack-course", permanent: true },
      { source: "/courses/full-stack-development", destination: "/web-design-and-php-full-stack-course", permanent: true },
      { source: "/courses/full-stack-development-course-in-indore", destination: "/web-design-and-php-full-stack-course", permanent: true },
      { source: "/best-full-stack-developer-course-in-indore", destination: "/mern-stack-developer-course", permanent: true },
      { source: "/database-management-in-full-stack-development", destination: "/mern-stack-developer-course", permanent: true },
      { source: "/sql-structured-query-language", destination: "/mern-stack-developer-course", permanent: true },
      { source: "/web-development", destination: "/web-design-and-php-full-stack-course", permanent: true },
      { source: "/website-design", destination: "/web-design-and-php-full-stack-course", permanent: true },

      // C & C++
      { source: "/courses/c-c", destination: "/c-and-cpp-programming-classes", permanent: true },
      { source: "/courses/c-programming-class-in-indore", destination: "/c-and-cpp-programming-classes", permanent: true },

      // Mobile App & Flutter
      { source: "/dart-flutter", destination: "/android-app-development", permanent: true },
      { source: "/mobile-development", destination: "/android-app-development", permanent: true },

      // AI & Machine Learning
      { source: "/artificial-intelligence-ai-course-training-in-indore", destination: "/artificial-intelligence-and-machine-learning-course", permanent: true },
      { source: "/artificial-intelligence-ai-course-training-in-indore-2", destination: "/artificial-intelligence-and-machine-learning-course", permanent: true },
      { source: "/artificial-intelligence-explained-the-prime-step", destination: "/artificial-intelligence-and-machine-learning-course", permanent: true },
      { source: "/machine-learning-course-in-indore", destination: "/artificial-intelligence-and-machine-learning-course", permanent: true },
      { source: "/machine-learning-course", destination: "/artificial-intelligence-and-machine-learning-course", permanent: true },
      { source: "/generative-ai", destination: "/artificial-intelligence-and-machine-learning-course", permanent: true },
      { source: "/affordable-ai-courses-for-college-students-learn-smartly", destination: "/artificial-intelligence-and-machine-learning-course", permanent: true },
      { source: "/top-5-ai-tools-students-must-learn-before-2026", destination: "/artificial-intelligence-and-machine-learning-course", permanent: true },

      // Data Science & Power BI
      { source: "/courses/data-science-analytics", destination: "/data-science-and-analytics-courses-in-indore", permanent: true },
      { source: "/courses/data-science-and-analytics-courses-in-indore", destination: "/data-science-and-analytics-courses-in-indore", permanent: true },
      { source: "/power-bi-course", destination: "/power-bi-course-in-indore", permanent: true },
      { source: "/best-power-bi-course-in-indore", destination: "/power-bi-course-in-indore", permanent: true },

      // Digital Marketing
      { source: "/courses/digital-marketing-classes-in-indore", destination: "/digital-marketing-course-in-indore", permanent: true },
      { source: "/digital-marketing-course-your-path-to-success", destination: "/digital-marketing-course-in-indore", permanent: true },
      { source: "/top-digital-marketing-tools-every-student-should-master", destination: "/digital-marketing-course-in-indore", permanent: true },
      { source: "/top-digital-marketing-trends-in-indore", destination: "/digital-marketing-course-in-indore", permanent: true },
      { source: "/how-to-make-money-online-through-affiliate-marketing", destination: "/digital-marketing-course-in-indore", permanent: true },
      { source: "/how-ai-is-transforming-digital-marketing-strategies", destination: "/digital-marketing-course-in-indore", permanent: true },

      // Tally GST (Accounting Specific)
      { source: "/courses/tally-gst-mastery-course", destination: "/tally-gst-mastery-course", permanent: true },
      { source: "/introduction-to-tally-gst-and-gst-module-in-tally", destination: "/tally-gst-mastery-course", permanent: true },

      // MS Office & Advanced Excel (Dedicated High-Intent Route)
      { source: "/courses/mastering-microsoft-office-suite", destination: "/ms-office-and-excel-course-in-indore", permanent: true },
      { source: "/courses/microsoft-office-suite-course", destination: "/ms-office-and-excel-course-in-indore", permanent: true },
      { source: "/courses/advance-excel-2", destination: "/ms-office-and-excel-course-in-indore", permanent: true },
      { source: "/courses/best-microsoft-excel-classes-in-indore", destination: "/ms-office-and-excel-course-in-indore", permanent: true },
      { source: "/courses/best-ms-office-classes-in-indore", destination: "/ms-office-and-excel-course-in-indore", permanent: true },
      { source: "/courses/ms-office", destination: "/ms-office-and-excel-course-in-indore", permanent: true },

      // Restored Blog Articles (1:1 301 Redirects preserving old rankings)
      { source: "/top-digital-marketing-careers-you-need-to-know-in-2025", destination: "/blog/top-digital-marketing-careers", permanent: true },
      { source: "/which-programming-language-to-learn-first-in-2024", destination: "/blog/best-programming-languages-to-learn", permanent: true },
      { source: "/category/blog/excels-top-10-formulas-blog", destination: "/blog/top-10-excel-formulas-functions", permanent: true },
      { source: "/excel-formulas-functions-to-boost-productivity", destination: "/blog/top-10-excel-formulas-functions", permanent: true },

      // English & Corporate Training
      { source: "/courses/spoken-english", destination: "/english-courses", permanent: true },
      { source: "/courses/foundation-english-speaking-course", destination: "/english-courses", permanent: true },
      { source: "/spoken-english-classes-in-indore", destination: "/english-courses", permanent: true },
      { source: "/personal-development", destination: "/corporate-training", permanent: true },
      { source: "/courses/corporate-training", destination: "/corporate-training", permanent: true },

      // Placement & Career Courses
      { source: "/placement", destination: "/career-courses", permanent: true },
      { source: "/placement-institute", destination: "/career-courses", permanent: true },
      { source: "/computer-classes-and-placement-in-vijay-nagar-indore", destination: "/career-courses", permanent: true },
      { source: "/best-computer-courses-for-placement-in-indore-2025", destination: "/career-courses", permanent: true },
      { source: "/how-the-prime-step-institute-ensures-top-tech-company-placements", destination: "/career-courses", permanent: true },
      { source: "/student-success-stories", destination: "/career-courses", permanent: true },
      { source: "/courses/career-courses", destination: "/career-courses", permanent: true },

      // Dedicated /faq and /blog Hubs
      { source: "/pricing-faq", destination: "/faq", permanent: true },
      { source: "/blog-page", destination: "/blog", permanent: true },

      // General, Directory & Fallbacks
      { source: "/all-courses", destination: "/courses", permanent: true },
      { source: "/computer-basic", destination: "/courses", permanent: true },
      { source: "/coding-classes-near-me", destination: "/courses", permanent: true },
      { source: "/best-computer-classes-near-you-the-prime-step", destination: "/courses", permanent: true },
      { source: "/top-10-computer-course-after-10-alass", destination: "/courses", permanent: true },
      { source: "/top-10-it-and-computer-course-after-10-class", destination: "/courses", permanent: true },
      { source: "/the-world-of-online-coding-classes", destination: "/courses", permanent: true },
      { source: "/services", destination: "/courses", permanent: true },
      { source: "/category/:slug*", destination: "/courses", permanent: true },
      { source: "/courses/:slug*", destination: "/courses", permanent: true },
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
