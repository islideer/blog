import contact from '@/data/contact.json'
import projects from '@/data/projects.json'
import techStack from '@/data/tech-stack.json'

import aboutData from '@/data/about.json'
import mioSaysData from '@/data/mio-says.json'
import thoughtsData from '@/data/thoughts.json'
import timelineData from '@/data/timeline.json'
import friendsData from '@/data/friends.json'
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

export interface AboutData {
  intro: {
    title: string
    paragraphs: string[]
  }
  openSource: {
    projects: ProjectsData
    moreLink: string
  }
  techStack: TechStackData
  contact: ContactLink[]
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

// --- Exports ---

export const about: AboutData = {
  intro: aboutData.intro,
  openSource: {
    projects: projects as ProjectsData,
    moreLink: aboutData.openSource.moreLink,
  },
  techStack: techStack as TechStackData,
  contact: contact,
}

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

export { projects, techStack, contact }
