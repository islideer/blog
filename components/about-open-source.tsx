import type { AboutData, ProjectsData } from '@/lib/data'

interface AboutOpenSourceProps {
  data: AboutData['openSource']
}

const categoryNames: Record<keyof ProjectsData, string> = {
  libraries: '类库',
  applications: '应用',
  tools: '工具',
  services: '服务',
  scripts: '脚本',
}

export function AboutOpenSource({ data }: AboutOpenSourceProps) {
  const { projects, moreLink } = data

  return (
    <section className="space-y-6">
      <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">
        Open Source
      </h2>
      <div className="space-y-8">
        {(Object.keys(projects) as Array<keyof ProjectsData>).map((category) => {
          const categoryProjects = projects[category]
          if (categoryProjects.length === 0) return null

          return (
            <div key={category} className="space-y-3">
              <h3 className="text-text-primary text-sm font-medium">{categoryNames[category]}</h3>
              <ul className="space-y-2">
                {categoryProjects.map((project) => (
                  <li key={project.name} className="text-text-secondary">
                    <div className="inline-flex flex-wrap items-baseline gap-2">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-text-primary font-medium transition-colors"
                      >
                        {project.name}
                      </a>
                      {project.status === 'archived' && (
                        <span className="text-text-tertiary bg-bg-secondary rounded px-1.5 py-0.5 text-xs leading-none">
                          已归档
                        </span>
                      )}
                      {project.stars && (
                        <span className="text-text-tertiary text-xs">★ {project.stars}</span>
                      )}
                      {project.homepage && (
                        <a
                          href={project.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-tertiary hover:text-text-secondary text-xs transition-colors"
                        >
                          主页
                        </a>
                      )}
                      <span className="text-text-tertiary text-sm">— {project.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
        <a
          href={moreLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-secondary hover:text-text-primary inline-block text-sm transition-colors"
        >
          探索更多
        </a>
      </div>
    </section>
  )
}
