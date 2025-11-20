import type { ContactLink } from '@/lib/about-data'

interface AboutContactProps {
  links: ContactLink[]
}

export function AboutContact({ links }: AboutContactProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-text-secondary text-sm font-semibold uppercase tracking-wider">
        Contact
      </h2>
      <div className="text-text-secondary flex flex-wrap gap-4 text-sm">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target={link.url.startsWith('http') ? '_blank' : undefined}
            rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="underline decoration-text-tertiary underline-offset-4 transition-colors hover:text-text-primary hover:decoration-text-primary"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  )
}
