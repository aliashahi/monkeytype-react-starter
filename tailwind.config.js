module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-color": '#323437',
        "main-color": '#e2b714',
        "sub-color": '#646669',
        "text-color": '#d1d0c5',
        "error-color": '#ca4754',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
