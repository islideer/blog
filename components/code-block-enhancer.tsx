'use client'

import { useEffect } from 'react'

const COPY_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" xmlns="http://www.w3.org/2000/svg">
  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const CHECK_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" xmlns="http://www.w3.org/2000/svg">
  <polyline points="20 6 9 17 4 12" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

export function CodeBlockEnhancer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const figures = document.querySelectorAll<HTMLElement>('figure[data-rehype-pretty-code-figure]')

    figures.forEach((figure) => {
      if (figure.querySelector('.code-copy-btn')) return

      const code = figure.querySelector('code')
      if (!code) return

      const btn = document.createElement('button')
      btn.className = 'code-copy-btn'
      btn.setAttribute('aria-label', '复制代码')
      btn.innerHTML = `<span data-icon="copy">${COPY_SVG}</span><span data-icon="check">${CHECK_SVG}</span>`

      btn.addEventListener('click', async () => {
        await navigator.clipboard.writeText(code.textContent ?? '')
        btn.dataset.copied = 'true'
        setTimeout(() => delete btn.dataset.copied, 2000)
      })

      figure.appendChild(btn)
    })
  }, [])

  return <>{children}</>
}
