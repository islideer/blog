import path from 'node:path'
import { promises as fs } from 'node:fs'
import { getAllPostsWithContent } from '../lib/posts.ts'
import { truncateText, cleanMarkdownContent } from '@/lib/markdown.ts'

// 导入 JSON 数据
import thoughtsData from '../data/thoughts.json' with { type: 'json' }
import mioSaysData from '../data/mio-says.json' with { type: 'json' }
import collectionData from '../data/collection.json' with { type: 'json' }
import timelineData from '../data/timeline.json' with { type: 'json' }
import aboutData from '../data/about.json' with { type: 'json' }
import friendsData from '../data/friends.json' with { type: 'json' }

// 搜索索引项类型
export interface SearchIndexItem {
  id: string
  type: 'post' | 'thought' | 'mio-say' | 'collection' | 'timeline' | 'about' | 'friend'
  title: string
  excerpt?: string
  content: string
  tags?: string[]
  date?: string
  url: string
}

// 搜索索引类型
export interface SearchIndex {
  version: string
  items: SearchIndexItem[]
  metadata: {
    generatedAt: string
    totalItems: number
    postCount: number
    thoughtCount: number
    mioSayCount: number
    collectionCount: number
    timelineCount: number
    aboutCount: number
    friendCount: number
  }
}

/**
 * 生成搜索索引
 */
async function generateSearchIndex() {
  console.log('🔍 开始生成搜索索引...')

  const items: SearchIndexItem[] = []

  // 1. 处理文章
  console.log('📄 处理文章数据...')
  const posts = await getAllPostsWithContent()
  for (const post of posts) {
    const cleanedContent = cleanMarkdownContent(post.content)

    // // 文章内容只索引前 3000 字
    // const truncatedContent = truncateText(cleanedContent, 3000)

    items.push({
      id: `post-${post.slug}`,
      type: 'post',
      title: post.title,
      excerpt: post.excerpt,
      content: cleanedContent,
      tags: post.tags,
      date: post.date,
      url: `/${post.slug}`,
    })
  }
  console.log(`  ✓ 处理了 ${posts.length} 篇文章`)

  // 2. 处理碎碎念
  console.log('💭 处理碎碎念数据...')
  for (const thought of thoughtsData) {
    const cleanedContent = cleanMarkdownContent(thought.content)

    items.push({
      id: `thought-${thought.id}`,
      type: 'thought',
      title: `碎碎念 #${thought.id}`,
      excerpt: truncateText(cleanedContent, 100),
      content: cleanedContent,
      date: thought.date,
      url: `/thoughts#${thought.id}`,
    })
  }
  console.log(`  ✓ 处理了 ${thoughtsData.length} 条碎碎念`)

  // 3. 处理 Mio 说
  console.log('💕 处理 Mio 说数据...')
  for (const mioSay of mioSaysData) {
    const cleanedContent = cleanMarkdownContent(mioSay.content)

    items.push({
      id: `mio-say-${mioSay.id}`,
      type: 'mio-say',
      title: `Mio 说 #${mioSay.id}`,
      excerpt: truncateText(cleanedContent, 100),
      content: cleanedContent,
      date: mioSay.date,
      url: `/mio-says#${mioSay.id}`,
    })
  }
  console.log(`  ✓ 处理了 ${mioSaysData.length} 条 Mio 说`)

  // 4. 处理集合/储物箱
  console.log('🔖 处理集合数据...')
  let collectionCount = 0
  for (const category of collectionData) {
    for (const item of category.items) {
      items.push({
        id: `collection-${category.category}-${item.name}`,
        type: 'collection',
        title: item.name,
        excerpt: item.description,
        content: `${item.name} ${item.description} ${item.tags.join(' ')}`,
        tags: item.tags,
        url: item.url, // 直接使用集合项的实际链接
      })
      collectionCount++
    }
  }
  console.log(`  ✓ 处理了 ${collectionCount} 个集合项`)

  // 5. 处理时间线
  console.log('📅 处理时间线数据...')
  for (let i = 0; i < timelineData.length; i++) {
    const event = timelineData[i]
    const cleanedDescription = cleanMarkdownContent(event.description)

    items.push({
      id: `timeline-${i}`,
      type: 'timeline',
      title: cleanedDescription,
      content: cleanedDescription,
      date: event.date,
      url: `/timeline#${i + 1}`,
    })
  }
  console.log(`  ✓ 处理了 ${timelineData.length} 个时间线事件`)

  // 6. 处理关于页面
  console.log('👤 处理关于页面数据...')
  let aboutCount = 0

  // 个人介绍段落
  for (let i = 0; i < aboutData.intro.paragraphs.length; i++) {
    const paragraph = aboutData.intro.paragraphs[i]
    items.push({
      id: `about-intro-${i}`,
      type: 'about',
      title: '关于',
      excerpt: paragraph,
      content: paragraph,
      url: '/about',
    })
    aboutCount++
  }

  // 开源项目
  const projectCategories = ['libraries', 'applications', 'services', 'scripts'] as const
  for (const category of projectCategories) {
    const projects = aboutData.openSource.data[category]
    if (projects && Array.isArray(projects)) {
      for (const project of projects) {
        items.push({
          id: `about-project-${project.name}`,
          type: 'about',
          title: project.name,
          excerpt: project.description,
          content: `${project.name} ${project.description}`,
          url: '/about#open-source',
        })
        aboutCount++
      }
    }
  }

  console.log(`  ✓ 处理了 ${aboutCount} 个关于页面项`)

  // 7. 处理友链
  console.log('👥 处理友链数据...')
  for (const friend of friendsData) {
    items.push({
      id: `friend-${friend.id}`,
      type: 'friend',
      title: friend.name,
      excerpt: friend.description || '',
      content: `${friend.name} ${friend.description || ''}`,
      url: `/friends#${friend.id}`,
    })
  }
  console.log(`  ✓ 处理了 ${friendsData.length} 个友链`)

  // 生成索引
  const searchIndex: SearchIndex = {
    version: '1.0.0',
    metadata: {
      generatedAt: new Date().toISOString(),
      totalItems: items.length,
      postCount: posts.length,
      thoughtCount: thoughtsData.length,
      mioSayCount: mioSaysData.length,
      collectionCount,
      timelineCount: timelineData.length,
      aboutCount,
      friendCount: friendsData.length,
    },
    items,
  }

  // 输出到 public/search-index.json
  const outputPath = path.join(process.cwd(), 'public', 'search-index.json')
  await fs.writeFile(outputPath, JSON.stringify(searchIndex, null, 2), 'utf-8')

  // 计算文件大小
  const stats = await fs.stat(outputPath)
  const fileSizeKB = (stats.size / 1024).toFixed(2)

  console.log('\n✅ 搜索索引生成成功！')
  console.log(`  📊 总计: ${items.length} 个索引项`)
  console.log(`  📝 文章: ${posts.length}`)
  console.log(`  💭 碎碎念: ${thoughtsData.length}`)
  console.log(`  💕 Mio 说: ${mioSaysData.length}`)
  console.log(`  🔖 集合: ${collectionCount}`)
  console.log(`  📅 时间线: ${timelineData.length}`)
  console.log(`  👤 关于: ${aboutCount}`)
  console.log(`  👥 友链: ${friendsData.length}`)
  console.log(`  💾 文件大小: ${fileSizeKB} KB`)
  console.log(`  📁 输出路径: ${outputPath}\n`)
}

// 执行生成
generateSearchIndex()
  .then(() => {
    console.log('🎉 索引文件生成成功！')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ 生成搜索索引失败:', error)
    process.exit(1)
  })
