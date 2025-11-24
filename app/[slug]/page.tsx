import { dayjs } from '@/lib/dayjs'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxOptions } from '@/lib/mdx'
import { getPostBySlug, getAllPostSlugs, getAllPosts } from '@/lib/posts'
import {
  generateBlogPostingSchema,
  generateBreadcrumbSchema,
  generateCanonicalUrl,
  generatePostOpenGraph,
  generatePostTwitterCard,
} from '@/lib/seo'
import { OldPostBanner } from '@/components/old-post-banner'

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

  // 获取推荐文章（最近的3篇，排除当前文章）
  const allPosts = await getAllPosts()
  const recommendedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3)

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

      <article className="py-8 sm:py-12">
        {/* Article Header */}
        <header className="mb-8 space-y-4 sm:mb-12 sm:space-y-6">
          <div className="space-y-3">
            <h1 className="text-text-primary text-2xl leading-tight font-bold sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            {post.draft && (
              <div className="inline-flex items-center gap-2">
                <span className="text-text-tertiary bg-bg-tertiary rounded-xs px-2 py-1 text-xs font-medium sm:text-sm">
                  草稿
                </span>
                <span className="text-text-tertiary text-xs sm:text-sm">
                  此文章尚未正式发布，仅在开发环境可见
                </span>
              </div>
            )}
          </div>

          <div className="text-text-tertiary flex items-baseline gap-2 overflow-x-auto text-xs sm:text-sm">
            <time dateTime={post.date} className="shrink-0">
              {dayjs(post.date).year() === dayjs().year()
                ? dayjs(post.date).format('M 月 D 日')
                : dayjs(post.date).format('YYYY 年 M 月 D 日')}
            </time>
            {post.readingTime && (
              <>
                <span className="shrink-0">·</span>
                <span className="shrink-0">{post.readingTime.toLocaleString('zh-CN')} 分钟</span>
              </>
            )}
            <OldPostBanner date={post.date} />
          </div>
        </header>

        {/* Article Content */}
        <div className="prose-blog">
          <MDXRemote source={post.content} options={mdxOptions} />
        </div>

        {/* Article End */}
        <div className="border-border mt-16 border-t pt-8">
          <p className="text-text-tertiary text-center text-sm">—— 本文完 ——</p>
        </div>

        {/* Recommended Posts */}
        {recommendedPosts.length > 0 && (
          <div className="mt-8 space-y-3 sm:mt-12 sm:space-y-4">
            <h2 className="text-text-secondary text-base font-medium sm:text-lg">也可以看看</h2>
            <div className="space-y-2 sm:space-y-3">
              {recommendedPosts.map((recommendedPost) => (
                <Link
                  key={recommendedPost.slug}
                  href={`/${recommendedPost.slug}`}
                  className="text-text-secondary hover:text-text-primary block text-sm sm:text-base"
                >
                  {recommendedPost.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  )
}
