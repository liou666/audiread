import { getIconCollections, iconsPlugin } from '@egoist/tailwindcss-icons'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  plugins: [iconsPlugin({
    collections: getIconCollections(['mdi', 'ic', 'carbon']),
  })],
  theme: {
    extend: {
      colors: {
        primary: 'var(--c-primary)',
        secondary: 'var(--c-secondary)',
        accent: 'var(--c-accent)',
        default: 'var(--c-text-default)',
        muted: 'var(--c-text-muted)',
      },
    },
  },
}
