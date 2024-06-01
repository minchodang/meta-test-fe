const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();
const { withSentryConfig } = require('@sentry/nextjs');
/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'standalone',
    sentry: {
        hideSourceMaps: true,
    },
};

const sentryWebpackConfig = {
    silent: true,
    authToken: process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN,
};
module.exports = withNextIntl(withSentryConfig(nextConfig, sentryWebpackConfig));
