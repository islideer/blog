import type { TechStackData } from '@/lib/data'
import Link from 'next/link'

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
    <section className="space-y-6" id={id}>
      <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">{title}</h2>
      <div className="space-y-8">
        {(Object.keys(stacks) as Array<keyof TechStackData>).map((category) => (
          <div key={category} className="space-y-3">
            <h3 className="text-text-primary text-sm font-medium">{categoryNames[category]}</h3>
            <ul className="space-y-2">
              {stacks[category].map((tech) => (
                <li key={tech.name} className="text-text-secondary">
                  <Link
                    href={tech.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-text-primary items-baseline"
                  >
                    <span className="font-medium">{tech.name}</span>
                  </Link>
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
