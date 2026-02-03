import { ImageResponse } from 'next/og'
import { OgImageStatsItem, OgImageTemplate } from '@/components/og-image-template'
import { siteConfig } from '@/lib/config'
import { getAllPosts } from '@/lib/posts'
import { thoughts, mioSays, timeline } from '@/lib/data'
import { dayjs } from '@/lib/dayjs'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const size = {
  width: 1200,
  height: 630,
}

export const dynamic = 'force-static'
export const contentType = 'image/png'
export const revalidate = 31536000 // 缓存 1 年

export async function generateAlt(): Promise<string> {
  return siteConfig.name
}

export default async function Image() {
  const [posts, fontData, iconData] = await Promise.all([
    getAllPosts(),
    readFile(join(process.cwd(), 'assets/fonts/SourceHanSansSC-Regular.otf')),
    readFile(join(process.cwd(), 'public/icon-192.png')),
  ])

  // 获取最新更新时间（从文章、碎碎念、Mio 说、大事记中取最新）
  const allDates = [
    ...posts.map((p) => p.date),
    ...thoughts.map((t) => t.date),
    ...mioSays.map((m) => m.date),
    ...timeline.map((t) => t.date),
  ]
    .filter(Boolean)
    .map((date) => dayjs(date)) // 统一转换为 dayjs 对象
    .toSorted((a, b) => b.valueOf() - a.valueOf()) // 按时间戳降序排序

  const latestDate = allDates.at(0)
  const lastUpdated = latestDate ? latestDate.format('YYYY 年 MM 月 DD 日') : ''

  const options = {
    ...size,
    fonts: [
      {
        name: 'Noto Sans SC',
        data: fontData,
        style: 'normal' as const,
        weight: 400 as const,
      },
    ],
  }

  return new ImageResponse(
    <OgImageTemplate
      title={siteConfig.name}
      iconData={Buffer.from(iconData)}
      metaContent={
        lastUpdated && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontSize: 18,
                color: '#888888',
                fontWeight: 500,
              }}
            >
              {`更新于 ${lastUpdated}`}
            </div>
          </div>
        )
      }
      bodyContent={
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '36px',
          }}
        >
          {/* 描述 */}
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              color: '#666666',
              fontWeight: 400,
              lineHeight: 1.4,
            }}
          >
            {siteConfig.description}
          </div>

          {/* 统计数据：横向排列，数字在前描述在后，底部对齐 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '60px',
            }}
          >
            {/* 文章数 */}
            <OgImageStatsItem number={posts.length} label="篇文章" />

            {/* 碎碎念数 */}
            <OgImageStatsItem number={thoughts.length} label="条碎碎念" />

            {/* Mio 说数 */}
            <OgImageStatsItem number={mioSays.length} label="条 Mio 说" />

            {/* 大事记数 */}
            <OgImageStatsItem number={timeline.length} label="件大事记" />
          </div>
        </div>
      }
    />,
    options,
  )
}
