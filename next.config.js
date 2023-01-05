// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const isProd = process.env.NODE_ENV === 'production'
const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@babel/preset-react",
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
  "@fullcalendar/timegrid"
]);
const nextConfig = withTM({
  reactStrictMode: false,
  trailingSlash: true,
  swcMinify: true,
  // basePath: isProd ? '/spruha/preview' : undefined,
  // basePath: '/components/dashboard/dashboard/',
  // assetPrefix : isProd ? 'https://nextjs.spruko.com/spruha/preview/' : undefined,
  images: {
    loader:"akamai",
    path:""
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/optimism/overview/',
        permanent: true
      }
    ]
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
 
})

module.exports = nextConfig
   
