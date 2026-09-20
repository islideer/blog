import type { TechStackData } from '@/lib/data'

interface AboutTechStackProps {
  id: string
  title: string
  techStacks: TechStackData
}

const categoryNames: Record<keyof TechStackData, string> = {
  languages: '语言',
  frontend: '前端',
  backend: '后端',
  crossPlatform: '跨平台',
}

export function AboutTechStack({ techStacks: stacks, id, title }: AboutTechStackProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-text-primary font-semibold tracking-wider uppercase" id={id}>
        {title}
      </h2>
      <div className="space-y-8">
        {(Object.keys(stacks) as Array<keyof TechStackData>).map((category) => (
          <div key={category} className="border-border-tertiary space-y-3 sm:border-l-2 sm:pl-4">
            <h3 className="text-text-primary text-sm font-medium">{categoryNames[category]}</h3>
            <ul className="space-y-2">
              {stacks[category].map((tech) => (
                <li key={tech.name} className="text-text-secondary flex items-baseline gap-2">
                  <a href={tech.link} target="_blank" rel="noopener noreferrer" className="link">
                    <span className="font-medium">{tech.name}</span>
                  </a>
                  <span className="text-text-secondary text-sm">{tech.description}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
