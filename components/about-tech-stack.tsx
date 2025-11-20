interface AboutTechStackProps {
  technologies: string[]
}

export function AboutTechStack({ technologies }: AboutTechStackProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-text-secondary text-sm font-semibold uppercase tracking-wider">
        Tech Stack
      </h2>
      <p className="text-text-secondary">{technologies.join(', ')}</p>
    </section>
  )
}
