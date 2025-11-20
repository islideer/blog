import dayjs from 'dayjs'
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

      <article>
      {/* Article Header */}
      <header className="mb-8 sm:mb-12 space-y-4 sm:space-y-6">
        <h1 className="text-text-primary text-2xl leading-tight font-bold sm:text-4xl md:text-5xl">
          {post.title}
        </h1>

        <time dateTime={post.date} className="text-text-tertiary block text-xs sm:text-sm">
          {dayjs(post.date).year() === dayjs().year()
            ? dayjs(post.date).format('MM 月 DD 日')
            : dayjs(post.date).format('YYYY 年 MM 月 DD 日')}
        </time>
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
        <div className="mt-8 sm:mt-12 space-y-3 sm:space-y-4">
          <h2 className="text-text-secondary text-base sm:text-lg font-medium">也可以看看</h2>
          <div className="space-y-2 sm:space-y-3">
            {recommendedPosts.map((recommendedPost) => (
              <Link
                key={recommendedPost.slug}
                href={`/${recommendedPost.slug}`}
                className="text-text-secondary hover:text-text-primary text-sm sm:text-base block"
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
