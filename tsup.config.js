import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  clean: true,
  dts: true,
  splitting: false,
  format: ['cjs', 'esm'],
});