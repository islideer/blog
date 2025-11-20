import { renderMarkdownLinks } from '@/lib/markdown-utils'

interface AboutIntroProps {
  title: string
  paragraphs: string[]
}

export function AboutIntro({ title, paragraphs }: AboutIntroProps) {
  return (
    <section className="space-y-4">
      <h1 className="text-4xl font-bold">{title}</h1>
      <div className="text-text-secondary space-y-2">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{renderMarkdownLinks(paragraph)}</p>
        ))}
      </div>
    </section>
  )
}
