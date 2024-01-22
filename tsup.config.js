import { defineConfig } from "tsup";

const inDev = process.env.NODE_ENV !== "production";
const inProd = process.env.NODE_ENV === "production"

export default defineConfig({
    entry: ["src/index.ts"],
    clean: true,
    splitting: false,
    sourcemap: inDev,
    minify: inProd,
    bundle: true,
    format: ["esm", "cjs"],
    dts: true,
});
