// 網站全域設定 — 改這裡就會自動更新整個網站的名稱和描述

export const SITE_TITLE = 'Work Anywhere';
export const SITE_DESCRIPTION =
  'Curated guides on the best remote work cities, tools, jobs, and lifestyle tips — for digital nomads and anyone who wants to work from anywhere.';

// 作者資訊（用於 Schema.org Person 和文章作者標記）
export const SITE_AUTHOR = {
  name: 'Work Anywhere Team',
  url: 'https://workinanywhere.com/about',
  description: 'A team of remote workers and digital nomads who test destinations, tools, and strategies firsthand.',
  sameAs: ['https://workinanywhere.com/about'],
};

// 導覽列
export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/cities', label: 'Cities' },
  { href: '/blog', label: 'Articles' },
  { href: '/about', label: 'About' },
];

// 文章分類（Taste Skill 規則：單一強調色，不用多色系統）
export const CATEGORIES = [
  { slug: 'city-guides', label: 'City Guides', color: '#5B7FA5' },
  { slug: 'tools', label: 'Tools & Gear', color: '#5B7FA5' },
  { slug: 'jobs', label: 'Job Hunting', color: '#5B7FA5' },
  { slug: 'lifestyle', label: 'Lifestyle', color: '#5B7FA5' },
  { slug: 'finance', label: 'Finance & Taxes', color: '#5B7FA5' },
] as const;
