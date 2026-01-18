import { friends } from '@/lib/data'
import { pagesData } from '@/lib/data'
import { siteConfig } from '@/lib/config'
import { FriendCard } from '@/components/friend-card'
import { FriendsListRandom } from '@/components/friends-list-random'
import { generateCanonicalUrl } from '@/lib/seo'

import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pagesData.friends.title,
    description: pagesData.friends.description,
    alternates: {
      canonical: generateCanonicalUrl(pagesData.friends.slug),
    },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale.replace('-', '_'),
      url: generateCanonicalUrl(pagesData.friends.slug),
      title: `${pagesData.friends.title} | ${siteConfig.name}`,
      description: pagesData.friends.description,
      siteName: siteConfig.name,
      images: [
        {
          url: `${pagesData.friends.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: pagesData.friends.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pagesData.friends.title} | ${siteConfig.name}`,
      description: pagesData.friends.description,
      images: [`${pagesData.friends.slug}/opengraph-image`],
    },
  }
}

export default async function FriendsPage() {
  return (
    <div className="space-y-6 py-8 sm:space-y-8 sm:py-12">
      {/* Header */}
      <section className="space-y-3">
        <h1 className="text-3xl font-bold">好朋友们</h1>
        <p className="text-text-secondary">
          {`${pagesData.friends.description}。共收录 ${friends.length} 位好朋友。`}
        </p>
      </section>

      {/* Friends Grid */}
      <section>
        <FriendsListRandom friends={friends} />
      </section>

      {/* Friend Link Info */}
      <section className="mt-8 space-y-3 border-l-2 border-zinc-300 pl-4 sm:mt-12 dark:border-zinc-700">
        <h2 className="text-text-primary text-base font-semibold">交换友链</h2>
        <div className="text-text-secondary space-y-4 text-sm">
          <p>
            欢迎和我交换友链！本博客支持展示以下字段，作为交换，你可使用我的以下信息，并通过邮件
            <code className="mx-1 font-mono">{siteConfig.author.email}</code>
            联系我添加你的站点。邮件主题：「交换友链：你的网站名称」，邮件内容：至少包含以下站点基础信息，其中仅「名称」和「地址」必须。
          </p>
          <p className="text-text-tertiary text-xs italic">
            注：虽不强制，但建议你的站点建站半年以上，有一定原创内容基础和深度，非商业化、AI 内容农场。
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
  )
}
