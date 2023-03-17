/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/ws',
        destination: `http://localhost:5000`
      }
    ]
  }
}

module.exports = nextConfig
