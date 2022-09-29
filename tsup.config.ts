import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./plugins/index.ts'],
  format: ['esm'],
  target: 'node14',
  clean: true,
  dts: true,
  sourcemap: true,
  splitting: false,
})
