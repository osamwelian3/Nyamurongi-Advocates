/** @type {import('next').NextConfig} */

// Set only by the "predeploy" npm script (see package.json), which runs
// before `npm run deploy` pushes the static build to GitHub Pages.
// Local `npm run dev` / `npm run build` are unaffected, and once Strapi
// integration lands you'll likely move to a Node-capable host (Vercel,
// Render, etc.) that doesn't need any of this — just don't set the env
// var in whatever deploys there.
const isGhPages = process.env.DEPLOY_TARGET === "gh-pages";

// Must match the GitHub repo name exactly (case-sensitive) — it becomes
// the URL subpath: https://<user>.github.io/<repoName>/
const repoName = "Nyamurongi-Advocates";

const nextConfig = {
  ...(isGhPages && {
    output: "export",
    basePath: `/${repoName}`,
    assetPrefix: `/${repoName}/`,
    trailingSlash: true,
  }),
  images: {
    // Static export has no image-optimization server, so this must be
    // true whenever isGhPages is set. Harmless to leave on generally.
    unoptimized: true,
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
