import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/mars-application/", // <-- Ensure this matches your repo name
  plugins: [react()]
});
