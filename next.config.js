/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
};

module.exports = nextConfig;+

> SSGPT6-1f691

</>

Publish

next.config.js X

/** @type {import('next'). NextConfig} */

const nextConfig = {

reactStrictMode: true,

// Increase the timeout for serverless function

serverActions: {

},

bodySizeLimit: '10mb',

experimental: {

serverActionsTimeout: 120, // 2 minutes

}

};

module.exports = nextConfig;