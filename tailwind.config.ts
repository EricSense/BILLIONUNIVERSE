import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        universe: {
          dark: '#0a0a0f',
          card: '#12121a',
          border: '#1e1e2e',
          accent: '#6366f1',
          muted: '#71717a',
        },
      },
    },
  },
  plugins: [],
};

export default config;
