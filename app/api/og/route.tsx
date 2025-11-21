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
    const tags = searchParams.get('tags') || ''
    const count = searchParams.get('count') || ''

    // 获取 icon 图片
    const iconUrl = new URL('/icon-192.png', req.url).href
    const iconData = await fetch(iconUrl).then((res) => res.arrayBuffer())

    // 加载 Noto Sans SC 常用字字体（7.9MB，确保显示正确的简体中文字形）
    const fontData = await fetch(new URL('/fonts/SourceHanSansSC-Regular.otf', req.url)).then(
      (res) => res.arrayBuffer(),
    )

    // 解析标签
    const tagList = tags
      ? tags
          .split(',')
          .filter((t) => t.trim())
          .slice(0, 5)
      : []

    // 获取类型标签文本
    const getTypeLabel = () => {
      switch (type) {
        case 'post':
          return '博客文章'
        case 'posts':
          return '文章列表'
        case 'thoughts':
          return '碎碎念'
        case 'timeline':
          return '大事记'
        case 'about':
          return '关于'
        default:
          return '博客'
      }
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
            position: 'relative',
            fontFamily: '"Noto Sans SC", "Source Han Sans SC", sans-serif',
          }}
        >
          {/* 背景几何装饰 */}
          <div
            style={{
              position: 'absolute',
              top: '-120px',
              right: '-120px',
              width: '480px',
              height: '480px',
              background: 'rgba(255, 255, 255, 0.6)',
              borderRadius: '50%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-100px',
              left: '-100px',
              width: '380px',
              height: '380px',
              background: 'rgba(0, 0, 0, 0.04)',
              borderRadius: '50%',
            }}
          />

          {/* 主要内容区域 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '60px 80px',
              height: '100%',
            }}
          >
            {/* 顶部区域：类型标签 + 元信息 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: '36px',
              }}
            >
              {/* 左侧：类型标签 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    width: '5px',
                    height: '28px',
                    background: '#1a1a1a',
                    borderRadius: '2px',
                  }}
                />
                <div
                  style={{
                    fontSize: 22,
                    color: '#666666',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                  }}
                >
                  {getTypeLabel()}
                </div>
              </div>

              {/* 右侧：文章元信息（仅文章页显示） */}
              {type === 'post' && (date || readingTime) && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '6px',
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
                  {readingTime && (
                    <div
                      style={{
                        fontSize: 16,
                        color: '#999999',
                        fontWeight: 500,
                      }}
                    >
                      阅读时长 {readingTime} 分钟
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 标题 */}
            <div
              style={{
                fontSize: title.length > 30 ? 58 : title.length > 20 ? 64 : 72,
                fontWeight: 700,
                color: '#1a1a1a',
                lineHeight: 1.12,
                letterSpacing: '-0.03em',
                marginBottom: '24px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {title}
            </div>

            {/* 副标题 */}
            {subtitle && (
              <div
                style={{
                  fontSize: 28,
                  color: '#666666',
                  fontWeight: 400,
                  lineHeight: 1.5,
                  marginBottom: tagList.length > 0 ? '28px' : 'auto',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {subtitle}
              </div>
            )}

            {/* 标签区域（仅文章页显示） */}
            {type === 'post' && tagList.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  flexWrap: 'wrap',
                  marginTop: 'auto',
                  marginBottom: '20px',
                }}
              >
                {tagList.map((tag, index) => (
                  <div
                    key={index}
                    style={{
                      background: '#ffffff',
                      padding: '8px 18px',
                      borderRadius: '20px',
                      fontSize: 16,
                      color: '#444444',
                      fontWeight: 600,
                      border: '1.5px solid #e0e0e0',
                    }}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            )}

            {/* 底部区域 */}
            <div
              style={{
                marginTop: tagList.length > 0 ? '0' : 'auto',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                paddingTop: '32px',
                borderTop: '2px solid rgba(0, 0, 0, 0.08)',
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
                        fontSize: 56,
                        fontWeight: 700,
                        color: '#1a1a1a',
                        lineHeight: 1,
                      }}
                    >
                      {count}
                    </div>
                    <div
                      style={{
                        fontSize: 20,
                        color: '#666666',
                        fontWeight: 600,
                      }}
                    >
                      {type === 'posts' && '篇文章'}
                      {type === 'thoughts' && '条想法'}
                      {type === 'timeline' && '条记录'}
                    </div>
                  </>
                ) : (
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
