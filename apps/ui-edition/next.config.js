/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@bytescope/ui",
    "@bytescope/theme",
    "@bytescope/config",
    "@bytescope/content",
    "@bytescope/seo",
  ],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
};

module.exports = nextConfig;
