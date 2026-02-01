import { siteConfig } from '@/lib/config'

interface OgImageTemplateProps {
  title: string
  iconData: Buffer | ArrayBuffer
  // 右上角元信息区域（可选）
  metaContent?: React.ReactNode
  // 标题下方的内容区域（可选）
  bodyContent?: React.ReactNode
}

export function OgImageStatsItem({ number, label }: { number: number; label: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: '12px',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 60,
          fontWeight: 700,
          color: '#1a1a1a',
          lineHeight: 1,
        }}
      >
        {number.toLocaleString('zh-Hans-CN')}
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 24,
          color: '#888888',
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </div>
  )
}

export function OgImageTemplate({
  title,
  iconData,
  metaContent,
  bodyContent,
}: OgImageTemplateProps) {
  const base64Icon =
    iconData instanceof ArrayBuffer
      ? Buffer.from(iconData).toString('base64')
      : iconData.toString('base64')

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
        {/* 顶部区域：站点名称 + 右侧元信息 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '48px',
          }}
        >
          {/* 左侧：站点名称 */}
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
              {siteConfig.name}
            </div>
          </div>

          {/* 右侧：元信息插槽 */}
          {metaContent}
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
            marginBottom: '24px',
            maxHeight: '240px',
            overflow: 'hidden',
          }}
        >
          {title}
        </div>

        {/* 标题下方内容插槽 */}
        {bodyContent}

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
            {siteConfig.url.replace(/^https?:\/\//, '')}
          </div>

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
