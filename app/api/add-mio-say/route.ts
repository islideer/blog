import { dayjs } from '@/lib/dayjs'
import { Octokit } from '@octokit/rest'
import { NextRequest, NextResponse } from 'next/server'
import { formatText } from '@/lib/text-formatter'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

interface MioSay {
  id: string
  date: string
  content: string
  images?: string[]
}

interface AddMioSayRequest {
  date?: string
  content?: string
  images?: string[]
}

// 验证 API 密钥
function verifyApiKey(req: NextRequest): boolean {
  const apiKey = req.headers.get('x-api-key')
  return apiKey === process.env.API_SECRET_KEY
}

export async function POST(req: NextRequest) {
  try {
    // 验证请求
    if (!verifyApiKey(req)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body: AddMioSayRequest = await req.json()

    // 验证内容：至少要有文本或图片之一
    const hasContent = body.content && body.content.trim() !== ''
    const hasImages = body.images && body.images.length > 0

    if (!hasContent && !hasImages) {
      return NextResponse.json(
        { error: 'Content or images is required. At least one must be provided.' },
        { status: 400 },
      )
    }

    // 初始化 Octokit
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    })

    const owner = process.env.GITHUB_OWNER || 'vikiboss'
    const repo = process.env.GITHUB_REPO || 'blog'

    // 读取现有 mio-says.json
    const { data: fileData } = await octokit.repos.getContent({
      owner,
      repo,
      path: 'data/mio-says.json',
    })

    if (!('content' in fileData)) {
      throw new Error('Invalid file data')
    }

    // 解析现有数据
    const fileContent = Buffer.from(fileData.content, 'base64').toString('utf-8')
    const mioSays: MioSay[] = JSON.parse(fileContent)

    // 创建新 mio-say
    const newId = String(Math.max(0, ...mioSays.map((m) => Number(m.id))) + 1)
    const newMioSay: MioSay = {
      id: newId,
      date: dayjs(body.date).tz('Asia/Shanghai').format('YYYY-MM-DDTHH:mm:ssZ'),
      content: formatText(body.content?.trim() ?? ''),
    }

    // 添加图片（如果有）
    if (hasImages) {
      newMioSay.images = body.images
    }

    // 添加到数组开头
    mioSays.unshift(newMioSay)

    // 提交到 GitHub
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: 'data/mio-says.json',
      message: `chore: add mio-say #${newId} via API`,
      content: Buffer.from(JSON.stringify(mioSays, null, 2) + '\n').toString('base64'),
      sha: fileData.sha,
      branch: 'main',
    })

    return NextResponse.json({
      ok: true,
      id: newId,
      mioSay: newMioSay,
    })
  } catch (error) {
    console.error('Error processing request:', error)

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}

// 健康检查
export async function GET(req: NextRequest) {
  if (!verifyApiKey(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({
    ok: true,
    message: 'Add mio-say API is ready',
    timestamp: new Date().toISOString(),
  })
}
