import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import swc from 'unplugin-swc';

export default defineConfig({
  test: {
    globals: true,
    root: './',
    environment: 'node',
    include: ['src/**/*.spec.ts', 'src/**/*.test.ts', 'test/**/*.spec.ts'],
    alias: {
      // Caso precise mapear algo manualmente, mas o tsconfigPaths já resolve a maioria
    },
  },
  plugins: [
    tsconfigPaths(),
    // Integração com o SWC para compilar os decorators do NestJS rapidamente
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
});
