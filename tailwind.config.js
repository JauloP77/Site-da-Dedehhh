/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        display: ['"Fraunces"', "Georgia", "serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        navy: "#C2648C",
        sun: "#DFC5FE",
        cream: "#FDF0F6",
        sky: "#C5A3EE",
        whatsapp: "#25D366",
        "whatsapp-foreground": "#FFFFFF",
      },
      boxShadow: {
        soft: "0 12px 32px -12px rgba(154, 78, 118, 0.16)",
        lift: "0 20px 45px -15px rgba(154, 78, 118, 0.24)",
      },
    },
  },
  plugins: [],
};
