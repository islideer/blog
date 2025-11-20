import { AboutContact } from '@/components/about-contact'
import { AboutIntro } from '@/components/about-intro'
import { AboutOpenSource } from '@/components/about-open-source'
import { AboutTechStack } from '@/components/about-tech-stack'
import { AboutTimeline } from '@/components/about-timeline'
import { aboutData } from '@/lib/about-data'
import { siteConfig } from '@/lib/config'
import { generateCanonicalUrl } from '@/lib/seo'

import type { Metadata } from 'next'

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
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.pages.about.title,
    description: siteConfig.pages.about.description,
    creator: siteConfig.author.twitter,
  },
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-12 sm:space-y-16 py-12">
      <AboutIntro title={aboutData.intro.title} paragraphs={aboutData.intro.paragraphs} />
      <AboutTimeline items={aboutData.timeline} />
      <AboutOpenSource data={aboutData.openSource} />
      <AboutTechStack technologies={aboutData.techStack} />
      <AboutContact links={aboutData.contact} />
    </div>
  )
}
