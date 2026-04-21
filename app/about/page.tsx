import { AboutContact } from './_components/contact'
import { AboutIntro } from './_components/intro'
import { AboutOpenSource } from './_components/open-source'
import { AboutTechStack } from './_components/tech-stack'
import { about } from '@/lib/data'
import { siteConfig } from '@/lib/config'
import { pages } from '@/lib/data'
import { generateCanonicalUrl, generateBreadcrumbSchema, generateWebPageSchema } from '@/lib/seo'
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
        items={[
          { id: 'intro', title: about.intro.title },
          { id: 'contact', title: about.contact.title },
          { id: 'open-source', title: about.openSource.title },
          { id: 'tech-stack', title: about.techStack.title },
        ]}
      />

      <div className="space-y-12 py-8 sm:py-12">
        <AboutIntro id="intro" title={about.intro.title} paragraphs={about.intro.aboutParagraphs} />
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
