/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add webpack configuration to handle Playwright/Mermaid dependencies
  webpack: (config, { isServer }) => {
    // This is needed for rehype-mermaidjs which uses Playwright for rendering
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        readline: false,
        perf_hooks: false,
        os: false,
        util: false,
        path: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
