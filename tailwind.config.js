/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      spacing: {
        "box": "1rem",
        "box-sm": "0.5rem",
        "box-md": "1rem",
        "box-lg": "1.5rem",
      },
    },
  },
  plugins: [require('daisyui')],
}

