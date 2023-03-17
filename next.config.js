/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/ws',
        destination: `http://192.168.105.131:5000`
      }
    ]
  }
}

module.exports = nextConfig
