module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "Plus Jakarta Sans",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      colors: {
        primary: {
          50: "#e6ebf5",
          100: "#ccd7eb",
          200: "#99afd6",
          300: "#6687c2",
          400: "#335fad",
          500: "#003399",
          600: "#002e8a",
          700: "#002673",
          800: "#001f5c",
          900: "#001845",
        },
        navy: {
          DEFAULT: "#0B1F3A",
          50: "#eef2f7",
          100: "#d5deea",
          900: "#0B1F3A",
          950: "#061224",
        },
        accent: {
          50: "#e6fdf7",
          100: "#c5f6ec",
          200: "#94ebd8",
          300: "#56d7be",
          400: "#2ab89e",
          500: "#0ea885",
          600: "#0b826d",
          700: "#0b6957",
          800: "#0d5346",
          900: "#10423b",
        },
        surface: {
          DEFAULT: "#f8fbff",
          muted: "#edf4ff",
        },
      },
      boxShadow: {
        soft: "0 20px 60px rgba(15, 23, 42, 0.08)",
        glow: "0 24px 80px rgba(0, 51, 153, 0.18)",
        card: "0 4px 24px rgba(11, 31, 58, 0.06)",
        "card-hover": "0 12px 40px rgba(0, 51, 153, 0.12)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top, rgba(0, 51, 153, 0.22), transparent 45%), radial-gradient(circle at 80% 80%, rgba(14, 168, 133, 0.12), transparent 35%)",
        "mesh-light":
          "radial-gradient(at 40% 20%, rgba(0, 51, 153, 0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(14, 168, 133, 0.06) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(0, 51, 153, 0.05) 0px, transparent 50%)",
        "mesh-dark":
          "radial-gradient(at 40% 20%, rgba(0, 51, 153, 0.35) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(14, 168, 133, 0.15) 0px, transparent 50%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
