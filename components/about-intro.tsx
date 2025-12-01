import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxOptionsWithBreaks } from '@/lib/mdx'

interface AboutIntroProps {
  title: string
  paragraphs: string[]
}

export function AboutIntro({ title, paragraphs }: AboutIntroProps) {
  return (
    <section className="space-y-4">
      <h1 className="text-4xl font-bold">{title}</h1>
      <div className="prose text-text-secondary">
        <MDXRemote source={paragraphs.join('\n')} options={mdxOptionsWithBreaks} />
      </div>
    </section>
  )
}
