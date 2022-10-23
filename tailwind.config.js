module.exports = {
  content: [
    "App.tsx",
    "./screens/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./navigation/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
};
