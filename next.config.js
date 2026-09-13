/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow images to be served from the Strapi backend.
    // Update the hostname/port once Strapi is deployed.
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      // {
      //   protocol: "https",
      //   hostname: "your-strapi-domain.com",
      //   pathname: "/uploads/**",
      // },
    ],
  },
};

module.exports = nextConfig;
