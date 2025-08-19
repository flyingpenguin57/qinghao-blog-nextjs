import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['www.robohash.org', 'github.com', 'www.bing.com', "th.bing.com"], // 加上你要加载的外部域名
  },
};

export default nextConfig;
