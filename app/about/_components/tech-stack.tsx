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
    <section className="space-y-6">
      <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase" id={id}>
        {title}
      </h2>
      <div className="space-y-8">
        {(Object.keys(stacks) as Array<keyof TechStackData>).map((category) => (
          <div key={category} className="border-border-tertiary space-y-3 border-l-2 pl-2 sm:pl-4">
            <h3 className="text-text-primary text-sm font-medium">{categoryNames[category]}</h3>
            <ul className="space-y-2">
              {stacks[category].map((tech) => (
                <li key={tech.name} className="text-text-secondary">
                  <a
                    href={tech.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-text-primary items-baseline"
                  >
                    <span className="font-medium">{tech.name}</span>
                  </a>
                  <span className="text-text-tertiary text-sm"> — {tech.description}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
