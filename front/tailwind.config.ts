import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    fontFamily: {
      sans: 'var(--font-bebas)',
      mono: 'var(--font-antonio)'
    },
      keyframes: {
        display: {
          '0%': { transform: 'translateX(200px)', opacity: '0' },
          '10%': { transform: 'translateX(0)', opacity: '1' },
          '20%': { transform: 'translateX(0)', opacity: '1' },
          '30%': { transform: 'translateX(-200px)', opacity: '0' },
          '100%': { transform: 'translateX(-200px)', opacity: '0' },
        },
      },
      animation : {
        display: 'display 16s infinite'
      }
    },
  },
  plugins: [],
};
export default config;
