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
      <div className="text-text-secondary space-y-2">
        {paragraphs.map((paragraph, index) => (
          <div key={index} className="prose prose-sm max-w-none dark:prose-invert">
            <MDXRemote source={paragraph} options={mdxOptionsWithBreaks} />
          </div>
        ))}
      </div>
    </section>
  )
}
