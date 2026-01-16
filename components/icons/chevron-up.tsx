interface ChevronUpIconProps {
  className?: string
}

export function ChevronUpIcon({ className }: ChevronUpIconProps) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="18 15 12 9 6 15" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
