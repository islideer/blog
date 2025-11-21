import { AboutContact } from '@/components/about-contact'
import { AboutIntro } from '@/components/about-intro'
import { AboutOpenSource } from '@/components/about-open-source'
import { AboutTechStack } from '@/components/about-tech-stack'
import { about } from '@/lib/about'
import { siteConfig } from '@/lib/config'
import { generateCanonicalUrl } from '@/lib/seo'

import type { Metadata } from 'next'

const ogImageParams = new URLSearchParams({
  title: siteConfig.author.name,
  subtitle: '前端开发者 · 开源爱好者 · 终身学习者',
  type: 'about',
})

const ogImageUrl = `${siteConfig.url}/api/og?${ogImageParams.toString()}`

export const metadata: Metadata = {
  title: siteConfig.pages.about.title,
  description: siteConfig.pages.about.description,
  alternates: {
    canonical: generateCanonicalUrl('/about'),
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale.replace('-', '_'),
    url: generateCanonicalUrl('/about'),
    title: siteConfig.pages.about.title,
    description: siteConfig.pages.about.description,
    siteName: siteConfig.name,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: siteConfig.pages.about.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.pages.about.title,
    description: siteConfig.pages.about.description,
    creator: siteConfig.author.twitter,
    images: [ogImageUrl],
  },
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-12 py-8 sm:space-y-16 sm:py-12">
      <AboutIntro title={about.intro.title} paragraphs={about.intro.paragraphs} />
      <AboutOpenSource data={about.openSource} />
      <AboutTechStack technologies={about.techStack} />
      <AboutContact links={about.contact} />
    </div>
  )
}
