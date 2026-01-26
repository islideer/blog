import { dayjs } from '@/lib/dayjs'
import { Octokit } from '@octokit/rest'
import { NextRequest, NextResponse } from 'next/server'
import { formatText } from '@/lib/text-formatter'
import { siteConfig } from '@/lib/config'
import { revalidatePath } from 'next/cache'

interface ContentItem {
  id: string
  date: string
  content: string
  images?: string[]
}

interface AddContentRequest {
  date?: string
  content?: string
  images?: string[]
}

type ContentType = 'thoughts' | 'mio-says'

// 内容类型配置
const CONTENT_CONFIG: Record<
  ContentType,
  {
    filePath: string
    displayName: string
  }
> = {
  thoughts: {
    filePath: 'data/thoughts.json',
    displayName: 'thought',
  },
  'mio-says': {
    filePath: 'data/mio-says.json',
    displayName: 'mio-say',
  },
}

// 验证 API 密钥
function verifyApiKey(req: NextRequest): boolean {
  const apiKey = req.headers.get('x-api-key')
  return apiKey === process.env.API_SECRET_KEY
}

// 验证内容类型
function isValidContentType(type: string): type is ContentType {
  return type in CONTENT_CONFIG
}

// POST /api/content/{type} - 添加新内容
export async function POST(req: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  try {
    // 验证 API 密钥
    if (!verifyApiKey(req)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 获取并验证内容类型
    const { type } = await params

    if (!isValidContentType(type)) {
      return NextResponse.json(
        {
          error: 'Invalid content type',
          message: `Content type must be one of: ${Object.keys(CONTENT_CONFIG).join(', ')}`,
        },
        { status: 400 },
      )
    }

    const config = CONTENT_CONFIG[type]
    const body: AddContentRequest = await req.json()

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

    const owner = process.env.GITHUB_OWNER || siteConfig.githubUser
    const repo = process.env.GITHUB_REPO || siteConfig.githubRepo

    // 读取现有文件
    const { data: fileData } = await octokit.repos.getContent({
      owner,
      repo,
      path: config.filePath,
    })

    if (!('content' in fileData)) {
      throw new Error('Invalid file data')
    }

    // 解析现有数据
    const fileContent = Buffer.from(fileData.content, 'base64').toString('utf-8')
    const items: ContentItem[] = JSON.parse(fileContent)

    // 创建新内容
    const newId = String(Math.max(0, ...items.map((item) => Number(item.id))) + 1)
    const newItem: ContentItem = {
      id: newId,
      date: dayjs(body.date).tz('Asia/Shanghai').format('YYYY-MM-DDTHH:mm:ssZ'),
      content: formatText(body.content?.trim() ?? ''),
    }

    // 添加图片（如果有）
    if (hasImages) {
      newItem.images = body.images
    }

    // 添加到数组开头
    items.unshift(newItem)

    // 提交到 GitHub
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: config.filePath,
      message: `chore: add ${config.displayName} #${newId} via API`,
      content: Buffer.from(JSON.stringify(items, null, 2) + '\n').toString('base64'),
      sha: fileData.sha,
      branch: 'main',
    })

    revalidatePath(`/`)
    revalidatePath(`/${type}`)

    return NextResponse.json({
      ok: true,
      type,
      id: newId,
      data: newItem,
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

// GET /api/content/{type} - 健康检查
export async function GET(req: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  // 验证 API 密钥
  if (!verifyApiKey(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 获取并验证内容类型
  const { type } = await params

  if (!isValidContentType(type)) {
    return NextResponse.json(
      {
        error: 'Invalid content type',
        message: `Content type must be one of: ${Object.keys(CONTENT_CONFIG).join(', ')}`,
      },
      { status: 400 },
    )
  }

  return NextResponse.json({
    ok: true,
    type,
    message: `Content API for ${type} is ready`,
    timestamp: new Date().toISOString(),
  })
}
