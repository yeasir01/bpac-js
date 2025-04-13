import { defineConfig } from "tsup";

const inDev = process.env.NODE_ENV !== "production";
const inProd = process.env.NODE_ENV === "production"

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["esm"],
    dts: true,
    sourcemap: inDev,
    clean: true,
    splitting: false,
    minify: inProd,
    outDir: "dist",
});
