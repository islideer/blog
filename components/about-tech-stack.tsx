interface AboutTechStackProps {
  technologies: string[]
}

export function AboutTechStack({ technologies }: AboutTechStackProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">Tech Stack</h2>
      <p className="text-text-secondary">{technologies.join(', ')}</p>
    </section>
  )
}
