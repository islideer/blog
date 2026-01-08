import type { TechStackData } from '@/lib/data'

interface AboutTechStackProps {
  technologies: TechStackData
}

const categoryNames: Record<keyof TechStackData, string> = {
  languages: '语言 / Languages',
  frontend: '前端 / Frontend',
  backend: '后端 / Backend',
  crossPlatform: '跨平台 / Cross-Platform',
}

export function AboutTechStack({ technologies }: AboutTechStackProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">
        技术栈 / Tech Stack
      </h2>
      <div className="space-y-8">
        {(Object.keys(technologies) as Array<keyof TechStackData>).map((category) => (
          <div key={category} className="space-y-3">
            <h3 className="text-text-primary text-sm font-medium">{categoryNames[category]}</h3>
            <ul className="space-y-2">
              {technologies[category].map((tech) => (
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
