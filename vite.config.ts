import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/@cake-admin/cakeand')) return 'cakeand';
          if (id.includes('node_modules/@radix-ui') || id.includes('node_modules/radix-ui')) {
            return 'radix';
          }
          if (id.includes('node_modules/lucide-react')) return 'icons';
          if (id.includes('node_modules/styled-components') || id.includes('node_modules/stylis')) {
            return 'styles';
          }
          if (
            id.includes('node_modules/react') ||
            id.includes('node_modules/scheduler')
          ) {
            return 'react';
          }
          return undefined;
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    server: {
      deps: {
        inline: ['@cake-admin/cakeand'],
      },
    },
  },

  resolve: {
    // styled-components MUST resolve to a single instance. Two copies in one app
    // means two stylesheets and two theme contexts, and every cake& component
    // silently loses its theme — no error, it just renders unstyled. react and
    // react-dom are here for the same class of failure (duplicate hook
    // dispatchers). This matters as soon as you add a dependency that brings its
    // own copy along, which is why it is set up front rather than after a bug.
    dedupe: ['styled-components', 'react', 'react-dom'],
  },

  server: { open: true },
});
