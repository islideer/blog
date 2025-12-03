export function DraftBadge({ className }: { className?: string }) {
  return (
    <span
      className={`text-text-tertiary bg-bg-tertiary shrink-0 rounded-sm px-1.5 py-0.5 text-xs font-medium ${className}`}
    >
      草稿
    </span>
  )
}
