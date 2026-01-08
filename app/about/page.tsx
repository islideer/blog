import { AboutContact } from '@/components/about-contact'
import { AboutIntro } from '@/components/about-intro'
import { AboutOpenSource } from '@/components/about-open-source'
import { AboutTechStack } from '@/components/about-tech-stack'
import { about } from '@/lib/data'
import { siteConfig } from '@/lib/config'
import { pagesData } from '@/lib/config'
import { generateCanonicalUrl } from '@/lib/seo'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: pagesData.about.title,
  description: pagesData.about.description,
  alternates: {
    canonical: generateCanonicalUrl('/about'),
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale.replace('-', '_'),
    url: generateCanonicalUrl('/about'),
    title: `${pagesData.about.title} | ${siteConfig.name}`,
    description: pagesData.about.description,
    siteName: siteConfig.name,
    images: [
      {
        url: '/about/opengraph-image',
        width: 1200,
        height: 630,
        alt: pagesData.about.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${pagesData.about.title} | ${siteConfig.name}`,
    description: pagesData.about.description,
    images: ['/about/opengraph-image'],
  },
}

export default function AboutPage() {
  return (
    <div className="space-y-12 py-8 sm:space-y-16 sm:py-12">
      <AboutIntro title={about.intro.title} paragraphs={about.intro.paragraphs} />
      <AboutContact links={about.contact} />
      <AboutOpenSource data={about.openSource} />
      <AboutTechStack technologies={about.techStack} />
    </div>
  )
}
