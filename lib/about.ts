import aboutData from '@/data/about.json'
import projectsData from '@/data/projects.json'
import techStackData from '@/data/tech-stack.json'
import contactData from '@/data/contact.json'

export interface OpenSourceProject {
  name: string
  url: string
  description: string
  displayName?: string
  stars?: string
}

export interface ContactLink {
  label: string
  url: string
}

export interface AboutData {
  intro: {
    title: string
    paragraphs: string[]
  }
  openSource: {
    projects: OpenSourceProject[]
    moreLink: string
  }
  techStack: string[]
  contact: ContactLink[]
}

export const about: AboutData = {
  intro: aboutData.intro,
  openSource: {
    projects: projectsData,
    moreLink: aboutData.openSource.moreLink,
  },
  techStack: techStackData,
  contact: contactData,
}

export { projectsData as projects, techStackData as techStack, contactData as contact }
