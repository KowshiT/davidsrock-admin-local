const path = require("path");

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["i.ibb.co", "davidsrockfileserver.s3.amazonaws.com"],
  },
  experimental: {
    appDir: true,
    fontLoaders: [
      { loader: "@next/font/google", options: { subsets: ["latin"] } },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "globals")],
  },
  cache: false,
};
