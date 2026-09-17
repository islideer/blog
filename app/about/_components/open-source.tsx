import { GitHubIcon } from '@/icons/github'
import type { AboutData, ProjectsData } from '@/lib/data'

interface AboutOpenSourceProps {
  id: string
  title: string
  moreLink: Exclude<AboutData['openSource'], undefined>['moreLink']
  data: Exclude<AboutData['openSource'], undefined>['data']
}

const categoryNames: Record<keyof ProjectsData, string> = {
  libraries: '类库',
  applications: '应用',
  tools: '工具',
  services: '服务',
  scripts: '脚本',
}

export function AboutOpenSource({ data, moreLink, id, title }: AboutOpenSourceProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-text-primary font-semibold tracking-wider uppercase" id={id}>
        {title}
      </h2>
      <div className="space-y-8">
        {(Object.keys(data) as Array<keyof ProjectsData>).map((category) => {
          const categoryProjects = data[category] || []

          if (categoryProjects.length === 0) return null

          return (
            <div
              key={category}
              className="border-border-secondary space-y-2 border-l-2 pl-2 sm:pl-4"
            >
              <h3 className="text-text-primary font-medium">{categoryNames[category]}</h3>
              <ul className="space-y-4 sm:space-y-2">
                {categoryProjects.map((project) => (
                  <li key={project.name} className="text-text-secondary">
                    <div className="inline-flex flex-col flex-wrap gap-0 sm:flex-row sm:items-baseline sm:gap-3">
                      <div className="inline-flex items-center gap-2">
                        {project.status === 'archived' && (
                          <span className="text-text-secondary bg-bg-secondary rounded-sm px-1.5 py-1 text-xs font-medium">
                            已归档
                          </span>
                        )}
                        <div className="inline-flex items-center gap-1">
                          <GitHubIcon className="size-5" />
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link"
                          >
                            {project.name}
                          </a>
                        </div>
                        {project.stars && (
                          <span className="text-text-secondary text-sm">★ {project.stars}</span>
                        )}
                        {project.homepage && (
                          <a
                            href={project.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link text-sm"
                          >
                            主页
                          </a>
                        )}
                      </div>

                      <span className="text-text-secondary text-sm">{project.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
        <a href={moreLink} target="_blank" rel="noopener noreferrer" className="link inline-block">
          探索更多
        </a>
      </div>
    </section>
  )
}
