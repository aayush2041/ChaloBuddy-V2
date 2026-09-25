import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: { extend: { colors: { ink: "#10231b", mint: "#dff6e8", leaf: "#1f7a52", sun: "#ffcf56", sand: "#fff9ed" }, boxShadow: { soft: "0 12px 35px rgba(16,35,27,.08)" } } },
  plugins: []
};
export default config;
