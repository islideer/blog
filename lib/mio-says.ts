import { promises as fs } from 'fs'
import path from 'path'

const mioSaysFile = path.join(process.cwd(), 'data', 'mio-says.json')

export interface MioSay {
  id: string
  date: string // ISO 8601 格式
  content: string
  images?: string[] // 图片链接数组
}

/**
 * 获取所有 Mio 说，按日期从新到旧排序
 */
export async function getAllMioSays(): Promise<MioSay[]> {
  try {
    await fs.access(mioSaysFile)
    const fileContents = await fs.readFile(mioSaysFile, 'utf8')
    const mioSays: MioSay[] = JSON.parse(fileContents)

    // 按日期从新到旧排序
    return mioSays.toSorted((a, b) => (a.date < b.date ? 1 : -1))
  } catch (error) {
    console.error('Error reading mio-says:', error)
    return []
  }
}

/**
 * 获取 Mio 说总数
 */
export async function getMioSaysCount(): Promise<number> {
  const mioSays = await getAllMioSays()
  return mioSays.length
}
