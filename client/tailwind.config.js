/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffaa07",
        primaryLight: "#ffb629",
        light: "#fffefc",
      },
      backgroundImage: {
        login:
          "url('https://res-console.cloudinary.com/djqpqsjtq/media_explorer_thumbnails/f0156bf52f432458eb1b1f850eca625d/detailed')",
        hero: "url('https://res-console.cloudinary.com/djqpqsjtq/media_explorer_thumbnails/f0156bf52f432458eb1b1f850eca625d/detailed')",
      },
    },
  },
  plugins: [],
};
