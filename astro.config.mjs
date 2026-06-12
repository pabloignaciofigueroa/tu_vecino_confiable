// @ts-check
import { defineConfig } from 'astro/config';

// Web-app estática "Tu Vecino Confiable".
// Sitio configurable por env para que las og:image salgan absolutas al deployar.
export default defineConfig({
  site: process.env.SITE_URL || 'https://tuvecinoconfiable.cl',
  compressHTML: true,
});
