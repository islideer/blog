import { siteConfig } from './config'
import type { Post } from './posts'

/**
 * Generate JSON-LD structured data for Organization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author.name,
    url: siteConfig.url,
    sameAs: [siteConfig.author.github, siteConfig.author.twitter],
  }
}

/**
 * Generate JSON-LD structured data for Blog
 */
export function generateBlogSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.author.github,
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.author.github,
    },
  }
}

/**
 * Generate JSON-LD structured data for BlogPosting
 */
export function generateBlogPostingSchema(post: Post) {
  const wordCount = post.content
    ? post.content.split(/\s+/).filter((word) => word.length > 0).length
    : 0

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: `${post.title} - ${siteConfig.name}`,
    alternativeHeadline: `${post.title} - ${siteConfig.name}`,
    description: post.excerpt || post.title,
    articleBody: post.content ? post.content.substring(0, 500).replace(/[#*`]/g, '') : post.excerpt,
    url: `${siteConfig.url}/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author || siteConfig.author.name,
      url: siteConfig.author.github,
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.author.github,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/${post.slug}`,
    },
    keywords: post.tags?.join(', '),
    articleSection: post.tags?.[0] || 'Blog',
    wordCount: wordCount,
    inLanguage: siteConfig.locale,
    isFamilyFriendly: 'true',
    isAccessibleForFree: 'true',
  }
}

/**
 * Generate JSON-LD structured data for BreadcrumbList
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(path: string) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${siteConfig.url}${cleanPath}`
}

/**
 * Generate Open Graph metadata for a blog post
 */
export function generatePostOpenGraph(post: Post) {
  // 格式化日期
  const formattedDate = new Date(post.date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // 构建 OG 图片 URL，包含更多信息
  const ogImageParams = new URLSearchParams({
    title: post.title,
    subtitle: post.excerpt || '',
    type: 'post',
    date: formattedDate,
    readingTime: post.readingTime?.toString() || '',
  })

  const ogImageUrl = `${siteConfig.url}/api/og?${ogImageParams.toString()}`

  return {
    type: 'article' as const,
    title: `${post.title} - ${siteConfig.name}`,
    description: post.excerpt || post.title,
    url: `${siteConfig.url}/${post.slug}`,
    siteName: siteConfig.name,
    locale: siteConfig.locale.replace('-', '_'),
    publishedTime: post.date,
    modifiedTime: post.date,
    authors: [siteConfig.author.name],
    tags: post.tags,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: `${post.title} - ${siteConfig.name}`,
      },
    ],
  }
}

/**
 * Generate Twitter Card metadata for a blog post
 */
export function generatePostTwitterCard(post: Post) {
  // 格式化日期
  const formattedDate = new Date(post.date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // 构建 OG 图片 URL，包含更多信息
  const ogImageParams = new URLSearchParams({
    title: post.title,
    subtitle: post.excerpt || '',
    type: 'post',
    date: formattedDate,
    readingTime: post.readingTime?.toString() || '',
  })

  const ogImageUrl = `${siteConfig.url}/api/og?${ogImageParams.toString()}`

  return {
    card: 'summary_large_image' as const,
    title: `${post.title} - ${siteConfig.name}`,
    description: post.excerpt || post.title,
    creator: siteConfig.author.twitter,
    images: [ogImageUrl],
  }
}
