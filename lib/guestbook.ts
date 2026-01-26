/**
 * 留言板类型定义
 * Guestbook Type Definitions
 */

/** 留言作者信息 */
export interface GuestbookAuthor {
  name?: string // 可选，默认 "匿名"
  email?: string // 可选
  website?: string // 可选
  avatar?: string // 可选，默认基于 email 的 Gravatar
}

/** 留言主体 */
export interface GuestbookMessage {
  id: string // Issue number
  author: GuestbookAuthor
  content: string // Markdown 内容（必填）
  createdAt: string // ISO 8601
  replyCount: number
  ua?: string // 原始 User-Agent 字符串（渲染时解析）
  replies?: GuestbookReply[] // 回复列表（可选加载）
}

/** 回复 */
export interface GuestbookReply {
  id: string // Comment ID
  author: GuestbookAuthor
  content: string // Markdown 内容
  createdAt: string // ISO 8601
  ua?: string // 原始 User-Agent 字符串（渲染时解析）
}

/** 留言列表响应 */
export interface GetMessagesResponse {
  messages: GuestbookMessage[]
  total: number
  page: number
  perPage: number
}

/** 创建留言请求 */
export interface CreateMessageRequest {
  name?: string
  email?: string
  website?: string
  avatar?: string
  content: string
}

/** 创建回复请求 */
export interface CreateReplyRequest {
  messageId: string
  name?: string
  email?: string
  website?: string
  avatar?: string
  content: string
}

/** API 响应 */
export interface ApiResponse<T = unknown> {
  ok: boolean
  data?: T
  error?: string
  message?: string
}
