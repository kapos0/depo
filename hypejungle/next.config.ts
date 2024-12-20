import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    //remove in production because it's not safe
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*",
            },
        ],
    },
}

export default nextConfig
