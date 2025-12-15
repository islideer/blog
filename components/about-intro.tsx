import { MarkdownLite } from '@/components/markdown-lite'

interface AboutIntroProps {
  title: string
  paragraphs: string[]
}

export async function AboutIntro({ title, paragraphs }: AboutIntroProps) {
  return (
    <section className="space-y-4">
      <h1 className="text-4xl font-bold">{title}</h1>
      <div className="text-text-secondary">
        <MarkdownLite content={paragraphs.join('\n')} />
      </div>
    </section>
  )
}
