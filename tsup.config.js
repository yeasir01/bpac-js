import { defineConfig } from "tsup";

const inDev = process.env.NODE_ENV !== "production";
const inProd = process.env.NODE_ENV === "production"

export default defineConfig({
    entry: ["src/**/*.ts"],
    clean: true,
    splitting: false,
    sourcemap: inDev,
    minify: inProd,
    bundle: inProd,
    target: "es2022",
    format: ["cjs", "esm"],
    dts: true
});
