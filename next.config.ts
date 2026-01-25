import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    remotePatterns: [
      
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: 'skillicons.dev',
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mipdleioisirckqzkyzg.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      }
    ],
  },
};

export default nextConfig;
