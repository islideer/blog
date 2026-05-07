interface Page {
  title: string
  slug: string
}

export function printEasterEgg(pages: readonly Page[], baseUrl: string) {
  const c = (color: string, extra = '') =>
    `color:${color};font-family:monospace;font-size:12px;${extra}`

  const charWidth = (str: string) =>
    [...str].reduce((w, ch) => w + (ch.codePointAt(0)! > 0x7f ? 2 : 1), 0)

  const maxW = pages.reduce((m, { title }) => Math.max(m, charWidth(title)), 0)
  const pad = (title: string) => title + ' '.repeat(maxW - charWidth(title))

  console.log(
    '%c┌─ %c✦ %c恭喜你发现了隐藏页面 🎉',
    c('#166534'),
    c('#fbbf24', 'font-size:13px;font-weight:bold;'),
    c('#4ade80', 'font-size:13px;font-weight:bold;'),
  )
  pages.forEach(({ title, slug }) => {
    console.log(
      `%c│  %c${pad(title)}%c  →  %c${baseUrl}${slug}`,
      c('#166534'),
      c('#86efac'),
      c('#22c55e'),
      c('#67e8f9', 'text-decoration:underline;'),
    )
  })
  console.log('%c└' + '─'.repeat(48), c('#166534'))
  console.log('%c  $ 连点站点标题三次即可解锁导航入口 ;)', c('#4b5563', 'font-size:11px;'))
}
