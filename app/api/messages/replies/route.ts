/**
 * 回复 API 路由
 * POST: 提交新回复
 */

import { kv } from '@vercel/kv'
import crypto from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createReply, isSuspiciousUA } from '@/lib/messages-github'

import type { CreateReplyRequest, ApiResponse } from '@/lib/messages'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * 获取客户端真实 IP
 */
function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  const realIP = req.headers.get('x-real-ip')
  return forwarded?.split(',')[0] || realIP || 'unknown'
}

/**
 * IP 哈希（隐私保护）
 */
function hashIP(ip: string): string {
  return crypto.createHash('sha256').update(ip).digest('hex')
}

/**
 * POST /api/messages/replies
 * 提交新回复
 */
export async function POST(req: NextRequest) {
  try {
    // 1. 获取 User-Agent
    const userAgent = req.headers.get('user-agent') || ''

    // 2. 异常 UA 拦截
    if (isSuspiciousUA(userAgent)) {
      return NextResponse.json<ApiResponse>(
        {
          ok: false,
          error: '检测到异常请求',
          message: '您的请求被识别为机器人或爬虫',
        },
        { status: 403 },
      )
    }

    // 3. IP Rate Limiting
    const ip = getClientIP(req)
    const hashedIP = hashIP(ip)
    const rateLimitKey = `messages:ratelimit:${hashedIP}`

    const count = (await kv.get<number>(rateLimitKey)) ?? 0

    if (count >= 3) {
      return NextResponse.json<ApiResponse>(
        {
          ok: false,
          error: '提交过于频繁',
          message: '您 10 分钟内已提交 3 条留言，请稍后再试',
        },
        { status: 429 },
      )
    }

    // 4. 解析请求体
    const body: CreateReplyRequest = await req.json()

    // 5. 内容验证
    const { messageId, name, email, website, avatar, content } = body

    if (!messageId || messageId.trim() === '') {
      return NextResponse.json<ApiResponse>(
        {
          ok: false,
          error: '留言 ID 不能为空',
          message: '请提供有效的留言 ID',
        },
        { status: 400 },
      )
    }

    if (!content || content.trim() === '') {
      return NextResponse.json<ApiResponse>(
        {
          ok: false,
          error: '内容不能为空',
          message: '请填写回复内容',
        },
        { status: 400 },
      )
    }

    if (content.length > 1000) {
      return NextResponse.json<ApiResponse>(
        {
          ok: false,
          error: '内容过长',
          message: '回复内容不能超过 1000 字符',
        },
        { status: 400 },
      )
    }

    if (name && name.length > 50) {
      return NextResponse.json<ApiResponse>(
        {
          ok: false,
          error: '姓名过长',
          message: '姓名不能超过 50 字符',
        },
        { status: 400 },
      )
    }

    // 邮箱格式验证
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json<ApiResponse>(
        {
          ok: false,
          error: '邮箱格式错误',
          message: '请输入有效的邮箱地址',
        },
        { status: 400 },
      )
    }

    // URL 格式验证
    if (website) {
      try {
        new URL(website)
      } catch {
        return NextResponse.json<ApiResponse>(
          {
            ok: false,
            error: '网站地址格式错误',
            message: '请输入有效的 URL',
          },
          { status: 400 },
        )
      }
    }

    if (avatar) {
      try {
        new URL(avatar)
      } catch {
        return NextResponse.json<ApiResponse>(
          {
            ok: false,
            error: '头像地址格式错误',
            message: '请输入有效的 URL',
          },
          { status: 400 },
        )
      }
    }

    // 6. 创建回复（传递原始 UA 字符串）
    const commentId = await createReply(
      Number(messageId),
      {
        name,
        email,
        website,
        avatar,
      },
      content,
      userAgent,
    )

    // 7. 使留言板缓存失效
    revalidatePath('/messages')

    // 8. 增加 Rate Limiting 计数
    await kv.incr(rateLimitKey)
    await kv.expire(rateLimitKey, 60 * 10) // 10 分钟后过期

    // 9. 返回成功
    return NextResponse.json<ApiResponse>(
      {
        ok: true,
        data: {
          id: String(commentId),
          message: '回复提交成功',
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Error creating reply:', error)

    return NextResponse.json<ApiResponse>(
      {
        ok: false,
        error: '服务器错误',
        message: error instanceof Error ? error.message : '未知错误',
      },
      { status: 500 },
    )
  }
}
