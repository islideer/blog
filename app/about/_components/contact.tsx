import type { ContactLink } from '@/lib/data'

interface AboutContactProps {
  id: string
  title: string
  links: ContactLink[]
}

export function AboutContact({ id, links, title }: AboutContactProps) {
  return (
    <section className="space-y-2">
      <h2 className="text-text-primary font-semibold tracking-wider uppercase" id={id}>
        {title}
      </h2>
      <div className="text-text-secondary flex flex-wrap gap-4">
        {links.map((link, index) => (
          <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="link">
            {link.label}
          </a>
        ))}
      </div>
    </section>
  )
}
