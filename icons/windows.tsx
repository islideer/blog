interface WindowsIconProps {
  className?: string
}

export function WindowsIcon({ className }: WindowsIconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-label="Windows">
      <path d="M0 2.5L6.5 1.5v6H0V2.5zM7.5 1.3L16 0v7.5H7.5V1.3zM16 8.5V16l-8.5-1.2V8.5H16zM0 8.5h6.5v6.2L0 13.5V8.5z" />
    </svg>
  )
}
