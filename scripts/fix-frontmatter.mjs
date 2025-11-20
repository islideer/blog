import { readdir, readFile, writeFile } from 'fs/promises'
import { join, basename } from 'path'

async function getAllMarkdownFiles(dir, baseDir = dir) {
  const files = []
  const entries = await readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)

    if (entry.isDirectory()) {
      const subFiles = await getAllMarkdownFiles(fullPath, baseDir)
      files.push(...subFiles)
    } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
      files.push(fullPath)
    }
  }

  return files
}

function formatDate(dateValue) {
  // 如果已经是 YYYY-MM-DD 格式，直接返回
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
    return dateValue
  }

  // 尝试解析日期
  try {
    const date = new Date(dateValue)
    if (!isNaN(date.getTime())) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }
  } catch {
    // 解析失败，返回原值
  }

  return dateValue
}

function fixFrontmatter(fileContent) {
  // 提取 frontmatter 和 content
  const frontmatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---\n\n([\s\S]*)$/)
  if (!frontmatterMatch) {
    return fileContent
  }

  const [, originalFrontmatter, content] = frontmatterMatch
  const lines = originalFrontmatter.split('\n')
  const fixedLines = []

  for (const line of lines) {
    // 空行和注释保持原样
    if (!line.trim() || line.trim().startsWith('#')) {
      fixedLines.push(line)
      continue
    }

    // 匹配 key: value 格式
    const match = line.match(/^(\w+):\s*(.*)$/)
    if (match) {
      const [, key, rawValue] = match
      let value = rawValue.trim()

      // 移除已有的引号
      if (
        (value.startsWith("'") && value.endsWith("'")) ||
        (value.startsWith('"') && value.endsWith('"'))
      ) {
        value = value.slice(1, -1)
      }

      // 如果是 date 字段，转换为 YYYY-MM-DD 格式
      if (key === 'date') {
        value = formatDate(value)
        fixedLines.push(`${key}: ${value}`)
        continue
      }

      // 布尔值不需要引号
      if (value === 'true' || value === 'false') {
        fixedLines.push(`${key}: ${value}`)
        continue
      }

      // 纯数字不需要引号
      if (!isNaN(Number(value)) && value !== '') {
        fixedLines.push(`${key}: ${value}`)
        continue
      }

      // 数组格式保持原样
      if (value.startsWith('[') && value.endsWith(']')) {
        fixedLines.push(`${key}: ${value}`)
        continue
      }

      // 其他字符串需要单引号
      // 转义字符串中已有的单引号
      const escapedValue = value.replace(/'/g, "''")
      fixedLines.push(`${key}: '${escapedValue}'`)
    } else {
      fixedLines.push(line)
    }
  }

  return '---\n' + fixedLines.join('\n') + '\n---\n\n' + content
}

async function main() {
  const postsDir = join(process.cwd(), 'posts')
  const files = await getAllMarkdownFiles(postsDir)

  console.log(`Found ${files.length} markdown files`)

  let processedCount = 0

  for (const file of files) {
    try {
      const content = await readFile(file, 'utf8')
      const fixed = fixFrontmatter(content)

      await writeFile(file, fixed, 'utf8')
      processedCount++
      console.log(`✓ Fixed: ${basename(file)}`)
    } catch (error) {
      console.error(`✗ Error processing ${basename(file)}:`, error.message)
    }
  }

  console.log(`\nProcessed ${processedCount} / ${files.length} files`)
}

main().catch(console.error)
