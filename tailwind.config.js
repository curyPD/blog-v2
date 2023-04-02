const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./context/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            xs: "480px",
            ...defaultTheme.screens,
        },
        extend: {
            fontFamily: {
                sans: [
                    "var(--font-open-sans)",
                    ...defaultTheme.fontFamily.sans,
                ],
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
