import { AboutContact } from '@/components/about-contact'
import { AboutIntro } from '@/components/about-intro'
import { AboutOpenSource } from '@/components/about-open-source'
import { AboutTechStack } from '@/components/about-tech-stack'
import { about } from '@/lib/about'
import { siteConfig } from '@/lib/config'
import { pageMetadata } from '@/lib/pages'
import { generateCanonicalUrl } from '@/lib/seo'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: pageMetadata.about.title,
  description: pageMetadata.about.description,
  alternates: {
    canonical: generateCanonicalUrl('/about'),
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale.replace('-', '_'),
    url: generateCanonicalUrl('/about'),
    title: `${pageMetadata.about.title} | ${siteConfig.name}`,
    description: pageMetadata.about.description,
    siteName: siteConfig.name,
    images: [
      {
        url: '/about/opengraph-image',
        width: 1200,
        height: 630,
        alt: pageMetadata.about.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${pageMetadata.about.title} | ${siteConfig.name}`,
    description: pageMetadata.about.description,
    images: ['/about/opengraph-image'],
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
