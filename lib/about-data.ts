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
      '一名 Web 前端工程师，就职于 [SHEIN](https://www.sheingroup.com/)，热爱 [Web 技术](https://developer.mozilla.org/zh-CN/docs/Web)，相信开源的力量。',
      '有幸与 Mio 相伴，一起享受真诚而简单的生活，朝着属于我们的小家努力。',
    ],
  },
  timeline: [
    {
      date: '2019/11/16',
      description:
        '加入 [南昌大学家园工作室（NCUHOME）](https://home.ncu.edu.cn/)，在这里系统学习 Web 开发技术，从零开始接触前端世界。也是在这里，第一次遇见了 Mio。',
    },
    {
      date: '2022/07/06',
      description:
        '前往北京百度总部实习，第一次体验大厂的工作节奏和企业级项目开发的严谨流程。这也是第一次独立在异地工作生活，收获了成长和独立。',
    },
    {
      date: '2023/06/20',
      description:
        '从南昌大学（NCU）计算机科学与技术专业毕业，获得工学学士学位。四年时光充实而美好，不仅学到了专业知识，更收获了珍贵的友谊和成长。',
    },
    {
      date: '2023/07/10',
      description:
        '入职 [SHEIN](https://www.sheingroup.com/)，担任 Web 前端工程师。主要负责公共技术线的基础建设工作，致力于提升开发者体验和工程效率，在实践中不断学习和成长。',
    },
    {
      date: '2025/08/20',
      description:
        '与 Mio 正式确立恋爱关系。这段感情始于 2019 年在 NCUHOME 的相识，经历了六年的相互了解、陪伴与成长，最终走到了一起。',
    },
  ],
  openSource: {
    projects: [
      {
        name: '60s',
        url: 'https://github.com/vikiboss/60s',
        description: '60 秒资讯、API 聚合服务',
        stars: '4K+',
      },
      {
        name: '@shined/react-use',
        url: 'https://github.com/sheinsight/react-use',
        description: 'SSR 友好的 React Hooks 库',
      },
      {
        name: '@shined/reactive',
        url: 'https://github.com/sheinsight/reactive',
        description: 'JavaScript 响应式状态管理',
      },
      {
        name: 'guitar-studio',
        url: 'https://github.com/vikiboss/guitar-studio',
        description: '多合一吉他工具：调音、和弦、节奏',
      },
      {
        name: 'react-online',
        url: 'https://github.com/vikiboss/react-online',
        description: 'React 在线编辑器，轻量、原生、支持 ESM、TypeScript、Tailwind CSS',
      },
      {
        name: 'deno-functions',
        url: 'https://github.com/vikiboss/deno-functions',
        description: '一系列实用的 Serverless 函数，实用可靠，部署在 Deno Deploy',
      },
      {
        name: 'face',
        url: 'https://github.com/vikiboss/face',
        description: 'QQ 表情包静态资源',
      },
      {
        name: 'v50',
        url: 'https://github.com/vikiboss/v50',
        description: 'KFC 疯狂星期四文案数据、API',
      },
      {
        name: 'ncu-auto-login-script',
        url: 'https://github.com/vikiboss/ncu-auto-login-script',
        description: '南昌大学（NCU）校园网自动登录脚本',
      },
      {
        name: 'gs-helper',
        url: 'https://github.com/vikiboss/gs-helper',
        description: '写给原神玩家的小工具（已归档）',
      },
      {
        name: 'BaidupanPlaySpeedControl',
        url: 'https://github.com/vikiboss/BaidupanPlaySpeedControl',
        description: '适用于百度网盘的视频倍速播放脚本（已归档）',
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
