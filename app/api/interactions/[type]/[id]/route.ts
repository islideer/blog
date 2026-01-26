import crypto from 'node:crypto'
import { kv } from '@vercel/kv'
import { getInteractionConfig } from '@/lib/interactions'
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

interface RouteParams {
  params: Promise<{
    type: string
    id: string
  }>
}

// 获取客户端 IP
function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }

  return 'unknown'
}

// 哈希 IP（保护隐私）
function hashIP(ip: string): string {
  return crypto.createHash('sha256').update(ip).digest('hex')
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const { type, id } = await params

  // 验证类型是否启用
  const config = getInteractionConfig(type)
  if (!config) {
    return NextResponse.json({ error: 'Invalid or disabled interaction type' }, { status: 400 })
  }

  const maxClicksPerDay = config.maxClicksPerDay ?? 1

  // 获取请求体中的批量点击数（默认为 1）
  let clickCount = 1
  try {
    const body = await request.json()
    if (body.count && typeof body.count === 'number' && body.count > 0) {
      clickCount = Math.floor(body.count)
    }
  } catch {
    // 如果没有 body 或解析失败，使用默认值 1
  }

  // 获取并哈希 IP
  const ip = getClientIP(request)
  const hashedIP = hashIP(ip)

  try {
    // 检查今天的点击次数
    const ipCountKey = `interaction:${type}:${id}:ip:${hashedIP}:count`
    const userClickCount = (await kv.get<number>(ipCountKey)) ?? 0

    // 检查是否已达到限制
    if (userClickCount >= maxClicksPerDay) {
      // 获取当前总计数
      const countKey = `interaction:${type}:${id}:count`
      const currentCount = (await kv.get<number>(countKey)) ?? 0

      return NextResponse.json(
        {
          ok: false,
          error: 'Daily limit reached',
          count: currentCount,
          userClickCount,
        },
        { status: 429 },
      )
    }

    // 计算实际可以增加的次数（不能超过剩余次数）
    const remainingClicks = maxClicksPerDay - userClickCount
    const actualClickCount = Math.min(clickCount, remainingClicks)

    // 批量原子性自增总计数
    const countKey = `interaction:${type}:${id}:count`
    const newCount = await kv.incrby(countKey, actualClickCount)

    // 触发路径重新验证以更新缓存
    revalidatePath(`/interactions/${type}`)

    // 批量自增用户点击次数
    const newUserClickCount = await kv.incrby(ipCountKey, actualClickCount)

    // 设置过期时间（当天 23:59:59）
    const tomorrow = new Date()
    tomorrow.setHours(23, 59, 59, 999)
    const expiresAt = Math.floor(tomorrow.getTime() / 1000)

    await kv.expireat(ipCountKey, expiresAt)

    return NextResponse.json({
      ok: true,
      count: newCount,
      userClickCount: newUserClickCount,
      actualClickCount, // 返回实际增加的次数
    })
  } catch (error) {
    console.error('[Interactions API] Failed to process click:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
