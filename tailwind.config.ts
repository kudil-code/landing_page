import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4A6FA5',
          dark: '#3a5a8a',
        },
        muted: {
          DEFAULT: '#D3D3D3',
          border: '#b8b8b8',
        },
      },
    },
  },
  plugins: [],
};

export default config;



