import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

// Edge Runtime（部署后使用，本地可能需要重启开发服务器）
export const runtime = 'edge'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const title = searchParams.get('title') || 'Viki 写东西的地方'
    const subtitle = searchParams.get('subtitle') || '分享技术和日常'
    const type = searchParams.get('type') || 'default'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '80px',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {/* 主要内容 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                fontSize: 72,
                fontWeight: 900,
                color: 'white',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                maxWidth: '90%',
              }}
            >
              {title}
            </div>

            {subtitle && (
              <div
                style={{
                  fontSize: 36,
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontWeight: 500,
                  maxWidth: '80%',
                }}
              >
                {subtitle}
              </div>
            )}

            {type === 'post' && (
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  marginTop: '20px',
                }}
              >
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    padding: '8px 20px',
                    borderRadius: '8px',
                    fontSize: 24,
                    color: 'white',
                  }}
                >
                  📝 博客文章
                </div>
              </div>
            )}

            {type === 'thoughts' && (
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  marginTop: '20px',
                }}
              >
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    padding: '8px 20px',
                    borderRadius: '8px',
                    fontSize: 24,
                    color: 'white',
                  }}
                >
                  💭 碎碎念
                </div>
              </div>
            )}
          </div>

          {/* 底部信息 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: 'auto',
            }}
          >
            <div
              style={{
                fontSize: 28,
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 600,
              }}
            >
              blog.viki.moe
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                }}
              >
                ✨
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
  } catch (error) {
    console.error('Error generating OG image:', error)
    return new Response('Failed to generate image', { status: 500 })
  }
}
