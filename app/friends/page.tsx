import { friends } from '@/lib/data'
import { pages } from '@/lib/data'
import { siteConfig } from '@/lib/config'
import { FriendCard } from '@/components/friend/friend-card'
import { RandomFriends } from '@/components/friend/random-friends'
import { generateCanonicalUrl } from '@/lib/seo'

import type { Metadata } from 'next'
import Link from 'next/link'

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
          url: `${pages.friends.slug}/opengraph-image`,
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
      images: [`${pages.friends.slug}/opengraph-image`],
    },
  }
}

export default function FriendsPage() {
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
              欢迎和我交换友链！本博客支持展示以下字段，作为交换，你可使用我的以下信息，并在
              <Link href="/messages" className="mx-1">
                话匣子
              </Link>
              页面留言告知我你的站点信息即可。
            </p>
            <p className="text-text-tertiary text-xs italic">
              注：虽不强制，但建议你的站点建站半年以上，有一定原创内容基础和深度，非商业化、AI
              内容农场。
            </p>
            <div className="space-y-1.5">
              <div>
                <span className="text-text-tertiary">名称：</span>
                <span className="text-text-primary">{siteConfig.name}</span>
              </div>
              <div>
                <span className="text-text-tertiary">地址：</span>
                <span className="text-text-primary">{siteConfig.url}</span>
              </div>
              <div>
                <span className="text-text-tertiary">描述：</span>
                <span className="text-text-primary">{siteConfig.tagline}</span>
              </div>
              <div>
                <span className="text-text-tertiary">头像：</span>
                <span className="text-text-primary">{`${siteConfig.url}/avatar.png`}</span>
              </div>
              <div>
                <span className="text-text-tertiary">RSS：</span>
                <span className="text-text-primary">{`${siteConfig.url}/rss`}</span>
              </div>
            </div>

            {/* 预览 */}
            <div className="text-text-tertiary mt-4">站点信息预览：</div>
            <FriendCard
              friend={{
                id: 'preview',
                name: 'Viki 写东西的地方',
                url: '/',
                description: '生活需要记录。',
                avatar: '/avatar.png',
                rss: siteConfig.links.rss,
              }}
            />
          </div>
        </section>
      </div>
    </>
  )
}
