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

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'], // Ensure this includes all your files
    theme: {
        extend: {
            keyframes: {
                fadeInDown: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInFromLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideInFromRight: {
                    '0%': { opacity: '0', transform: 'translateX(20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
            },
            animation: {
                fadeInDown: 'fadeInDown 0.6s ease-out',
                fadeInUp: 'fadeInUp 0.6s ease-out',
                slideInFromLeft: 'slideInFromLeft 0.6s ease-out',
                slideInFromRight: 'slideInFromRight 0.6s ease-out',
            },
        },
    },
    plugins: [],
};