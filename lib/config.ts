/**
 * 站点配置
 * 统一管理网站的基本信息、元数据和常量
 */

import siteData from '@/data/site.json'
import pagesData from '@/data/pages.json'
import { about } from './data'

// 重新组装配置，处理动态内容和引用
export const siteConfig = {
  ...siteData,
  url: process.env.NODE_ENV === 'production' ? 'https://blog.viki.moe' : 'http://localhost:3000',
  copyright: {
    ...siteData.copyright,
    year: {
      start: siteData.copyright.startYear,
      end: new Date().getFullYear(),
    },
  },
  home: {
    ...siteData.home,
    hero: {
      title: siteData.home.heroTitle,
      paragraphs: about.intro.paragraphs,
    },
  },
  // 保持类型兼容，如果需要的话
  keywords: siteData.keywords as string[],
} as const

export const pageMetadata = pagesData

export type SiteConfig = typeof siteConfig
export type PageMetadata = typeof pageMetadata
