// 網站全域設定 — 改這裡就會自動更新整個網站的名稱和描述

export const SITE_TITLE = 'Work Anywhere';
export const SITE_DESCRIPTION =
  'Curated guides on the best remote work cities, tools, jobs, and lifestyle tips — for digital nomads and anyone who wants to work from anywhere.';

// 導覽列
export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Articles' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

// 文章分類（Taste Skill 規則：單一強調色，不用多色系統）
export const CATEGORIES = [
  { slug: 'city-guides', label: 'City Guides', color: '#5B7FA5' },
  { slug: 'tools', label: 'Tools & Gear', color: '#5B7FA5' },
  { slug: 'jobs', label: 'Job Hunting', color: '#5B7FA5' },
  { slug: 'lifestyle', label: 'Lifestyle', color: '#5B7FA5' },
  { slug: 'finance', label: 'Finance & Taxes', color: '#5B7FA5' },
] as const;
