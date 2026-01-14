import aboutData from '@/data/about.json'
import mioSaysData from '@/data/mio-says.json'
import thoughtsData from '@/data/thoughts.json'
import timelineData from '@/data/timeline.json'
import friendsData from '@/data/friends.json'
import otherGamesData from '@/data/other-games.json'
import booksData from '@/data/books.json'
import moviesData from '@/data/movies.json'
import playlistsData from '@/data/playlists.json'
import { isDev } from './env'

// --- About Types ---
export interface OpenSourceProject {
  name: string
  url: string
  description: string
  tags: string[]
  status: 'active' | 'archived'
  stars?: string
  homepage?: string
}

export interface ProjectsData {
  libraries: OpenSourceProject[]
  tools: OpenSourceProject[]
  services: OpenSourceProject[]
  scripts: OpenSourceProject[]
  applications: OpenSourceProject[]
}

export interface ContactLink {
  label: string
  url: string
}

export interface TechStackItem {
  name: string
  description: string
  link: string
}

export interface TechStackData {
  languages: TechStackItem[]
  frontend: TechStackItem[]
  backend: TechStackItem[]
  crossPlatform: TechStackItem[]
}

export const pagesData = {
  posts: {
    title: '文章',
    description: '记录技术思考和生活感悟',
    slug: '/posts',
  },
  thoughts: {
    title: '碎碎念',
    description: 'Viki 的碎碎念小角落，记录生活中的点滴想法和言论',
    slug: '/thoughts',
  },
  mioSays: {
    title: 'Mio 说',
    description: 'Mio 的专属发言空间，Viki 无编辑权限',
    slug: '/mio-says',
  },
  about: {
    title: '关于',
    description: '前端开发者，热衷于开源和技术分享，相信技术改变世界',
    slug: '/about',
  },
  game: {
    title: '游戏',
    description: '记录 Viki 的游戏时光，游戏库和游戏时长统计等',
    slug: '/game',
  },
  library: {
    title: '书影音',
    description: '记录追的番剧、去的现场、收藏的歌单、读的书、看的电影等',
    slug: '/library',
  },
  timeline: {
    title: '大事记',
    description: '记录生活中的重要时刻和里程碑',
    slug: '/timeline',
  },
  friends: {
    title: '好朋友们',
    description: 'Viki 在互联网上的好朋友们，交流学习，共同进步',
    slug: '/friends',
  },
}

export type PageData = typeof pagesData

export interface AboutData {
  intro: {
    title: string
    paragraphs: string[]
  }
  contact: {
    title: string
    list: ContactLink[]
  }
  openSource: {
    title: string
    moreLink: string
    data: ProjectsData
  }
  techStack: {
    title: string
    data: TechStackData
  }
}

// --- Mio Says Types ---
export interface MioSay {
  id: string
  date: string // ISO 8601 格式
  content: string
  images?: string[] // 图片链接数组
}

// --- Thoughts Types ---
export interface Thought {
  id: string
  date: string // ISO 8601 格式
  content: string
  images?: string[] // 图片链接数组
}

// --- Timeline Types ---
export interface TimelineItem {
  date: string
  description: string
}

// --- Friends Types ---
export interface Friend {
  name: string
  url: string
  description?: string // 可选的描述
  avatar?: string // 可选的头像
  rss?: string // 可选的 RSS 订阅地址
}

// --- Other Games Types ---
export interface OtherGame {
  id: string
  name: string
  cover: string
  type?: string
  platforms: string[]
  playtime?: string
  description?: string
  achievements?: string[]
  url?: string
}

// --- Library Types ---
export interface Book {
  id: string
  title: string
  cover: string
  author?: string
  year?: number
  rating?: number
  genre?: string[]
  description?: string
  read_date?: string
  url?: string
}

export interface Movie {
  id: string
  title: string
  cover: string
  year?: number
  director?: string
  rating?: number
  genre?: string[]
  description?: string
  watched_date?: string
  url?: string
}

export interface Playlist {
  id: string
  name: string
  cover: string
  creator?: string
  song_count?: number
  description?: string
  created_date?: string
  url?: string
}

// --- Exports ---

export const about = aboutData as AboutData

const defaultFriends: Friend[] = [
  {
    name: 'Example Friend',
    url: 'https://example.com',
    description: '示例友链，请替换为真实的好朋友。',
    avatar: 'https://avatar.viki.moe',
    rss: 'https://example.com/rss',
  },
  {
    name: 'Example Friend 2',
    url: 'https://example.com',
    description: '示例友链，请替换为真实的好朋友。',
  },
]

export const mioSays: MioSay[] = mioSaysData
export const thoughts: Thought[] = thoughtsData
export const timeline: TimelineItem[] = timelineData
export const friends: Friend[] = friendsData.length === 0 && isDev ? defaultFriends : friendsData
export const otherGames: OtherGame[] = otherGamesData
export const books: Book[] = booksData
export const movies: Movie[] = moviesData
export const playlists: Playlist[] = playlistsData
