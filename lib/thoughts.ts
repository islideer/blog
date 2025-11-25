import thoughtsData from '@/data/thoughts.json'

export interface Thought {
  id: string
  date: string // ISO 8601 格式
  content: string
  images?: string[] // 图片链接数组
}

export { thoughtsData }
