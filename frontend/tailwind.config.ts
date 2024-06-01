import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx}"

  ],
  theme: {
    extend: {
      fontFamily: {
        // ...fontFamily,
        'sans': ['Arial', 'Helvetica', 'sans-serif'],
        'roboto': ['roboto'],
        'Poppints': ['poppins']
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        dark: '#15151B',
        alto: '#E0E0E0',
        sand: '#F5F5F5',
        'light-gray': '#D9D9D9',
        'blue-gray': '#b8bdc9',
        'first-blue': '#274C5B',
        'first-blue-hover': '#4688a3',
        'sec-blue': "#1890FF",
        'sec-blue-hover': "#015fb7",
        'dark-blue-hover': "#004CB0",
        'purple-blue': "rgb(89, 31, 249)",
        'purple-blue-hover': "#541CE5",
      },
    },
  },
  plugins: [],
};
export default config;
