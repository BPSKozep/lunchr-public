/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    webpack: (config) => {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        };
        return config;
    },
    output: "standalone",
    images: {
        domains: ["cdn.bpskozep.hu"],
    },
};

module.exports = nextConfig;
