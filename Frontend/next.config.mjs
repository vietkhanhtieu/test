/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Add credential to here then call with process.env
    uatApiKey: '6CBxzdYcEgNDrRhMbDpkBF7e4d4Kib46dwL9ZE5egiL0iL5Y3dzREUBSUYVUwUkN'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'trungtamduocpham.com'
      },
      {
        protocol: 'https',
        hostname: '**.trungtamduocpham.com'
      }
    ]
  }
}

export default nextConfig
