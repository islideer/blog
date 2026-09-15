/// <reference types="node" />

import fs from 'node:fs/promises'
import path from 'node:path'

const POSTS_DIRECTORY = path.join(process.cwd(), 'posts')
const OUTPUT_DIRECTORY = path.join(process.cwd(), 'temp')
const HOSTS = new Set(['file.viki.moe', 'image.viki.moe'])
const URL_PATTERN = /https?:\/\/(?:file|image)\.viki\.moe(?:\/[^\s<>"']*)?/g
const DEFAULT_CONCURRENCY = 6
const MAX_RETRIES = 2

interface Options {
  concurrency: number
  force: boolean
}

interface Resource {
  url: string
  outputPath: string
}

function parseOptions(): Options {
  const args = process.argv.slice(2)
  const concurrencyArgument = args.find((arg) => arg.startsWith('--concurrency='))
  const parsedConcurrency = concurrencyArgument
    ? Number.parseInt(concurrencyArgument.slice('--concurrency='.length), 10)
    : DEFAULT_CONCURRENCY

  if (!Number.isInteger(parsedConcurrency) || parsedConcurrency < 1) {
    throw new Error('--concurrency must be a positive integer')
  }

  return {
    concurrency: parsedConcurrency,
    force: args.includes('--force'),
  }
}

async function findMarkdownFiles(directory: string): Promise<string[]> {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      files.push(...(await findMarkdownFiles(entryPath)))
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(entryPath)
    }
  }

  return files
}

function cleanUrlCandidate(candidate: string): string {
  return candidate.replace(/[),.;:!?]+$/, '')
}

function getResource(urlString: string): Resource | null {
  let url: URL

  try {
    url = new URL(cleanUrlCandidate(urlString))
  } catch {
    return null
  }

  if (!HOSTS.has(url.hostname) || !url.pathname || url.pathname === '/') {
    return null
  }

  const relativePath = decodeURIComponent(url.pathname.slice(1))
  const outputPath = path.resolve(OUTPUT_DIRECTORY, relativePath)
  const outputRoot = `${path.resolve(OUTPUT_DIRECTORY)}${path.sep}`

  // Keep encoded or malicious paths from escaping ./temp.
  if (!outputPath.startsWith(outputRoot)) {
    return null
  }

  return {
    url: url.toString(),
    outputPath,
  }
}

async function collectResources(files: string[]): Promise<Resource[]> {
  const resources = new Map<string, Resource>()

  for (const file of files) {
    const content = await fs.readFile(file, 'utf8')

    for (const match of content.matchAll(URL_PATTERN)) {
      const resource = getResource(match[0])

      if (resource) {
        resources.set(resource.outputPath, resource)
      }
    }
  }

  return [...resources.values()].sort((a, b) => a.outputPath.localeCompare(b.outputPath))
}

async function download(resource: Resource, force: boolean): Promise<'downloaded' | 'skipped'> {
  if (!force) {
    try {
      await fs.access(resource.outputPath)
      return 'skipped'
    } catch {
      // The resource does not exist yet.
    }
  }

  await fs.mkdir(path.dirname(resource.outputPath), { recursive: true })

  let lastError: unknown

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const response = await fetch(resource.url)

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }

      const temporaryPath = `${resource.outputPath}.download`
      await fs.writeFile(temporaryPath, Buffer.from(await response.arrayBuffer()))
      await fs.rename(temporaryPath, resource.outputPath)
      return 'downloaded'
    } catch (error) {
      lastError = error

      if (attempt < MAX_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)))
      }
    }
  }

  throw new Error(`${resource.url}: ${lastError instanceof Error ? lastError.message : String(lastError)}`)
}

async function run() {
  const options = parseOptions()
  const files = await findMarkdownFiles(POSTS_DIRECTORY)
  const resources = await collectResources(files)
  let nextIndex = 0
  let downloadedCount = 0
  let skippedCount = 0
  const failures: string[] = []

  async function worker() {
    while (nextIndex < resources.length) {
      const resource = resources[nextIndex]
      nextIndex += 1

      try {
        const result = await download(resource, options.force)

        if (result === 'downloaded') {
          downloadedCount += 1
          console.log(`Downloaded ${path.relative(process.cwd(), resource.outputPath)}`)
        } else {
          skippedCount += 1
          console.log(`Skipped ${path.relative(process.cwd(), resource.outputPath)}`)
        }
      } catch (error) {
        failures.push(error instanceof Error ? error.message : String(error))
        console.error(`Failed ${resource.url}`)
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(options.concurrency, resources.length) }, () => worker()),
  )

  console.log(
    `Finished: ${downloadedCount} downloaded, ${skippedCount} skipped, ${failures.length} failed (${resources.length} total)`,
  )

  if (failures.length > 0) {
    console.error(failures.join('\n'))
    process.exitCode = 1
  }
}

run().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
