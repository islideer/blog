import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/config'

export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    // 从查询参数获取标题和描述
    const title = searchParams.get('title') || siteConfig.name
    const description = searchParams.get('description') || siteConfig.description

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            backgroundImage:
              'radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)',
            backgroundSize: '100px 100px',
          }}
        >
          {/* 主容器 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '80px',
              width: '100%',
              height: '100%',
            }}
          >
            {/* 标题 */}
            <div
              style={{
                fontSize: 72,
                fontWeight: 'bold',
                background: 'linear-gradient(to bottom right, #000 0%, #333 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                lineHeight: 1.2,
                marginBottom: 30,
                textAlign: 'center',
                maxWidth: '90%',
              }}
            >
              {title}
            </div>

            {/* 描述 */}
            {description && (
              <div
                style={{
                  fontSize: 32,
                  color: '#666',
                  lineHeight: 1.4,
                  textAlign: 'center',
                  maxWidth: '80%',
                  marginBottom: 50,
                }}
              >
                {description}
              </div>
            )}

            {/* 底部网站名称 */}
            <div
              style={{
                position: 'absolute',
                bottom: 60,
                display: 'flex',
                alignItems: 'center',
                gap: 20,
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  color: '#999',
                  fontWeight: 600,
                }}
              >
                {siteConfig.name}
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e) {
    console.error('Error generating OG image:', e)
    return new Response('Failed to generate image', { status: 500 })
  }
}
