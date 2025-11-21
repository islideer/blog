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
    const stats = searchParams.get('stats') || ''

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
            background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
            padding: '80px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            position: 'relative',
          }}
        >
          {/* 背景装饰 - 扁平几何图形 */}
          <div
            style={{
              position: 'absolute',
              top: '-100px',
              right: '-100px',
              width: '500px',
              height: '500px',
              background: 'rgba(255, 255, 255, 0.5)',
              borderRadius: '50%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-80px',
              left: '-80px',
              width: '350px',
              height: '350px',
              background: 'rgba(0, 0, 0, 0.03)',
              borderRadius: '50%',
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
                  gap: '12px',
                  fontSize: 22,
                  color: '#666666',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                }}
              >
                <div
                  style={{
                    width: '6px',
                    height: '28px',
                    background: '#1a1a1a',
                    borderRadius: '3px',
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
                  gap: '12px',
                  fontSize: 22,
                  color: '#666666',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                }}
              >
                <div
                  style={{
                    width: '6px',
                    height: '28px',
                    background: '#1a1a1a',
                    borderRadius: '3px',
                  }}
                />
                碎碎念
              </div>
            )}

            {type === 'posts' && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: 22,
                  color: '#666666',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                }}
              >
                <div
                  style={{
                    width: '6px',
                    height: '28px',
                    background: '#1a1a1a',
                    borderRadius: '3px',
                  }}
                />
                文章列表
              </div>
            )}

            {type === 'timeline' && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: 22,
                  color: '#666666',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                }}
              >
                <div
                  style={{
                    width: '6px',
                    height: '28px',
                    background: '#1a1a1a',
                    borderRadius: '3px',
                  }}
                />
                大事记
              </div>
            )}

            {type === 'about' && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: 22,
                  color: '#666666',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                }}
              >
                <div
                  style={{
                    width: '6px',
                    height: '28px',
                    background: '#1a1a1a',
                    borderRadius: '3px',
                  }}
                />
                关于
              </div>
            )}

            {/* 标题 */}
            <div
              style={{
                fontSize: 72,
                fontWeight: 900,
                color: '#1a1a1a',
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
                  color: '#666666',
                  fontWeight: 400,
                  maxWidth: '85%',
                  lineHeight: 1.4,
                }}
              >
                {subtitle}
              </div>
            )}

            {/* 统计信息 */}
            {stats && (
              <div
                style={{
                  display: 'flex',
                  gap: '32px',
                  marginTop: '16px',
                }}
              >
                {stats.split('|').map((stat, index) => {
                  const [label, value] = stat.split(':')
                  return (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                      }}
                    >
                      <div
                        style={{
                          fontSize: 40,
                          fontWeight: 900,
                          color: '#1a1a1a',
                          lineHeight: 1,
                        }}
                      >
                        {value}
                      </div>
                      <div
                        style={{
                          fontSize: 18,
                          color: '#888888',
                          fontWeight: 500,
                        }}
                      >
                        {label}
                      </div>
                    </div>
                  )
                })}
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
              borderTop: '2px solid rgba(0, 0, 0, 0.08)',
              paddingTop: '32px',
            }}
          >
            {/* 左侧：网站名称 */}
            <div
              style={{
                fontSize: 28,
                color: '#1a1a1a',
                fontWeight: 700,
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
                  border: '3px solid rgba(0, 0, 0, 0.1)',
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
