import { notFound } from 'next/navigation'
import { ViewTransition } from 'react'
import { getPostBySlug, getAllPostSlugs, getRecommendedPosts } from '@/lib/posts'
import {
  generateBlogPostingSchema,
  generateBreadcrumbSchema,
  generateCanonicalUrl,
  generatePostOpenGraph,
  generatePostTwitterCard,
} from '@/lib/seo'
import { PostDate } from '@/components/post/post-date'
import { PostInfo } from '@/components/post/post-info'
import { PostLike } from '@/components/post/post-like'
import { countWords } from '@/lib/word-count'
import { DraftBadge } from '@/components/draft-badge'
import { OldPostTip } from '@/components/post/old-post-tip'
import { ReadingTime } from '@/components/reading-time'
import { ChatIconIcon } from '@/icons/chat'
import { ArticleContent } from '@/components/post/article-content'
import { TableOfContents } from '@/components/table-of-contents'
import { RecommendedPosts } from '@/components/post/recommended-posts'
import { ZoomImageForArticle } from '@/components/zoom-image'
import { getInteractionCounts } from '@/lib/interactions'
import { BackToTop } from '@/components/back-to-top'

import type { Metadata } from 'next'

export const dynamic = 'force-static'
export const revalidate = 31536000 // 缓存 1 年

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

  // 服务端直接获取互动计数
  const counts = await getInteractionCounts('posts', [slug])

  // 生成结构化数据
  const blogPostingSchema = generateBlogPostingSchema(post)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: '首页', url: '/' },
    { name: post.title, url: `/${post.slug}` },
  ])

  return (
    <>
      {/* Table of Contents */}
      <TableOfContents />

      {/* Back to Top Button */}
      <BackToTop />

      {/* Preconnect to external domains for better performance */}
      <link rel="preconnect" href="https://i.loli.net" />
      <link rel="dns-prefetch" href="https://i.loli.net" />
      <link rel="preconnect" href="https://s2.loli.net" />
      <link rel="dns-prefetch" href="https://s2.loli.net" />
      <link rel="preconnect" href="https://image.viki.moe" />
      <link rel="dns-prefetch" href="https://image.viki.moe" />

      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="pb-8 sm:pb-12">
        <article>
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
                <h1 className="text-text-primary text-2xl leading-tight font-bold sm:text-3xl md:text-4xl lg:text-5xl">
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
        </article>

        {/* Article End */}
        <div className="border-border mt-8 border-t pt-8 sm:mt-16">
          <p className="text-text-tertiary mb-4 text-center text-sm">—— 本文完 ——</p>
        </div>

        {/* Post Like */}
        <div className="mt-8">
          <PostLike slug={slug} initialCount={counts[slug]} />
        </div>

        <div className="border-border mt-8 flex justify-center border-t pt-8">
          <div className="flex flex-1 truncate px-2 sm:justify-center">
            <PostInfo title={post.title} slug={post.slug} />
          </div>
        </div>

        <div className="border-border mt-8 border-t pt-8 sm:mt-16">
          <p className="text-text-tertiary mx-auto flex justify-center gap-2 text-center text-sm">
            <ChatIconIcon className="h-5 w-5" />
            <span>
              交流讨论、反馈建议，请到
              <a href="/messages" className="mx-1">
                话匣子
              </a>
              页面留言。
            </span>
          </p>
        </div>

        {/* Recommended Posts */}
        <RecommendedPosts posts={recommendedPosts} />
      </div>
    </>
  )
}
