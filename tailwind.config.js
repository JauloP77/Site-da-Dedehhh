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
        navy: "#13294B",
        sun: "#F8C646",
        cream: "#FBF7EF",
        sky: "#7FA9D6",
        whatsapp: "#25D366",
        "whatsapp-foreground": "#FFFFFF",
      },
      boxShadow: {
        soft: "0 12px 32px -12px rgba(19, 41, 75, 0.14)",
        lift: "0 20px 45px -15px rgba(19, 41, 75, 0.22)",
      },
    },
  },
  plugins: [],
};
