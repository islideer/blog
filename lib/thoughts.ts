import { promises as fs } from 'fs'
import path from 'path'

const thoughtsFile = path.join(process.cwd(), 'data', 'thoughts.json')

export interface Thought {
  id: string
  date: string // ISO 8601 格式
  content: string
  images?: string[] // 图片链接数组
}

/**
 * 获取所有碎碎念，按日期从新到旧排序
 */
export async function getAllThoughts(): Promise<Thought[]> {
  try {
    await fs.access(thoughtsFile)
    const fileContents = await fs.readFile(thoughtsFile, 'utf8')
    const thoughts: Thought[] = JSON.parse(fileContents)

    // 按日期从新到旧排序
    return thoughts.toSorted((a, b) => (a.date < b.date ? 1 : -1))
  } catch (error) {
    console.error('Error reading thoughts:', error)
    return []
  }
}

/**
 * 获取碎碎念总数
 */
export async function getThoughtsCount(): Promise<number> {
  const thoughts = await getAllThoughts()
  return thoughts.length
}
