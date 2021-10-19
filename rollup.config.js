import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.js",
  output: {
    file: "dist/index.js",
    format: "umd",
    name: "kuva",
    sourcemap: true,
  },
  plugins: [process.env.NODE_ENV === "production" && terser()]
}
