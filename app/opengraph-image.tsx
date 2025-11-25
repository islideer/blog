import { ImageResponse } from 'next/og'
import { OgImageTemplate } from '@/components/og-image-template'
import { siteConfig } from '@/lib/config'
import { getAllPosts } from '@/lib/posts'
import { getAllThoughts } from '@/lib/thoughts'
import { getAllMioSays } from '@/lib/mio-says'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const size = {
  width: 1200,
  height: 630,
}

export const dynamic = 'force-static'
export const contentType = 'image/png'

export async function generateAlt(): Promise<string> {
  return siteConfig.name
}

export default async function Image() {
  const [posts, thoughts, mioSays, fontData, iconData] = await Promise.all([
    getAllPosts(),
    getAllThoughts(),
    getAllMioSays(),
    readFile(join(process.cwd(), 'assets/fonts/SourceHanSansSC-Regular.otf')),
    readFile(join(process.cwd(), 'public/icon-192.png')),
  ])

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
    (
      <OgImageTemplate
        title={siteConfig.name}
        subtitle={siteConfig.description}
        type="home"
        postsCount={posts.length}
        thoughtsCount={thoughts.length}
        mioSaysCount={mioSays.length}
        iconData={Buffer.from(iconData)}
      />
    ),
    options,
  )
}
