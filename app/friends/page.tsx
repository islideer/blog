import { friends } from '@/lib/data'
import { pages } from '@/lib/data'
import { createHighlighter } from 'shiki/bundle-web.mjs'
import { siteConfig } from '@/lib/config'
import { FriendCard } from '@/components/friend/friend-card'
import { RandomFriends } from '@/components/friend/random-friends'
import { generateCanonicalUrl } from '@/lib/seo'

import type { Metadata } from 'next'

export const revalidate = 86400 // 缓存 1 天

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pages.friends.title,
    description: pages.friends.description,
    alternates: {
      canonical: generateCanonicalUrl(pages.friends.slug),
    },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale.replace('-', '_'),
      url: generateCanonicalUrl(pages.friends.slug),
      title: `${pages.friends.title} | ${siteConfig.name}`,
      description: pages.friends.description,
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.url}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: pages.friends.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pages.friends.title} | ${siteConfig.name}`,
      description: pages.friends.description,
      images: [`${siteConfig.url}/opengraph-image`],
    },
  }
}

const shiki = await createHighlighter({
  themes: ['one-dark-pro', 'one-light'],
  langs: ['json'],
})

const json = JSON.stringify(
  {
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.tagline,
    avatar: `${siteConfig.url}${siteConfig.links.avatar}`,
    rss: `${siteConfig.url}/rss`,
  },
  null,
  2,
)

export default async function FriendsPage() {
  const html = shiki.codeToHtml(json, {
    lang: 'json',
    theme: 'one-dark-pro',
    defaultColor: false,
    cssVariablePrefix: '--shiki-',
  })

  return (
    <>
      {/* 头像服务 */}
      <link rel="preconnect" href="https://q1.qlogo.cn" />
      <link rel="dns-prefetch" href="https://q1.qlogo.cn" />

      <div className="space-y-6 py-8 sm:space-y-8 sm:py-12">
        {/* Header */}
        <section className="space-y-3">
          <h1 className="text-3xl font-bold">好朋友们</h1>
          <p className="text-text-secondary">
            {`${pages.friends.description}。共收录 ${friends.length} 位好朋友。`}
          </p>
        </section>

        {/* Friends Grid */}
        <section>
          <RandomFriends friends={friends} />
        </section>

        {/* Friend Link Info */}
        <section className="border-border-tertiary mt-8 space-y-3 border-l-2 pl-4 sm:mt-12">
          <h2 className="text-text-primary text-base font-semibold">交换友链</h2>
          <div className="text-text-secondary space-y-4 text-sm">
            <p>
              欢迎交换友链！本博客支持展示以下字段，仅名称和地址必须。如需交换，请按以下格式在
              <a href="/messages" className="mx-1">
                话匣子
              </a>
              页面留言。
            </p>
            <p className="text-text-tertiary text-xs italic">
              注：建议建站半年以上，有一定原创内容，非商业化、AI 内容农场。交换完记得经常来玩哦！
            </p>
            <div className="prose-sm" dangerouslySetInnerHTML={{ __html: html }}></div>
            {/* 预览 */}
            <div className="text-text-tertiary mt-4">本站信息预览：</div>
            <FriendCard
              friend={{
                id: 'preview',
                name: siteConfig.name,
                url: siteConfig.url,
                description: siteConfig.tagline,
                avatar: siteConfig.links.avatar,
                rss: siteConfig.links.rss,
              }}
            />
          </div>
        </section>
      </div>
    </>
  )
}
