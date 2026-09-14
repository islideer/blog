import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/cn'
import { siteConfig } from '@/lib/config'

function CopyrightText() {
  return (
    <span className="text-text-secondary inline-flex gap-1">
      <span>
        © {siteConfig.copyright.year.start}-{siteConfig.copyright.year.end}
      </span>
      <span>{siteConfig.author.name}</span>
      <span>保留所有权利。</span>
    </span>
  )
}

export function LicenseText({ className }: { className?: string }) {
  return (
    <span className={cn('text-text-secondary', className)}>
      除特殊说明外，所有文章均以
      <a
        href={siteConfig.copyright.license.url}
        target="_blank"
        rel="noopener noreferrer"
        className="link mx-1 font-medium"
      >
        {siteConfig.copyright.license.name}
      </a>
      协议共享，转载请注明原文出处。
    </span>
  )
}

function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={className}>
      <a
        href={siteConfig.author.github}
        target="_blank"
        rel="noopener noreferrer"
        className="link"
        title="访问 GitHub 主页"
      >
        GitHub
      </a>
      <a
        href={siteConfig.links.rss}
        target="_blank"
        rel="noopener noreferrer"
        className="link"
        title="RSS"
      >
        RSS
      </a>
      <a
        href={siteConfig.links.travellings}
        target="_blank"
        rel="noopener noreferrer"
        className="link"
        title="开往，友链接力"
      >
        开往 · 友链接力
      </a>
    </div>
  )
}

function Tagline() {
  return (
    <div className="flex items-center gap-2">
      <Link passHref href="/" className="link">
        <Image
          className="round-cobblestone inline-block rounded-full align-middle"
          src="/avatar.png"
          alt="头像"
          width={20}
          height={20}
        />
      </Link>
      {siteConfig.name}
    </div>
  )
}

export function Footer() {
  return (
    <footer
      role="contentinfo"
      className="border-border-secondary max-w-3xl border-t p-4 transition-opacity sm:px-6"
    >
      <div className="flex flex-col gap-3 text-left text-sm">
        <Tagline />
        <LicenseText />
        <CopyrightText />
      </div>
    </footer>
  )
}
