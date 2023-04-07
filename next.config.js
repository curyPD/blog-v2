/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
                port: "",
                pathname: "/v0/b/blog-website-5d95e.appspot.com/o/**",
            },
        ],
    },
};

module.exports = nextConfig;
