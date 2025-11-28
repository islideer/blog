import type { ContactLink } from '@/lib/data'

interface AboutContactProps {
  links: ContactLink[]
}

export function AboutContact({ links }: AboutContactProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase">Contact</h2>
      <div className="text-text-secondary flex flex-wrap gap-4 text-sm">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="decoration-text-tertiary hover:text-text-primary hover:decoration-text-primary underline underline-offset-4"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  )
}
