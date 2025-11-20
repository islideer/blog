import { promises as fs } from 'fs'
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
  top?: boolean
}

export interface Post extends PostMetadata {
  content: string
}

/**
 * 递归获取目录下所有 .md 和 .mdx 文件的相对路径
 */
async function getAllMarkdownFiles(dir: string, baseDir: string = dir): Promise<string[]> {
  try {
    await fs.access(dir)
  } catch {
    return []
  }

  const files: string[] = []
  const entries = await fs.readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      // 递归读取子目录
      const subFiles = await getAllMarkdownFiles(fullPath, baseDir)
      files.push(...subFiles)
    } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
      // 获取相对于 posts 目录的路径
      const relativePath = path.relative(baseDir, fullPath)
      files.push(relativePath)
    }
  }

  return files
}

export async function getAllPosts(): Promise<PostMetadata[]> {
  const markdownFiles = await getAllMarkdownFiles(postsDirectory)

  const allPostsData: PostMetadata[] = await Promise.all(
    markdownFiles.map(async (relativePath) => {
      // 生成 slug: 只使用文件名部分，例如 "2022/css-history-and-perf.md" -> "css-history-and-perf"
      const fileName = path.basename(relativePath, path.extname(relativePath))
      const slug = fileName
      const fullPath = path.join(postsDirectory, relativePath)
      const fileContents = await fs.readFile(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || '',
        tags: data.tags || [],
        author: data.author || '',
        draft: data.draft || false,
        top: data.top || false,
      }
    }),
  )

  return allPostsData.filter((post) => !post.draft).toSorted((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    // 在所有目录中查找匹配的文件名
    const markdownFiles = await getAllMarkdownFiles(postsDirectory)
    const matchingFile = markdownFiles.find((relativePath) => {
      const fileName = path.basename(relativePath, path.extname(relativePath))
      return fileName === slug
    })

    if (!matchingFile) {
      return null
    }

    const fullPath = path.join(postsDirectory, matchingFile)
    const fileContents = await fs.readFile(fullPath, 'utf8')
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

export async function getAllPostSlugs(): Promise<string[]> {
  const markdownFiles = await getAllMarkdownFiles(postsDirectory)

  const slugsWithDraft = await Promise.all(
    markdownFiles.map(async (relativePath) => {
      const fileName = path.basename(relativePath, path.extname(relativePath))
      const slug = fileName
      const fullPath = path.join(postsDirectory, relativePath)
      const fileContents = await fs.readFile(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return { slug, draft: data.draft || false }
    }),
  )

  return slugsWithDraft.filter((item) => !item.draft).map((item) => item.slug)
}
