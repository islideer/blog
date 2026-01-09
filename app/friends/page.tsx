import { siteConfig } from '@/lib/config'
import { friends } from '@/lib/data'
import { generateCanonicalUrl } from '@/lib/seo'
import { pagesData } from '@/lib/config'
import { FriendsListRandom } from '@/components/friends-list-random'

import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pagesData.friends.title,
    description: pagesData.friends.description,
    alternates: {
      canonical: generateCanonicalUrl('/friends'),
    },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale.replace('-', '_'),
      url: generateCanonicalUrl('/friends'),
      title: `${pagesData.friends.title} | ${siteConfig.name}`,
      description: pagesData.friends.description,
      siteName: siteConfig.name,
      images: [
        {
          url: '/friends/opengraph-image',
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
      images: ['/friends/opengraph-image'],
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
          {`Viki 在互联网上的好朋友们，交流学习，共同进步。共收录 ${friends.length} 位好朋友，随机排序，试试手气？`}
        </p>
      </section>

      {/* Friends Grid */}
      <section>
        <FriendsListRandom friends={friends} />
      </section>

      {/* Friend Link Info */}
      <section className="mt-8 space-y-3 border-l-2 border-zinc-300 pl-4 sm:mt-12 dark:border-zinc-700">
        <h2 className="text-text-primary text-base font-semibold">交换友链</h2>
        <div className="text-text-secondary space-y-2 text-sm">
          <p>
            欢迎交换友链！本站支持以下字段，仅名称和地址必填，你可使用下列信息并联系我（
            <code className="font-mono">hi@viki.moe</code>）添加。
          </p>
          <p className="text-text-tertiary text-xs italic">
            注：虽不强制，但建议你的站点建站半年以上，并有一定的原创内容基础和深度，非商业为主。
          </p>
          <div className="space-y-1.5">
            <div>
              <span className="text-text-tertiary">名称*：</span>
              <span className="text-text-primary">Viki 写东西的地方</span>
            </div>
            <div>
              <span className="text-text-tertiary">地址*：</span>
              <span className="text-text-primary">https://blog.viki.moe</span>
            </div>
            <div>
              <span className="text-text-tertiary">描述：</span>
              <span className="text-text-primary">生活需要记录。</span>
            </div>
            <div>
              <span className="text-text-tertiary">头像：</span>
              <span className="text-text-primary">https://blog.viki.moe/avatar.png</span>
            </div>
            <div>
              <span className="text-text-tertiary">RSS：</span>
              <span className="text-text-primary">https://blog.viki.moe/rss</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
