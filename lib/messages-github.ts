/**
 * GitHub API 封装 - 留言板数据层
 * 使用私有仓库的 GitHub Issues 存储留言数据
 */

import matter from 'gray-matter'
import crypto from 'node:crypto'
import { cache } from 'react'
import { botOctokit } from './github-app'
import { truncateText, cleanMarkdownContent } from './markdown'

import type { MessageAuthor, Message, MessageReply } from './messages'

// 仓库配置
const OWNER = process.env.MESSAGES_REPO_OWNER || 'vikiboss'
const REPO = process.env.MESSAGES_REPO_NAME || 'blog-messages'

/**
 * 生成 Gravatar 头像 URL
 * 使用 SHA256 哈希（Gravatar 官方推荐）
 */
export function generateAvatarUrl(email?: string): string {
  if (!email) return ''

  const qqMailPattern = /^([1-9][0-9]{4,10})@qq\.com$/i
  const qq = email.match(qqMailPattern)

  if (qq) {
    const qqNumber = qq[1] || ''
    return `https://q1.qlogo.cn/g?b=qq&nk=${qqNumber}&s=100`
  }

  // CRITICAL: Generate the SHA256 hash correctly for all Gravatar operations
  // Trim and lowercase the email - BOTH steps are required
  const normalizedEmail = email.trim().toLowerCase()
  const hash = crypto.createHash('sha256').update(normalizedEmail).digest('hex')

  return `https://gravatar.loli.net/avatar/${hash}?d=identicon&s=80`
}

/**
 * 获取作者名称（处理匿名用户）
 */
export function getAuthorName(author: MessageAuthor): string {
  return author.name?.trim() || '匿名'
}

/**
 * 获取作者头像（优先级：自定义 > Gravatar > 空字符串）
 * 返回空字符串时，渲染组件会使用文字头像（名字首字）
 */
export function getAuthorAvatar(author: MessageAuthor): string {
  if (author.avatar) return author.avatar
  if (author.email) return generateAvatarUrl(author.email)
  return '' // 返回空字符串，让组件显示文字头像
}

/**
 * 检测异常 User-Agent（机器人、爬虫等）
 */
export function isSuspiciousUA(uaString: string): boolean {
  const suspiciousPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /curl/i,
    /wget/i,
    /python/i,
    /java(?!script)/i,
    /scrapy/i,
    /axios/i,
    /postman/i,
  ]
  return suspiciousPatterns.some((pattern) => pattern.test(uaString))
}

/**
 * 创建留言（创建 GitHub Issue）
 */
export async function createMessage(
  author: MessageAuthor,
  content: string,
  ua?: string,
): Promise<number> {
  const authorName = getAuthorName(author)
  const authorAvatar = getAuthorAvatar(author)

  // 构建 Front Matter
  const frontMatterData: Record<string, unknown> = {}

  frontMatterData.name = authorName

  if (authorAvatar) frontMatterData.avatar = authorAvatar
  if (author.email) frontMatterData.email = author.email
  if (author.website) frontMatterData.website = author.website
  if (ua) frontMatterData.ua = ua

  frontMatterData.created_at = new Date().toISOString()

  // 序列化 Front Matter + 内容
  const body = matter.stringify(content, frontMatterData)

  // 生成 Issue title
  const title = `${authorName}：${truncateText(cleanMarkdownContent(content), 30)}`

  // 创建 Issue
  const { data } = await botOctokit.issues.create({
    owner: OWNER,
    repo: REPO,
    title,
    body,
    labels: ['message'],
  })

  return data.number
}

/**
 * 创建回复（创建 GitHub Issue Comment）
 */
export async function createReply(
  issueNumber: number,
  author: MessageAuthor,
  content: string,
  ua?: string,
): Promise<number> {
  const authorName = getAuthorName(author)
  const authorAvatar = getAuthorAvatar(author)

  // 构建 Front Matter
  const frontMatterData: Record<string, unknown> = {
    name: authorName,
    created_at: new Date().toISOString(),
  }

  if (authorAvatar) frontMatterData.avatar = authorAvatar
  if (author.email) frontMatterData.email = author.email
  if (author.website) frontMatterData.website = author.website
  if (ua) frontMatterData.ua = ua

  // 序列化 Front Matter + 内容
  const body = matter.stringify(content, frontMatterData)

  // 创建 Comment
  const { data } = await botOctokit.issues.createComment({
    owner: OWNER,
    repo: REPO,
    issue_number: issueNumber,
    body,
  })

  return data.id
}

/**
 * 获取留言列表
 */
export const getMessages = cache(async function getMessages(
  page = 1,
  perPage = 10,
  withReplies = false,
): Promise<{ messages: Message[]; total: number }> {
  // 使用 Search API 获取准确的总数
  const response = await botOctokit.search.issuesAndPullRequests({
    q: `repo:${OWNER}/${REPO} is:issue is:open label:message label:approved`,
    sort: 'created',
    order: 'desc',
    page,
    per_page: perPage,
  })

  const issues = response.data.items
  const total = response.data.total_count

  // 并发获取并解析留言内容
  const messages: Message[] = await Promise.all(
    issues.map(async (issue) => {
      const { data: frontMatter, content: issueContent } = matter(issue.body || '')

      const message: Message = {
        id: String(issue.number),
        author: {
          name: frontMatter.name,
          email: frontMatter.email,
          website: frontMatter.website,
          avatar: frontMatter.avatar,
        },
        content: issueContent,
        createdAt: frontMatter.created_at,
        replyCount: issue.comments,
      }

      // 可选：保存原始 UA 字符串
      if (frontMatter.ua) {
        message.ua = frontMatter.ua as string
      }

      // 可选：加载回复
      if (withReplies && issue.comments > 0) {
        message.replies = await getReplies(issue.number)
        message.replyCount = message.replies.length
      }

      return message
    }),
  )

  return { messages, total }
})

/**
 * 获取回复列表
 */
export const getReplies = cache(async function getReplies(
  issueNumber: number,
): Promise<MessageReply[]> {
  const { data: comments } = await botOctokit.issues.listComments({
    owner: OWNER,
    repo: REPO,
    issue_number: issueNumber,
  })

  return comments
    .filter((e) => (e.reactions?.['+1'] || 0) > 0)
    .map((comment) => {
      const { data: frontMatter, content: commentContent } = matter(comment.body || '')

      const reply: MessageReply = {
        id: String(comment.id),
        author: {
          name: frontMatter.name,
          email: frontMatter.email,
          website: frontMatter.website,
          avatar: frontMatter.avatar,
        },
        content: commentContent,
        createdAt: frontMatter.created_at,
      }

      // 可选：保存原始 UA 字符串
      if (frontMatter.ua) {
        reply.ua = frontMatter.ua as string
      }

      return reply
    })
})
