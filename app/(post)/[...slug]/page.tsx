import dayjs from 'dayjs'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxOptions } from '@/lib/mdx'
import { getPostBySlug, getAllPostSlugs, getAllPosts } from '@/lib/posts'

import type { Metadata } from 'next'

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  // slug 现在是简单的文件名，需要包装成数组
  return slugs.map((slug) => ({ slug: [slug] }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const { slug } = await params
  // slug 数组现在只有一个元素（文件名）
  const slugPath = slug[0]
  const post = await getPostBySlug(slugPath)

  if (!post) {
    return {
      title: '文章未找到',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  // slug 数组现在只有一个元素（文件名）
  const slugPath = slug[0]
  const post = await getPostBySlug(slugPath)

  if (!post) {
    notFound()
  }

  // 获取推荐文章（最近的3篇，排除当前文章）
  const allPosts = await getAllPosts()
  const recommendedPosts = allPosts.filter((p) => p.slug !== slugPath).slice(0, 3)

  return (
    <article>
      {/* Article Header */}
      <header className="mb-12 space-y-6">
        <h1 className="text-text-primary text-4xl leading-tight font-bold sm:text-5xl">
          {post.title}
        </h1>

        <time dateTime={post.date} className="text-text-tertiary block text-sm">
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
        <div className="mt-12 space-y-4">
          <h2 className="text-text-secondary text-lg font-medium">也可以看看</h2>
          <div className="space-y-3">
            {recommendedPosts.map((recommendedPost) => (
              <Link
                key={recommendedPost.slug}
                href={`/${recommendedPost.slug}`}
                className="text-text-secondary hover:text-text-primary text-link block"
              >
                {recommendedPost.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
