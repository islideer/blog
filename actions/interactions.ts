/**
 * 互动系统 Server Actions
 * 处理点击、点赞等互动操作
 */

'use server'

import crypto from 'node:crypto'
import { kv } from '@vercel/kv'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { getInteractionConfig } from '@/lib/interactions'

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
 * 提交互动（点击、点赞等）
 *
 * @param type - 互动类型（thoughts, mio-says, posts）
 * @param id - 资源 ID
 * @param count - 点击次数（批量点击）
 * @returns 操作结果和最新计数
 */
export async function submitInteraction(
  type: string,
  id: string,
  count: number = 1,
  revalidatePagePath?: string,
) {
  // 验证类型是否启用
  const config = getInteractionConfig(type)
  if (!config) {
    return {
      ok: false,
      error: 'Invalid or disabled interaction type',
      count: 0,
      userClickCount: 0,
    }
  }

  const maxClicksPerDay = config.maxClicksPerDay ?? 1

  // 验证点击次数
  const clickCount = Math.max(1, Math.floor(count))

  // 获取并哈希 IP
  const ip = await getClientIP()
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

      return {
        ok: false,
        error: '点击次数已达上限',
        message: `你今天的${config.displayName}次数已用完，请明天再来哦！`,
        count: currentCount,
        userClickCount,
      }
    }

    // 计算实际可以增加的次数（不能超过剩余次数）
    const remainingClicks = maxClicksPerDay - userClickCount
    const actualClickCount = Math.min(clickCount, remainingClicks)

    // 批量原子性自增总计数
    const countKey = `interaction:${type}:${id}:count`
    const newCount = await kv.incrby(countKey, actualClickCount)

    // 批量自增用户点击次数
    const newUserClickCount = await kv.incrby(ipCountKey, actualClickCount)

    // 设置过期时间（当天 23:59:59）
    const tomorrow = new Date()
    tomorrow.setHours(23, 59, 59, 999)
    const expiresAt = Math.floor(tomorrow.getTime() / 1000)
    await kv.expireat(ipCountKey, expiresAt)

    // 触发路径重新验证以更新缓存
    if (revalidatePagePath) {
      revalidatePath(revalidatePagePath)
    }

    return {
      ok: true,
      count: newCount,
      userClickCount: newUserClickCount,
      actualClickCount, // 返回实际增加的次数
    }
  } catch (error) {
    console.error('[Interactions Action] Failed to process click:', error)
    return {
      ok: false,
      error: '服务器错误',
      count: 0,
      userClickCount: 0,
    }
  }
}
