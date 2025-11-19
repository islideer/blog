import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '关于',
  description: '关于 Viki 和这个博客',
}

export default function AboutPage() {
  return (
    <div className="space-y-16 py-8">
      {/* Profile */}
      <section className="flex flex-col items-center space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold">Viki</h1>
          <p className="text-text-secondary text-lg">Web 前端开发者</p>
          <p className="text-text-tertiary text-sm italic">Less is more</p>
        </div>
      </section>

      {/* Bio */}
      <section className="space-y-6 text-center">
        <p className="text-text-secondary leading-relaxed">
          热爱探索 Web 技术，追求简洁优雅的代码与设计
        </p>

        <div className="flex justify-center gap-6 text-sm">
          <a
            href="https://github.com/vikiboss"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-text-primary"
          >
            GitHub
          </a>
          <a
            href="mailto:hi@viki.moe"
            className="text-text-secondary hover:text-text-primary"
          >
            Email
          </a>
          <a
            href="/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-text-primary"
          >
            RSS
          </a>
        </div>
      </section>

      {/* Tech Stack - Simplified */}
      <section className="space-y-4 text-center">
        <h2 className="text-text-tertiary text-sm font-medium">技术栈</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'].map((tech) => (
            <span
              key={tech}
              className="bg-bg-secondary text-text-secondary rounded-full px-3 py-1 text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}
