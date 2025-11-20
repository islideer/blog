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

    // 获取 icon 图片
    const iconUrl = new URL('/icon-192.png', req.url).href
    const iconData = await fetch(iconUrl).then((res) => res.arrayBuffer())

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
            background: '#0d0d0d',
            padding: '80px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            position: 'relative',
          }}
        >
          {/* 背景装饰 - 简约几何图形 */}
          <div
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
              width: '400px',
              height: '400px',
              background:
                'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 100%)',
              borderRadius: '50%',
              transform: 'translate(30%, -30%)',
            }}
          />

          {/* 主要内容 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              flex: 1,
              justifyContent: 'center',
              zIndex: 1,
            }}
          >
            {/* 类型标签 */}
            {type === 'post' && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: 24,
                  color: '#a0a0a0',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                <div
                  style={{
                    width: '4px',
                    height: '24px',
                    background: '#ffffff',
                  }}
                />
                博客文章
              </div>
            )}

            {type === 'thoughts' && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: 24,
                  color: '#a0a0a0',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                <div
                  style={{
                    width: '4px',
                    height: '24px',
                    background: '#ffffff',
                  }}
                />
                碎碎念
              </div>
            )}

            {/* 标题 */}
            <div
              style={{
                fontSize: 72,
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                maxWidth: '90%',
              }}
            >
              {title}
            </div>

            {/* 副标题 */}
            {subtitle && (
              <div
                style={{
                  fontSize: 32,
                  color: '#a0a0a0',
                  fontWeight: 400,
                  maxWidth: '80%',
                  lineHeight: 1.4,
                }}
              >
                {subtitle}
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
              zIndex: 1,
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              paddingTop: '32px',
            }}
          >
            {/* 左侧：网站名称 */}
            <div
              style={{
                fontSize: 28,
                color: '#ffffff',
                fontWeight: 600,
                letterSpacing: '-0.01em',
              }}
            >
              blog.viki.moe
            </div>

            {/* 右侧：Icon */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`data:image/png;base64,${Buffer.from(iconData).toString('base64')}`}
                alt="Blog Icon"
                width="80"
                height="80"
                style={{
                  borderRadius: '16px',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                }}
              />
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
