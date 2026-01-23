interface GenericIconProps {
  className?: string
}

export function GenericIcon({ className }: GenericIconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className}>
      <circle cx="8" cy="8" r="2" />
    </svg>
  )
}
