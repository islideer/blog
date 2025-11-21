import { siteConfig } from '@/lib/config'
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
    const date = searchParams.get('date') || ''
    const readingTime = searchParams.get('readingTime') || ''
    const count = searchParams.get('count') || ''
    const lastUpdate = searchParams.get('lastUpdate') || ''
    const postsCount = searchParams.get('postsCount') || ''
    const thoughtsCount = searchParams.get('thoughtsCount') || ''
    const mioSaysCount = searchParams.get('mioSaysCount') || ''

    // 获取 icon 图片
    const iconUrl = new URL('/icon-192.png', req.url).href
    const iconData = await fetch(iconUrl).then((res) => res.arrayBuffer())

    // 加载 Noto Sans SC 常用字字体（7.9MB，确保显示正确的简体中文字形）
    const fontData = await fetch(new URL('/fonts/SourceHanSansSC-Regular.otf', req.url)).then(
      (res) => res.arrayBuffer(),
    )

    const typeLabel = siteConfig.name

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%)',
            position: 'relative',
            fontFamily: '"Noto Sans SC", "Source Han Sans SC", sans-serif',
          }}
        >
          {/* 背景几何装饰 - 更简洁 */}
          <div
            style={{
              position: 'absolute',
              top: '-100px',
              right: '-100px',
              width: '400px',
              height: '400px',
              background: 'rgba(255, 255, 255, 0.5)',
              borderRadius: '50%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-80px',
              left: '-80px',
              width: '320px',
              height: '320px',
              background: 'rgba(0, 0, 0, 0.03)',
              borderRadius: '50%',
            }}
          />

          {/* 主要内容区域 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '64px 72px',
              height: '100%',
            }}
          >
            {/* 顶部区域：类型标签 + 元信息 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '48px',
              }}
            >
              {/* 左侧：类型标签 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <div
                  style={{
                    width: '4px',
                    height: '24px',
                    background: '#1a1a1a',
                    borderRadius: '2px',
                  }}
                />
                <div
                  style={{
                    fontSize: 20,
                    color: '#666666',
                    fontWeight: 600,
                    letterSpacing: '0.01em',
                  }}
                >
                  {typeLabel}
                </div>
              </div>

              {/* 右侧：文章元信息（仅文章页显示） */}
              {type === 'post' && (date || readingTime) && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                  }}
                >
                  {date && (
                    <div
                      style={{
                        fontSize: 18,
                        color: '#888888',
                        fontWeight: 500,
                      }}
                    >
                      {date}
                    </div>
                  )}
                  {date && readingTime && (
                    <div
                      style={{
                        width: '1px',
                        height: '16px',
                        background: '#d0d0d0',
                      }}
                    />
                  )}
                  {readingTime && (
                    <div
                      style={{
                        fontSize: 18,
                        color: '#888888',
                        fontWeight: 500,
                      }}
                    >
                      {readingTime} 分钟
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 标题 - 优化字体大小和行高 */}
            <div
              style={{
                fontSize: title.length > 30 ? 52 : title.length > 20 ? 60 : 68,
                fontWeight: 700,
                color: '#1a1a1a',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                marginBottom: '20px',
                maxHeight: '240px',
                overflow: 'hidden',
              }}
            >
              {title}
            </div>

            {/* 副标题 - 优化字体大小 */}
            {subtitle && !postsCount && !thoughtsCount && !mioSaysCount && (
              <div
                style={{
                  fontSize: 24,
                  color: '#666666',
                  fontWeight: 400,
                  lineHeight: 1.6,
                  marginBottom: 'auto',
                  maxHeight: '80px',
                  overflow: 'hidden',
                }}
              >
                {subtitle}
              </div>
            )}

            {/* 首页统计信息 - 优化布局和字体 */}
            {type === 'default' && (postsCount || thoughtsCount || mioSaysCount) && (
              <div
                style={{
                  display: 'flex',
                  gap: '48px',
                  marginTop: '16px',
                  marginBottom: 'auto',
                }}
              >
                {postsCount && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 48,
                        fontWeight: 700,
                        color: '#1a1a1a',
                        lineHeight: 1,
                      }}
                    >
                      {postsCount}
                    </div>
                    <div
                      style={{
                        fontSize: 18,
                        color: '#888888',
                        fontWeight: 500,
                      }}
                    >
                      篇文章
                    </div>
                  </div>
                )}
                {thoughtsCount && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 48,
                        fontWeight: 700,
                        color: '#1a1a1a',
                        lineHeight: 1,
                      }}
                    >
                      {thoughtsCount}
                    </div>
                    <div
                      style={{
                        fontSize: 18,
                        color: '#888888',
                        fontWeight: 500,
                      }}
                    >
                      条碎碎念
                    </div>
                  </div>
                )}
                {mioSaysCount && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 48,
                        fontWeight: 700,
                        color: '#1a1a1a',
                        lineHeight: 1,
                      }}
                    >
                      {mioSaysCount}
                    </div>
                    <div
                      style={{
                        fontSize: 18,
                        color: '#888888',
                        fontWeight: 500,
                      }}
                    >
                      条 Mio 说
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 列表页更新时间 - 优化字体 */}
            {(type === 'posts' || type === 'thoughts' || type === 'mio-says') && lastUpdate && (
              <div
                style={{
                  display: 'flex',
                  fontSize: 18,
                  color: '#999999',
                  fontWeight: 500,
                  marginTop: '12px',
                  marginBottom: 'auto',
                }}
              >
                上次更新于 {lastUpdate}
              </div>
            )}

            {/* 底部区域 - 优化对齐和间距 */}
            <div
              style={{
                marginTop: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '40px',
                borderTop: '1px solid rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* 左侧：统计或域名 */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {count ? (
                  <>
                    <div
                      style={{
                        fontSize: 64,
                        fontWeight: 700,
                        color: '#1a1a1a',
                        lineHeight: 1,
                      }}
                    >
                      {count}
                    </div>
                    <div
                      style={{
                        fontSize: 22,
                        color: '#666666',
                        fontWeight: 600,
                      }}
                    >
                      {type === 'posts' ? '篇文章' : type === 'thoughts' ? '条想法' : '条记录'}
                    </div>
                  </>
                ) : (
                  <div
                    style={{
                      fontSize: 26,
                      color: '#1a1a1a',
                      fontWeight: 700,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    blog.viki.moe
                  </div>
                )}
              </div>

              {/* 右侧：头像 */}
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
                  width="72"
                  height="72"
                  style={{
                    borderRadius: '14px',
                    border: '2px solid rgba(0, 0, 0, 0.1)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Noto Sans SC',
            data: fontData,
            style: 'normal',
            weight: 400,
          },
        ],
      },
    )
  } catch (error) {
    console.error('Error generating OG image:', error)
    return new Response('Failed to generate image', { status: 500 })
  }
}
