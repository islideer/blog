import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
  params: Promise<{
    type: string
  }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { type } = await params
  const { searchParams } = new URL(request.url)
  const idsParam = searchParams.get('ids')

  if (!idsParam) {
    return NextResponse.json({ error: 'Missing ids parameter' }, { status: 400 })
  }

  const ids = idsParam.split(',').filter(Boolean)

  if (ids.length === 0) {
    return NextResponse.json({}, { status: 200 })
  }

  try {
    // 批量查询计数
    const keys = ids.map((id) => `interaction:${type}:${id}:count`)
    const counts = (await kv.mget(...keys)) as (number | null)[]

    // 转换为 { id: count } 格式
    const result: Record<string, number> = Object.fromEntries(
      ids.map((id, index) => [id, counts[index] ?? 0]),
    )

    // 短缓存时间确保用户刷新后能看到最新数据
    return NextResponse.json(result, {
      headers: { 'Cache-Control': 'public, s-maxage=3, stale-while-revalidate=60' },
    })
  } catch (error) {
    console.error('[Interactions API] Failed to fetch counts:', error)
    // 降级：返回全 0 计数
    const fallback = Object.fromEntries(ids.map((id) => [id, 0]))
    return NextResponse.json(fallback, { status: 200 })
  }
}
