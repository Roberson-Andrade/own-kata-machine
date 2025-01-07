/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    exclude: ['node_modules'],
    globals: true
  },
})