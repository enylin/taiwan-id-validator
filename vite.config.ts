import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: 'es2020',
    sourcemap: true,
    // The runtime build intentionally clears dist before declaration files are emitted.
    emptyOutDir: true,
    minify: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: format => (format === 'es' ? 'index.js' : 'index.cjs')
    }
  }
})
