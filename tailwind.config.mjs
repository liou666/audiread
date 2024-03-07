import { getIconCollections, iconsPlugin } from '@egoist/tailwindcss-icons'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  plugins: [iconsPlugin({
    collections: getIconCollections(['mdi', 'ic', 'carbon', 'eos-icons', 'material-symbols']),
  })],
  theme: {
    extend: {
      colors: {
        primary: 'var(--c-primary)',
        secondary: 'var(--c-secondary)',
        accent: 'var(--c-accent)',
        default: 'var(--c-text-default)',
        muted: 'var(--c-text-muted)',
        border: {
          default: 'var(--c-border-base)',
        },
      },
      backgroundColor: {
        'page': 'var(--c-bg-page)',
        'page-dark': 'var(--c-bg-page-dark)',
        'active': 'var(--c-accent)',
      },
      textColor: {
        page: 'var(--c-text-page)',
        muted: 'var(--c-text-muted)',
      },

    },
  },
}
