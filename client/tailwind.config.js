/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                'create-blue': '#4A90E2', // Blue from the create account and Welcome message.
            },
            fontFamily: {
                syne: ['Syne', 'sans-serif'],
            },
        },
    },
    plugins: [],
};