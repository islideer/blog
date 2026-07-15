/// <reference types="node" />

import fs from 'node:fs/promises'
import path from 'node:path'
import { siteConfig } from '../lib/config.ts'
import { getAllPosts } from '../lib/posts.ts'
import { pages, about } from '../lib/data.ts'

const publicDirectory = path.join(process.cwd(), 'public')

async function generateLLMsTxt() {
  const posts = await getAllPosts()

  const postListContent = posts
    .map((post) => `- [${post.title}](/${post.slug}.md) #${post.topic} #${post.date.slice(0, 10)}`)
    .join('\n')

  const content = `
# ${siteConfig.name}

> ${siteConfig.tagline} ${siteConfig.description}

## 关于作者

${about.intro.title}，${about.intro.paragraphs.join('')}

## 所有文章

${postListContent}

## 博客页面

${Object.entries(pages)
  .map(([_, page]) => `- [${page.title}](${page.slug}) - ${page.description}`)
  .join('\n')}

## 订阅 RSS

- [文章 RSS](${siteConfig.links.rss}) - 文章更新
- [碎碎念 RSS](${pages.thoughts.slug}${siteConfig.links.rss}) - 碎碎念更新
- [Mio 说 RSS](${pages.mioSays.slug}${siteConfig.links.rss}) - Mio 说更新

## 开源项目

${[
  ...(about.openSource.data?.libraries ?? []),
  ...(about.openSource.data?.applications ?? []),
  ...(about.openSource.data?.services ?? []),
  ...(about.openSource.data?.scripts ?? []),
  ...(about.openSource.data?.tools ?? []),
]
  .map((app) => `- [${app.name}](${app.url}) - ${app.description}`)
  .join('\n')}

## 联系方式

${about.contact.list.map((contact) => `- [${contact.label}](${contact.url})`).join('\n')}
`.trim()

  const target = path.join(publicDirectory, 'llms.txt')

  await fs.writeFile(target, content, 'utf-8')
}

generateLLMsTxt()
  .then(() => console.log('llms.txt generated successfully.\n'))
  .catch((error) => console.error('Error generating llms.txt:', error))
