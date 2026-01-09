import { getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/config'
import { MarkdownLite } from '@/components/markdown-lite'
import { generateBlogSchema, generateOrganizationSchema } from '@/lib/seo'
import { RecentActivities } from '@/components/recent-activities'
import { RecentPosts } from '@/components/recent-posts'
import { thoughts } from '@/lib/data'

export default async function BlogPage() {
  const blogSchema = generateBlogSchema()
  const organizationSchema = generateOrganizationSchema()
  const allPosts = await getAllPosts()
  const pinnedPosts = allPosts.filter((post) => post.top)
  const regularPosts = allPosts.filter((post) => !post.top)

  // 显示数量 = 所有置顶文章 + 配置的普通文章数量
  const displayPosts = [...pinnedPosts, ...regularPosts.slice(0, siteConfig.home.postsToShow)]

  // 获取最新碎碎念，根据配置数量截取
  const recentThoughts = thoughts
    .toSorted((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, siteConfig.home.thoughtsToShow)

  return (
    <>
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="space-y-6 py-8 sm:space-y-8 sm:py-12">
        {/* Hero Section */}
        <section className="space-y-2 sm:space-y-4">
          <h2 className="text-3xl font-bold sm:text-4xl">{siteConfig.home.hero.title}</h2>
          <MarkdownLite
            size="md"
            className="text-text-secondary!"
            content={siteConfig.home.hero.paragraphs.join('\n')}
          />
        </section>

        {/* 最近动态 */}
        {recentThoughts.length > 0 && (
          <>
            <div className="border-border border-t" />
            <RecentActivities
              thoughts={recentThoughts}
              totalCount={thoughts.length}
              showMoreThreshold={siteConfig.home.thoughtsToShow}
            />
          </>
        )}

        {/* 最近文章 */}
        {displayPosts.length > 0 ? (
          <>
            <div className="border-border border-t" />
            <RecentPosts
              posts={displayPosts}
              totalCount={allPosts.length}
              showMoreThreshold={siteConfig.home.postsToShow}
            />
          </>
        ) : (
          <>
            <div className="border-border border-t" />
            <div className="py-12 text-center">
              <p className="text-text-secondary mb-4 text-xl">暂无文章</p>
              <p className="text-text-tertiary">
                请在 <code>posts</code> 目录添加 Markdown 文件
              </p>
            </div>
          </>
        )}
      </div>
    </>
  )
}
