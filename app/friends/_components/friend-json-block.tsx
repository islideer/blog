'use client'

import { useState } from 'react'
import { CopyIcon } from '@/icons/copy'
import { CheckIcon } from '@/icons/check'

interface FriendJsonBlockProps {
  html: string
  json: string
}

export function FriendJsonBlock({ html, json }: FriendJsonBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(json)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="prose-sm relative">
      <button
        onClick={handleCopy}
        aria-label="复制"
        className="absolute top-3 right-3 z-10 rounded p-1 text-[#abb2bf]/45 opacity-0 transition-all hover:text-white focus-visible:opacity-100 [div:hover>&]:opacity-100 active:scale-90"
      >
        {copied ? <CheckIcon className="h-3.5 w-3.5" /> : <CopyIcon className="h-3.5 w-3.5" />}
      </button>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
