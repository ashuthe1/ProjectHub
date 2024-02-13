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
          "url('https://firebasestorage.googleapis.com/v0/b/bestfriends-7cfa8.appspot.com/o/ProjectHub%2Fheader-img.svg?alt=media&token=a6cff625-34fd-4c5b-bbc9-2a04ff3d40da')",
        hero: "url('https://firebasestorage.googleapis.com/v0/b/bestfriends-7cfa8.appspot.com/o/ProjectHub%2Fheader-img.svg?alt=media&token=a6cff625-34fd-4c5b-bbc9-2a04ff3d40da')",
      },
    },
  },
  plugins: [],
};
