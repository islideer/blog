/**
 * 留言板 Server Actions
 * 用于表单提交和数据变更
 */

'use server'

import { kv } from '@vercel/kv'
import crypto from 'node:crypto'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { createMessage, createReply, isSuspiciousUA } from '@/lib/messages'

/**
 * 获取客户端真实 IP
 */
async function getClientIP(): Promise<string> {
  const headersList = await headers()
  const forwarded = headersList.get('x-forwarded-for')
  const realIP = headersList.get('x-real-ip')
  return forwarded?.split(',')[0] || realIP || 'unknown'
}

/**
 * IP 哈希（隐私保护）
 */
function hashIP(ip: string): string {
  return crypto.createHash('sha256').update(ip).digest('hex')
}

/**
 * 提交留言
 */
export async function submitMessage(formData: FormData) {
  try {
    // 1. 获取 User-Agent
    const headersList = await headers()
    const userAgent = headersList.get('user-agent') || ''

    // 2. 异常 UA 拦截
    if (isSuspiciousUA(userAgent)) {
      return {
        success: false,
        error: '检测到异常请求',
        message: '您的请求被识别为机器人或爬虫',
      }
    }

    // 3. IP Rate Limiting
    const ip = await getClientIP()
    const hashedIP = hashIP(ip)
    const rateLimitKey = `messages:ratelimit:${hashedIP}`

    const count = (await kv.get<number>(rateLimitKey)) ?? 0

    if (count >= 6) {
      return {
        success: false,
        error: '提交过于频繁',
        message: '你提交得太快啦，请稍后再试。（每 10 分钟最多提交 6 次）',
      }
    }

    // 4. 获取表单数据
    const name = formData.get('name')?.toString().trim()
    const email = formData.get('email')?.toString().trim()
    const website = formData.get('website')?.toString().trim()
    const content = formData.get('content')?.toString()

    // 5. 内容验证
    if (!content) {
      return {
        success: false,
        error: '内容不能为空',
        message: '请填写留言内容',
      }
    }

    if (content.length > 1000) {
      return {
        success: false,
        error: '内容过长',
        message: '留言内容不能超过 1000 字符',
      }
    }

    if (name && name.length > 50) {
      return {
        success: false,
        error: '姓名过长',
        message: '姓名不能超过 50 字符',
      }
    }

    // 邮箱格式验证
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return {
        success: false,
        error: '邮箱格式错误',
        message: '请输入有效的邮箱地址',
      }
    }

    // URL 格式验证
    if (website) {
      try {
        new URL(website)
      } catch {
        return {
          success: false,
          error: '网站地址格式错误',
          message: '请输入有效的 URL',
        }
      }
    }

    // 6. 创建留言
    const issueNumber = await createMessage(
      {
        name: name || undefined,
        email: email || undefined,
        website: website || undefined,
      },
      content,
      userAgent,
    )

    // 7. 增加 Rate Limiting 计数
    await kv.incr(rateLimitKey)
    await kv.expire(rateLimitKey, 60 * 10) // 10 分钟后过期

    // 8. 使缓存失效
    revalidatePath('/messages')

    return {
      success: true,
      data: {
        id: String(issueNumber),
        message: '留言提交成功',
      },
    }
  } catch (error) {
    console.error('Error creating message:', error)

    return {
      success: false,
      error: '服务器错误',
      message: error instanceof Error ? error.message : '未知错误',
    }
  }
}

/**
 * 提交回复
 */
export async function submitReply(formData: FormData) {
  try {
    // 1. 获取 User-Agent
    const headersList = await headers()
    const userAgent = headersList.get('user-agent') || ''

    // 2. 异常 UA 拦截
    if (isSuspiciousUA(userAgent)) {
      return {
        success: false,
        error: '检测到异常请求',
        message: '您的请求被识别为机器人或爬虫',
      }
    }

    // 3. IP Rate Limiting
    const ip = await getClientIP()
    const hashedIP = hashIP(ip)
    const rateLimitKey = `messages:ratelimit:${hashedIP}`

    const count = (await kv.get<number>(rateLimitKey)) ?? 0

    if (count >= 6) {
      return {
        success: false,
        error: '提交过于频繁',
        message: '你提交得太快啦，请稍后再试。（每 10 分钟最多提交 6 次）',
      }
    }

    // 4. 获取表单数据
    const messageId = formData.get('messageId')?.toString()
    const name = formData.get('name')?.toString().trim()
    const email = formData.get('email')?.toString().trim()
    const website = formData.get('website')?.toString().trim()
    const content = formData.get('content')?.toString()

    // 5. 验证必填字段
    if (!messageId) {
      return {
        success: false,
        error: '留言 ID 不能为空',
        message: '请提供有效的留言 ID',
      }
    }

    if (!content) {
      return {
        success: false,
        error: '内容不能为空',
        message: '请填写回复内容',
      }
    }

    if (content.length > 1000) {
      return {
        success: false,
        error: '内容过长',
        message: '回复内容不能超过 1000 字符',
      }
    }

    if (name && name.length > 50) {
      return {
        success: false,
        error: '姓名过长',
        message: '姓名不能超过 50 字符',
      }
    }

    // 邮箱格式验证
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return {
        success: false,
        error: '邮箱格式错误',
        message: '请输入有效的邮箱地址',
      }
    }

    // URL 格式验证
    if (website) {
      try {
        new URL(website)
      } catch {
        return {
          success: false,
          error: '网站地址格式错误',
          message: '请输入有效的 URL',
        }
      }
    }

    // 6. 创建回复
    const commentId = await createReply(
      Number(messageId),
      {
        name: name || undefined,
        email: email || undefined,
        website: website || undefined,
      },
      content,
      userAgent,
    )

    // 7. 增加 Rate Limiting 计数
    await kv.incr(rateLimitKey)
    await kv.expire(rateLimitKey, 60 * 10) // 10 分钟后过期

    // 8. 使缓存失效
    revalidatePath('/messages')

    return {
      success: true,
      data: {
        id: String(commentId),
        message: '回复提交成功',
      },
    }
  } catch (error) {
    console.error('Error creating reply:', error)

    return {
      success: false,
      error: '服务器错误',
      message: error instanceof Error ? error.message : '未知错误',
    }
  }
}
