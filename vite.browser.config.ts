import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: 'es2018',
    sourcemap: true,
    emptyOutDir: false,
    minify: 'oxc',
    lib: {
      entry: 'src/index.ts',
      name: 'taiwanIdValidator',
      formats: ['umd'],
      fileName: () => 'index.global.min.js'
    }
  }
})
