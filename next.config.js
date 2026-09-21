/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    // A real Node server (the VPS) is running now, so Next's built-in
    // image optimizer works normally — no need for `unoptimized: true`
    // (that was only required for the static export previously used on
    // GitHub Pages, which is no longer part of this project).
    remotePatterns: [
      {
        // Local Strapi, for `npm run dev`.
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        // Production Strapi on the VPS.
        protocol: "http",
        hostname: "74.50.87.101",
        port: "1338",
        pathname: "/uploads/**",
      },
      // Swap the pattern above for this once Strapi is behind a real
      // domain + HTTPS instead of a bare IP:
      // {
      //   protocol: "https",
      //   hostname: "your-strapi-domain.com",
      //   pathname: "/uploads/**",
      // },
    ],
  },
};

module.exports = nextConfig;
