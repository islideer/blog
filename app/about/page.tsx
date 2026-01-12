import { AboutContact } from '@/components/about-contact'
import { AboutIntro } from '@/components/about-intro'
import { AboutOpenSource } from '@/components/about-open-source'
import { AboutTechStack } from '@/components/about-tech-stack'
import { SteamGames } from '@/components/steam-games'
import { about } from '@/lib/data'
import { siteConfig } from '@/lib/config'
import { pagesData } from '@/lib/data'
import { generateCanonicalUrl } from '@/lib/seo'
import { StaticTableOfContents } from '@/components/table-of-contents'

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
      <StaticTableOfContents
        items={[
          { id: 'intro', title: about.intro.title },
          { id: 'contact', title: about.contact.title },
          { id: 'steam', title: about.steam.title },
          { id: 'open-source', title: about.openSource.title },
          { id: 'tech-stack', title: about.techStack.title },
        ]}
      />

      <AboutIntro id="intro" title={about.intro.title} paragraphs={about.intro.paragraphs} />
      <AboutContact id="contact" title={about.contact.title} links={about.contact.list} />
      <SteamGames id="steam" title={about.steam.title} steamId={about.steam.id} />
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
  )
}
