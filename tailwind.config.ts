/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";
const tailwindTheme = require("tailwindcss/defaultTheme");

const screenHeightsPercentage = [10, 20, 30, 40, 50, 60, 70, 80, 90];

const createScreenHeightsClasses = (screenUnit: string, name: string) => ({
  ...tailwindTheme.spacing,
  ...screenHeightsPercentage.reduce(
    (acc, unit) => ({
      ...acc,
      [`${unit}-${name}`]: `${unit}${screenUnit}`,
    }),
    {}
  ),
});

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      minHeight: {
        ...createScreenHeightsClasses("dvh", "screen"),
      },
      height: {
        ...createScreenHeightsClasses("dvh", "screen"),
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        mirage: {
          "50": "#f5f7fa",
          "100": "#eaedf4",
          "200": "#d0d8e7",
          "300": "#a7b8d2",
          "400": "#7892b8",
          "500": "#5774a0",
          "600": "#445d85",
          "700": "#384b6c",
          "800": "#31405b",
          "900": "#2d384d",
          "950": "#1a202d",
        },
      },
    },
  },
  plugins: [],
};
export default config;
