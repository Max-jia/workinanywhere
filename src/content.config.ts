import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  // 讀取 src/content/blog/ 下所有 Markdown 檔案
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  // 每篇文章的 metadata 格式（標題、摘要、日期、分類、封面圖）
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // 發布日期
      pubDate: z.coerce.date(),
      // 更新日期（選填）
      updatedDate: z.coerce.date().optional(),
      // 文章分類：從 CATEGORIES 定義的 slug 中選一個
      category: z
        .enum(['city-guides', 'tools', 'jobs', 'lifestyle', 'finance'])
        .optional(),
      // 封面圖片（選填）
      heroImage: z.optional(image()),
    }),
});

export const collections = { blog };
