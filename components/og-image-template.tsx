import { siteConfig } from '@/lib/config'

interface OgImageTemplateProps {
  title: string
  subtitle?: string
  type?: 'home' | 'post' | 'page'
  date?: string
  readingTime?: number
  // 首页统计数据
  postsCount?: number
  thoughtsCount?: number
  mioSaysCount?: number
  iconData: Buffer | ArrayBuffer
}

export function OgImageTemplate({
  title,
  subtitle,
  type = 'page',
  date,
  readingTime,
  postsCount,
  thoughtsCount,
  mioSaysCount,
  iconData,
}: OgImageTemplateProps) {
  const typeLabel = siteConfig.name

  const base64Icon =
    iconData instanceof ArrayBuffer
      ? Buffer.from(iconData).toString('base64')
      : iconData.toString('base64')

  // 是否显示统计数据（仅首页）
  const showStats = type === 'home' && (postsCount || thoughtsCount || mioSaysCount)

  return (
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
      {/* 背景几何装饰 */}
      <div
        style={{
          position: 'absolute',
          display: 'flex',
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
          display: 'flex',
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
                display: 'flex',
                width: '4px',
                height: '24px',
                background: '#1a1a1a',
                borderRadius: '2px',
              }}
            />
            <div
              style={{
                display: 'flex',
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
                    display: 'flex',
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
                    display: 'flex',
                    width: '1px',
                    height: '16px',
                    background: '#d0d0d0',
                  }}
                />
              )}
              {readingTime && (
                <div
                  style={{
                    display: 'flex',
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

        {/* 标题 */}
        <div
          style={{
            display: 'flex',
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

        {/* 副标题（非统计数据模式） */}
        {subtitle && !showStats && (
          <div
            style={{
              display: 'flex',
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

        {/* 首页统计信息 */}
        {showStats && (
          <div
            style={{
              display: 'flex',
              gap: '48px',
              marginTop: '16px',
              marginBottom: 'auto',
            }}
          >
            {postsCount !== undefined && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
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
                    display: 'flex',
                    fontSize: 18,
                    color: '#888888',
                    fontWeight: 500,
                  }}
                >
                  篇文章
                </div>
              </div>
            )}
            {thoughtsCount !== undefined && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
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
                    display: 'flex',
                    fontSize: 18,
                    color: '#888888',
                    fontWeight: 500,
                  }}
                >
                  条碎碎念
                </div>
              </div>
            )}
            {mioSaysCount !== undefined && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
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
                    display: 'flex',
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

        {/* 底部区域 */}
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
          {/* 左侧：域名 */}
          <div
            style={{
              display: 'flex',
              fontSize: 26,
              color: '#1a1a1a',
              fontWeight: 700,
              letterSpacing: '-0.01em',
            }}
          >
            blog.viki.moe
          </div>

          {/* 右侧：头像 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/png;base64,${base64Icon}`}
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
  )
}
