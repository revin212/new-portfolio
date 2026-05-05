/** @type {import('next').NextConfig} */
const nextConfig = {
  // Browsers request /favicon.ico first; map it to the real logo so the tab icon is consistent (esp. after dev errors / cache).
  async rewrites() {
    return [
      {
        source: "/favicon.ico",
        destination: "/images/revin-logo.png",
      },
    ];
  },
};

module.exports = nextConfig;
