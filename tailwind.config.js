module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    screens: {
      xxs: { 'max': '299px' },
      xs: { 'max': '767px' },
      mobileS: { 'min': '300px', 'max': '319px' },
      mobileM: { 'min': '320px', 'max': '374px' },
      mobileLs: { 'max': '424px' },
      mobileL: { 'min': '375px', 'max': '424px' },
      tabs: { 'min': '425px', 'max': '639px' },
      sm: { 'min': '640px', 'max': '767px' },
      mds: { 'max': '928px' },
      md: { 'min': '768px', 'max': '1023px' },
      lgs: { 'max': '1023px' },
      lg: { 'min': '1024px', 'max': '1279px' },
      xl: { 'min': '1280px', 'max': '1535px' },
      xxl: { 'min': '1536px' },
      xxxl: { 'min': '768px' },
    },
    extend: {},
  },
  plugins: [],
};
