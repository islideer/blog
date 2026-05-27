'use server'

import { thoughts, mioSays, type Thought, type MioSay } from '@/lib/data'
import { parseMarkdown } from '@/lib/markdown'
import { getInteractionCounts } from '@/lib/interactions'

export type PostType = 'thoughts' | 'mio-says'

export interface PagedThoughtItem {
  id: string
  date: string
  content?: string
  html?: string
  images?: string[]
  initialCount?: number
}

export interface PagedResult {
  items: PagedThoughtItem[]
  hasMore: boolean
  total: number
}

const PAGE_SIZE = 5

function getData(type: PostType): (Thought | MioSay)[] {
  return type === 'thoughts' ? thoughts : mioSays
}

export async function getThoughtsPage(
  type: PostType,
  page: number,
): Promise<PagedResult> {
  const data = getData(type)
  const sorted = data.toSorted((a, b) => (a.date < b.date ? 1 : -1))
  const total = sorted.length
  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE
  const slice = sorted.slice(start, end)

  const ids = slice.map((item) => item.id)
  const counts = await getInteractionCounts(type, ids)

  const items: PagedThoughtItem[] = await Promise.all(
    slice.map(async (item) => ({
      id: item.id,
      date: item.date,
      content: item.content,
      html: item.content ? await parseMarkdown(item.content) : undefined,
      images: item.images,
      initialCount: counts[item.id],
    })),
  )

  return { items, hasMore: end < total, total }
}
