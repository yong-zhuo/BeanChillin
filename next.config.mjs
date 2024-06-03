/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
    },
    redirects: async () => {
        return [
            {
                source: '/',
                destination: '/login',
                permanent: true
            },
            
        ]
    }
};
export default nextConfig

