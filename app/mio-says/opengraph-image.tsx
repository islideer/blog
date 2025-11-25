import { ImageResponse } from 'next/og'
import { OgImageTemplate } from '@/components/og-image-template'
import { pageMetadata } from '@/lib/pages'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const size = {
  width: 1200,
  height: 630,
}

export const dynamic = 'force-static'
export const contentType = 'image/png'

export async function generateAlt(): Promise<string> {
  return pageMetadata.mioSays.title
}

export default async function Image() {
  const fontData = await readFile(join(process.cwd(), 'assets/fonts/SourceHanSansSC-Regular.otf'))
  const iconData = await readFile(join(process.cwd(), 'public/icon-192.png'))

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
        title={pageMetadata.mioSays.title}
        subtitle={pageMetadata.mioSays.description}
        type="page"
        iconData={Buffer.from(iconData)}
      />
    ),
    options,
  )
}
