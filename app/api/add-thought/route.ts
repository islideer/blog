import dayjs from 'dayjs'
import { Octokit } from '@octokit/rest'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

interface Thought {
  id: string
  date: string
  content: string
  images?: string[]
}

interface AddThoughtRequest {
  content: string
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

    const body: AddThoughtRequest = await req.json()

    // 验证内容
    if (!body.content || body.content.trim() === '') {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    // 初始化 Octokit
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    })

    const owner = process.env.GITHUB_OWNER || 'vikiboss'
    const repo = process.env.GITHUB_REPO || 'blog'

    // 读取现有 thoughts.json
    const { data: fileData } = await octokit.repos.getContent({
      owner,
      repo,
      path: 'data/thoughts.json',
    })

    if (!('content' in fileData)) {
      throw new Error('Invalid file data')
    }

    // 解析现有数据
    const fileContent = Buffer.from(fileData.content, 'base64').toString('utf-8')
    const thoughts: Thought[] = JSON.parse(fileContent)

    // 创建新 thought
    const newId = String(Math.max(0, ...thoughts.map((t) => Number(t.id))) + 1)
    const newThought: Thought = {
      id: newId,
      date: dayjs().format('YYYY-MM-DDTHH:mm:ssZ'),
      content: body.content.trim(),
    }

    // 添加图片（如果有）
    if (body.images && body.images.length > 0) {
      newThought.images = body.images
    }

    // 添加到数组开头
    thoughts.unshift(newThought)

    // 提交到 GitHub
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: 'data/thoughts.json',
      message: `chore: add thought #${newId} via API`,
      content: Buffer.from(JSON.stringify(thoughts, null, 2) + '\n').toString('base64'),
      sha: fileData.sha,
      branch: 'main',
    })

    return NextResponse.json({
      ok: true,
      id: newId,
      thought: newThought,
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
    message: 'Add thought API is ready',
    timestamp: new Date().toISOString(),
  })
}
