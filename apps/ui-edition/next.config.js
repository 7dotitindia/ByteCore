/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@bytescope/ui", "@bytescope/theme", "@bytescope/config"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

module.exports = nextConfig;
