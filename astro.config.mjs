import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'
import AstroPWA from '@vite-pwa/astro'
import solidJs from '@astrojs/solid-js'

import { pwa } from './src/config/pwa'

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: 'en',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [
    AstroPWA(pwa),
    solidJs(),
    tailwind(),
  ],
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
})
