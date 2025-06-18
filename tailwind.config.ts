// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app.vue',
    './components/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './src/**/*.{vue,js,ts}',
    './**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
