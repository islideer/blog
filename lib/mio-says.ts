import mioSaysData from '@/data/mio-says.json'

export interface MioSay {
  id: string
  date: string // ISO 8601 格式
  content: string
  images?: string[] // 图片链接数组
}

export { mioSaysData }
