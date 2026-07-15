import { siteConfig } from '@/lib/config'
import { getPostBySlug } from '@/lib/posts'

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const post = await getPostBySlug(slug.replace('.md', ''))

  if (!post) {
    return new Response('Not Found', { status: 404 })
  }

  const markdown = `# ${post.title}

> 作者：${post.author || siteConfig.author.name}
> 时间：${post.date}
> 标签：${post.tags?.join(' / ') ?? ''}

${post.content}
`

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
