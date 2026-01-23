interface ChevronDownIconProps {
  className?: string
}

export function ChevronDownIcon({ className }: ChevronDownIconProps) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="6 9 12 15 18 9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
