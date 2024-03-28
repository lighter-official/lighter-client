/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['gloo-image-bucket.s3.amazonaws.com'], // Add your image host name here
    },
  };
export default nextConfig;
