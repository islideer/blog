import aboutData from '@/data/about.json'
import projectsData from '@/data/projects.json'
import techStackData from '@/data/tech-stack.json'
import contactData from '@/data/contact.json'

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

export const about: AboutData = {
  intro: aboutData.intro,
  openSource: {
    projects: projectsData as ProjectsData,
    moreLink: aboutData.openSource.moreLink,
  },
  techStack: techStackData as TechStackData,
  contact: contactData,
}

export { projectsData as projects, techStackData as techStack, contactData as contact }
