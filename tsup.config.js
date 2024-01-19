import { defineConfig } from 'tsup';

const env = process.env.NODE_ENV;

export default defineConfig({
  entry: ['src/**/*.ts'],
  clean: true,
  splitting: true,
  sourcemap: true,
  minify: env === 'production',
  bundle: env === 'production',
  target: 'es2022',
  dts: true,
  bundle: true,
  splitting: false,
  format: ['cjs', 'esm'],
  outDir: env === 'production' ? 'dist' : 'lib',
});