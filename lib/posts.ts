import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface PostMetadata {
  title: string
  date: string
  excerpt: string
  tags?: string[]
  author?: string
  slug: string
  draft?: boolean
}

export interface Post extends PostMetadata {
  content: string
}

/**
 * 递归获取目录下所有 .md 和 .mdx 文件的相对路径
 */
function getAllMarkdownFiles(dir: string, baseDir: string = dir): string[] {
  if (!fs.existsSync(dir)) {
    return []
  }

  const files: string[] = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      // 递归读取子目录
      files.push(...getAllMarkdownFiles(fullPath, baseDir))
    } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
      // 获取相对于 posts 目录的路径
      const relativePath = path.relative(baseDir, fullPath)
      files.push(relativePath)
    }
  }

  return files
}

export function getAllPosts(): PostMetadata[] {
  const markdownFiles = getAllMarkdownFiles(postsDirectory)

  const allPostsData: PostMetadata[] = markdownFiles.map((relativePath) => {
    // 生成 slug: 只使用文件名部分，例如 "2022/css-history-and-perf.md" -> "css-history-and-perf"
    const fileName = path.basename(relativePath, path.extname(relativePath))
    const slug = fileName
    const fullPath = path.join(postsDirectory, relativePath)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    return {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || '',
      tags: data.tags || [],
      author: data.author || '',
      draft: data.draft || false,
    }
  })

  return allPostsData.filter((post) => !post.draft).toSorted((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): Post | null {
  try {
    // 在所有目录中查找匹配的文件名
    const markdownFiles = getAllMarkdownFiles(postsDirectory)
    const matchingFile = markdownFiles.find((relativePath) => {
      const fileName = path.basename(relativePath, path.extname(relativePath))
      return fileName === slug
    })

    if (!matchingFile) {
      return null
    }

    const fullPath = path.join(postsDirectory, matchingFile)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || '',
      tags: data.tags || [],
      author: data.author || '',
      draft: data.draft || false,
      content,
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

export function getAllPostSlugs(): string[] {
  const markdownFiles = getAllMarkdownFiles(postsDirectory)

  return markdownFiles
    .map((relativePath) => {
      const fileName = path.basename(relativePath, path.extname(relativePath))
      const slug = fileName
      const fullPath = path.join(postsDirectory, relativePath)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return { slug, draft: data.draft || false }
    })
    .filter((item) => !item.draft)
    .map((item) => item.slug)
}
