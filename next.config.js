/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oaidalleapiprodscus.blob.core.windows.net',
      }
    ],
    domains: ['oaidalleapiprodscus.blob.core.windows.net', '127.0.0.1']
  },
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