/** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["gloo-image-bucket.s3.amazonaws.com"],
//   },
// };
// export default nextConfig;

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gloo-image-bucket.s3.amazonaws.com",
        pathname: "/archive/**",
      },
    ],
  },
};
