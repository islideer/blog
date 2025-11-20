export interface TimelineItem {
  date: string
  description: string
}

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
  timeline: TimelineItem[]
  openSource: {
    projects: OpenSourceProject[]
    moreLink: string
  }
  techStack: string[]
  contact: ContactLink[]
}

export const aboutData: AboutData = {
  intro: {
    title: 'Viki',
    paragraphs: [
      '我是一名 Web 前端开发工程师，目前在 SHEIN 工作，热爱 Web 技术和开源。',
      '有幸与 Mio 成为恋人，在一起享受真诚且简单的生活。',
    ],
  },
  timeline: [
    {
      date: '2019/11/16',
      description: '加入南昌大学家园工作室（NCUHOME），系统学习 Web 开发。结识了 Mio。',
    },
    {
      date: '2022/7/6',
      description: '在百度总部实习，感受企业级开发的严谨与挑战。第一次独立异地工作生活。',
    },
    {
      date: '2023/6/20',
      description: '毕业于南昌大学（NCU）软件工程专业，获得工学学士学位。',
    },
    {
      date: '2023/7/10',
      description: '入职 SHEIN，担任 Web 前端开发工程师，主要负责公线基建与开发体验。',
    },
    {
      date: '2025/8/20',
      description: '与 Mio 正式确立关系。这段感情始于大学相识，经历了多年相互了解与成长。',
    },
  ],
  openSource: {
    projects: [
      {
        name: 'vikiboss/60s',
        url: 'https://github.com/vikiboss/60s',
        description: '每天 60 秒读懂世界',
        stars: '4K+',
      },
      {
        name: '@shined/react-use',
        url: 'https://github.com/sheinsight/react-use',
        description: 'React Hooks 库',
      },
      {
        name: '@shined/reactive',
        url: 'https://github.com/sheinsight/reactive',
        description: '响应式状态管理',
      },
      {
        name: 'vikiboss/gs-helper',
        url: 'https://github.com/vikiboss/gs-helper',
        description: '原神工具（已归档）',
      },
    ],
    moreLink: 'https://github.com/vikiboss?tab=repositories',
  },
  techStack: [
    'HTML5',
    'CSS3',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'Bun',
    'Deno',
    'React',
    'Electron',
    'React Native',
    'Next.js',
    'Tailwind CSS',
    'NestJS',
    'Prisma',
  ],
  contact: [
    {
      label: 'GitHub',
      url: 'https://github.com/vikiboss',
    },
    {
      label: 'hi@viki.moe',
      url: 'mailto:hi@viki.moe',
    },
    {
      label: 'RSS',
      url: '/rss.xml',
    },
  ],
}
