import { AboutContact } from '@/components/about/contact'
import { AboutIntro } from '@/components/about/intro'
import { AboutOpenSource } from '@/components/about/open-source'
import { AboutTechStack } from '@/components/about/tech-stack'
import { about } from '@/lib/data'
import { siteConfig } from '@/lib/config'
import { pages } from '@/lib/data'
import { generateCanonicalUrl } from '@/lib/seo'
import { StaticTableOfContents } from '@/components/table-of-contents'

import type { Metadata } from 'next'

export const revalidate = 86400 // 缓存 1 天

export const metadata: Metadata = {
  title: pages.about.title,
  description: pages.about.description,
  alternates: {
    canonical: generateCanonicalUrl(pages.about.slug),
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale.replace('-', '_'),
    url: generateCanonicalUrl(pages.about.slug),
    title: `${pages.about.title} | ${siteConfig.name}`,
    description: pages.about.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${pages.about.slug}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: pages.about.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${pages.about.title} | ${siteConfig.name}`,
    description: pages.about.description,
    images: [`${pages.about.slug}/opengraph-image`],
  },
}

export default function AboutPage() {
  return (
    <>
      <StaticTableOfContents
        items={[
          { id: 'intro', title: about.intro.title },
          { id: 'contact', title: about.contact.title },
          { id: 'open-source', title: about.openSource.title },
          { id: 'tech-stack', title: about.techStack.title },
        ]}
      />

      <div className="space-y-12 py-8 sm:space-y-16 sm:py-12">
        <AboutIntro id="intro" title={about.intro.title} paragraphs={about.intro.paragraphs} />
        <AboutContact id="contact" title={about.contact.title} links={about.contact.list} />
        <AboutOpenSource
          id="open-source"
          title={about.openSource.title}
          data={about.openSource.data}
          moreLink={about.openSource.moreLink}
        />
        <AboutTechStack
          id="tech-stack"
          title={about.techStack.title}
          techStacks={about.techStack.data}
        />
      </div>
    </>
  )
}
