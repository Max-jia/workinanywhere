import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

// 从博客文章中读取 pubDate，生成 URL → 日期映射表
export function getBlogDates() {
  const map = {};
  try {
    const files = readdirSync('src/content/blog');
    files.forEach(f => {
      if (!f.endsWith('.md')) return;
      const content = readFileSync(join('src/content/blog', f), 'utf-8');
      const slug = f.replace('.md', '');
      const match = content.match(/pubDate:\s*(\d{4}-\d{2}-\d{2})/);
      if (match) map[slug] = match[1];
    });
  } catch(e) { /* ignore */ }
  return map;
}
