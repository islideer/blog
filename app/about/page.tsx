import { siteConfig } from '@/lib/config'
import { AboutIntro } from './_components/intro'
import { about, pages } from '@/lib/data'
import { AboutContact } from './_components/contact'
import { AboutTechStack } from './_components/tech-stack'
import { AboutOpenSource } from './_components/open-source'
import { StaticTableOfContents, type StaticTocItem } from '@/components/table-of-contents'
import { generateCanonicalUrl, generateBreadcrumbSchema, generateWebPageSchema } from '@/lib/seo'

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
        url: `${siteConfig.url}/opengraph-image`,
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
    images: [`${siteConfig.url}/opengraph-image`],
  },
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateWebPageSchema(pages.about.title, pages.about.description, pages.about.slug),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: '首页', url: '/' },
              { name: pages.about.title, url: pages.about.slug },
            ]),
          ),
        }}
      />
      <StaticTableOfContents
        items={
          [
            about.intro && { id: 'intro', title: about.intro.title },
            about.contact && { id: 'contact', title: about.contact.title },
            about.openSource && { id: 'open-source', title: about.openSource.title },
            about.techStack && { id: 'tech-stack', title: about.techStack.title },
          ].filter(Boolean) as StaticTocItem[]
        }
      />

      <div className="space-y-12 py-8 sm:py-12">
        {about.intro && (
          <AboutIntro
            id="intro"
            title={about.intro.title}
            paragraphs={about.intro.aboutParagraphs}
          />
        )}
        {about.contact && (
          <AboutContact id="contact" title={about.contact.title} links={about.contact.list} />
        )}
        {about.openSource && (
          <AboutOpenSource
            id="open-source"
            title={about.openSource.title}
            data={about.openSource.data}
            moreLink={about.openSource.moreLink}
          />
        )}
        {about.techStack && (
          <AboutTechStack
            id="tech-stack"
            title={about.techStack.title}
            techStacks={about.techStack.data}
          />
        )}
      </div>
    </>
  )
}
