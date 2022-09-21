module.exports = {
  // typescript: {
  //   // !! WARN !!
  //   // Dangerously allow production builds to successfully complete even if
  //   // your project has type errors.
  //   // !! WARN !!
  //   ignoreBuildErrors: true,
  // },
  // webpack: (config, { isServer }) => {
  //   if (process.env.ANALYZE && !isServer) {
  //     const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
  //     config.plugins.push(
  //       new BundleAnalyzerPlugin({
  //         analyzerMode: 'server',
  //         analyzerPort: 8888,
  //         openAnalyzer: true
  //       })
  //     );
  //   }
  //   return config;
  // },
  serverRuntimeConfig: {
    captchaSecretToken: process.env.RECAPTCHA_SECRET_TOKEN,
    emailAuthUsername: process.env.EMAIL_AUTH_USERNAME,
    emailAuthPassword: process.env.EMAIL_AUTH_PASSWORD,
    mailchimpApiToken:process.env.SUBSCRIBE_MAILCHIMP_API_TOKEN,
    mailchimpListId:process.env.SUBSCRIBE_MAILCHIMP_LIST_ID
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/home'
      },
      {
        source: '/favicon.ico',
        destination: process.env.NEXT_PUBLIC_API_URL + '/fo_favicon.ico'
      },
      {
        source: '/sitemap.xml',
        destination: process.env.NEXT_PUBLIC_API_URL + '/sitemap.xml'
      },
      {
        source: '/robots.txt',
        destination: process.env.NEXT_PUBLIC_API_URL + '/robots.txt'
      }
    ];
  },
  images: {
    domains: ['localhost', 'storage.googleapis.com'],
  },
  env: {
    homeUrl: '/home',
    reValidation: 10 * 60,
    speechlyToken: process.env.SPEECHLY_API_TOKEN,
    debug: process.env.DEBUG
  },
  poweredByHeader: false
};
