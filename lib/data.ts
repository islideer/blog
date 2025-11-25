import contact from '@/data/contact.json'
import projects from '@/data/projects.json'
import techStack from '@/data/tech-stack.json'

import aboutData from '@/data/about.json'
import mioSaysData from '@/data/mio-says.json'
import thoughtsData from '@/data/thoughts.json'
import timelineData from '@/data/timeline.json'

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

export const mioSays: MioSay[] = mioSaysData
export const thoughts: Thought[] = thoughtsData
export const timeline: TimelineItem[] = timelineData

export { projects, techStack, contact }
