import Image from 'next/image'
import { MarkdownLite } from './markdown-lite'

interface AboutIntroProps {
  id: string
  title: string
  paragraphs: string[]
}

export async function AboutIntro({ title, paragraphs, id }: AboutIntroProps) {
  return (
    <section className="space-y-4">
      <h1 className="flex items-center gap-3 text-3xl font-bold sm:text-4xl" id={id}>
        <Image
          className="inline-block rounded-full align-middle"
          src="/avatar.png"
          alt="头像"
          width={48}
          height={48}
        />
        {title}
      </h1>
      <MarkdownLite size="md" className="text-text-secondary!" content={paragraphs.join('\n')} />
    </section>
  )
}
