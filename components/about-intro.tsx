import { MarkdownLite } from './markdown-lite'

interface AboutIntroProps {
  title: string
  paragraphs: string[]
}

export async function AboutIntro({ title, paragraphs }: AboutIntroProps) {
  return (
    <section className="space-y-4">
      <h1 className="text-4xl font-bold">{title}</h1>
      <MarkdownLite size="md" className="text-text-secondary!" content={paragraphs.join('\n')} />
    </section>
  )
}
