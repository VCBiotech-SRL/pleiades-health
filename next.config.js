/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      "public.blob.vercel-storage.com",
      "res.cloudinary.com",
      "abs.twimg.com",
      "pbs.twimg.com",
      "avatars.githubusercontent.com",
      "www.google.com",
      "lh3.googleusercontent.com",
      "flag.vercel.app",
      "illustrations.popsy.co",
      "images.unsplash.com",
    ],
  },
  reactStrictMode: false,
};
