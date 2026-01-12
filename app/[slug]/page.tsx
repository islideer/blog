import { ViewTransition } from 'react'

import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPostSlugs, getRecommendedPosts } from '@/lib/posts'
import {
  generateBlogPostingSchema,
  generateBreadcrumbSchema,
  generateCanonicalUrl,
  generatePostOpenGraph,
  generatePostTwitterCard,
} from '@/lib/seo'
import { OldPostTip } from '@/components/old-post-tip'
import { DraftBadge } from '@/components/draft-badge'
import { ReadingTime } from '@/components/reading-time'
import { PostDate } from '@/components/post-date'
import { RecommendedPosts } from '@/components/recommended-posts'
import { ZoomImageForArticle } from '@/components/zoom-image'
import { ArticleContent } from '@/components/article-content'
import { TableOfContents } from '@/components/table-of-contents'
import { countWords } from '@/lib/word-count'

import type { Metadata } from 'next'

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: '文章未找到',
    }
  }

  const canonicalUrl = generateCanonicalUrl(post.slug)

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags?.join(', '),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: generatePostOpenGraph(post),
    twitter: generatePostTwitterCard(post),
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // 计算文章字数
  const wordCount = countWords(post.content)

  // 获取推荐文章：最新 3 篇 + 伪随机 2 篇
  const recommendedPosts = await getRecommendedPosts(slug, 5)

  // 生成结构化数据
  const blogPostingSchema = generateBlogPostingSchema(post)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: '首页', url: '/' },
    { name: post.title, url: `/${post.slug}` },
  ])

  return (
    <>
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="pb-8 sm:pb-12">
        {/* Article Header */}
        <header className="mb-8 space-y-4 sm:mb-12 sm:space-y-6">
          {/* Top Image */}
          {post.topImage && (
            <div className="-mx-4 mt-2 overflow-hidden rounded-none! sm:mx-0 sm:mt-4 sm:rounded-md!">
              <ZoomImageForArticle
                src={post.topImage}
                alt={post.title}
                className="h-auto w-full rounded-none! sm:rounded-md!"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
          )}

          <div className="mt-8 space-y-3 sm:mt-12 sm:space-y-4">
            <ViewTransition name={`post-title-${post.slug}`} default="transform">
              <h1 className="text-text-primary text-2xl leading-tight font-bold sm:text-4xl md:text-5xl">
                {post.title}
              </h1>
            </ViewTransition>
            {post.draft && (
              <div className="inline-flex items-center gap-2">
                <DraftBadge />
                <span className="text-text-tertiary text-xs sm:text-sm">
                  此文章尚未正式发布，仅在开发环境可见
                </span>
              </div>
            )}
          </div>

          <div className="text-text-tertiary flex items-baseline gap-1 overflow-x-auto text-xs sm:gap-2 sm:text-sm">
            <PostDate date={post.date} format="detail" className="shrink-0" />
            <span className="shrink-0">·</span>
            <span className="shrink-0">
              <ReadingTime minutes={post.readingTime} />
            </span>
            <span className="shrink-0">·</span>
            <span className="shrink-0">{wordCount.toLocaleString('zh-Hans-CN')} 字</span>
            <OldPostTip short className="text-xs" date={post.date} />
          </div>
        </header>

        {/* Article Content */}
        <ArticleContent content={post.content} />

        {/* Article End */}
        <div className="border-border mt-16 border-t pt-8">
          <p className="text-text-tertiary text-center text-sm">—— 本文完 ——</p>
        </div>

        {/* Recommended Posts */}
        <RecommendedPosts posts={recommendedPosts} />
      </article>

      {/* Table of Contents */}
      <TableOfContents />
    </>
  )
}
