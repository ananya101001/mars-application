import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/mars-application/', // Set base path for GitHub Pages
  plugins: [react()],
});