/**
 * 留言 API 路由
 * GET: 获取留言列表
 * POST: 提交新留言
 */

import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { kv } from '@vercel/kv'
import crypto from 'node:crypto'
import { createMessage, getMessages, isSuspiciousUA } from '@/lib/messages-github'
import type { CreateMessageRequest, ApiResponse, GetMessagesResponse } from '@/lib/messages'

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
 * GET /api/messages/messages
 * 获取留言列表
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = Number(searchParams.get('page')) || 1
    const perPage = Number(searchParams.get('per_page')) || 10
    const withReplies = searchParams.get('with_replies') === 'true'

    // 参数验证
    if (page < 1 || perPage < 1 || perPage > 50) {
      return NextResponse.json<ApiResponse>(
        {
          ok: false,
          error: '参数错误',
          message: 'page 必须 >= 1, per_page 必须在 1-50 之间',
        },
        { status: 400 },
      )
    }

    // 获取留言
    const { messages, total } = await getMessages(page, perPage, withReplies)

    const response: ApiResponse<GetMessagesResponse> = {
      ok: true,
      data: {
        messages,
        total,
        page,
        perPage,
      },
    }

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 's-maxage=3, stale-while-revalidate=60',
      },
    })
  } catch (error) {
    console.error('Error fetching messages:', error)

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

/**
 * POST /api/messages/messages
 * 提交新留言
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
          message: '您今天已提交 3 条留言，请 1 小时后再试',
        },
        { status: 429 },
      )
    }

    // 4. 解析请求体
    const body: CreateMessageRequest = await req.json()

    // 5. 内容验证
    const { name, email, website, avatar, content } = body

    if (!content || content.trim() === '') {
      return NextResponse.json<ApiResponse>(
        {
          ok: false,
          error: '内容不能为空',
          message: '请填写留言内容',
        },
        { status: 400 },
      )
    }

    if (content.length > 1000) {
      return NextResponse.json<ApiResponse>(
        {
          ok: false,
          error: '内容过长',
          message: '留言内容不能超过 1000 字符',
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

    // 6. 创建留言（传递原始 UA 字符串）
    const issueNumber = await createMessage(
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
    await kv.expire(rateLimitKey, 3600) // 1 小时后过期

    // 9. 返回成功
    return NextResponse.json<ApiResponse>(
      {
        ok: true,
        data: {
          id: String(issueNumber),
          message: '留言提交成功',
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Error creating message:', error)

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
