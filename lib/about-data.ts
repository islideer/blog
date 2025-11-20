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
      date: '2025.08.20',
      description: '与 Mio 在一起，共同迎接未来的每一天。',
    },
    {
      date: '2023.07.10',
      description: '加入 SHEIN，开启打工人的社畜之旅。',
    },
    {
      date: '2023.06.20',
      description: '从 NCU 毕业。别了，我的校园生活。',
    },
    {
      date: '2019.11.16',
      description: '加入 NCUHOME 并遇见了 Mio。一个有趣又有爱的校级互联网团体。',
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
    'Node.js',
    'TypeScript',
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
