/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: true, // Enable gzip compression
    async headers() {
        return [
            {
                source: '/:all*(svg|jpg|png|hdr)',
                locale: false,
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
