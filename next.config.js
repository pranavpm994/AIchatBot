/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/api/chat',
        destination: '/api/middleware',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
