// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import { getBlogDates } from './src/utils/sitemap-dates.mjs';

import react from '@astrojs/react';

const blogDates = getBlogDates();

// https://astro.build/config
export default defineConfig({
  site: 'https://workinanywhere.com',
  integrations: [mdx(), sitemap({
    serialize(item) {
      const slugMatch = item.url.match(/\/blog\/([^/]+)\/?$/);
      if (slugMatch && blogDates[slugMatch[1]]) {
        item.lastmod = blogDates[slugMatch[1]];
      }
      return item;
    }
  }), react()],
  // 字型設定：標題用 Fraunces（有質感的雜誌風格），內文用 Inter（螢幕閱讀最舒服）
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Fraunces',
      cssVariable: '--font-heading',
      fallbacks: ['Georgia', 'serif'],
      options: {
        weights: [400, 600, 700],
        display: 'swap',
      },
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-body',
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        weights: [400, 500, 600],
        display: 'swap',
      },
    },
  ],
});