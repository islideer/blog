import type { AboutData } from '@/lib/about-data'

interface AboutOpenSourceProps {
  data: AboutData['openSource']
}

export function AboutOpenSource({ data }: AboutOpenSourceProps) {
  const { projects, moreLink } = data

  return (
    <section className="space-y-6">
      <h2 className="text-text-secondary text-sm font-semibold tracking-wider uppercase">开源</h2>
      <div className="space-y-4">
        <div className="text-text-secondary space-y-1.5 text-sm">
          {projects.map((project, index) => (
            <p key={index}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-primary"
              >
                {project.displayName || project.name}
              </a>
              {' · '}
              {project.description}
              {project.stars && <span className="text-text-tertiary">({project.stars} Star)</span>}
            </p>
          ))}
        </div>
        <a
          href={moreLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-secondary hover:text-text-primary inline-block text-sm"
        >
          探索更多 →
        </a>
      </div>
    </section>
  )
}
