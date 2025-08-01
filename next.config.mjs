/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", // isteğe bağlı, senin portun farklıysa ona göre ayarla
        pathname: "/**",
      },
    ],
    domains: ["localhost"],
  },
};

export default nextConfig;
