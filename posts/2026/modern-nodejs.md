---
title: '你本不需要那么多 npm 包'
date: 2026-09-28
topic: '前端'
excerpt: '你可能忽略了现代 Node.js 本身的能力，但它并没有停下发展的脚步。'
tags:
  - 'JavaScript'
  - 'Node.js'
---

我是一个极简主义开发者，崇尚简单、可预测的功能，难以忍受过度封装和不必要的复杂度。如果你也一样，那你来对地方了。

俗话说，有竞争才有进步。Deno、Bun 等 JavaScript Runtime 的兴起，一定程度上推动了 Node.js 的发展。经过了近些年的持续迭代，Node.js 已经集成了很多常用的现代化功能。

## process.loadEnvFile()

如果你只需读取常规 `.env{:.string}` 文件，不需要支持变量等复杂功能，那么你可以卸载掉 `dotenv{:.string}` 了。现在你可以直接通过 `process.loadEnvFile(){:ts}` 来读取。

```ts
import process from 'node:process'

process.loadEnvFile('.env.local') // 默认为 .env
console.log(process.env.API_KEY)
```

或者通过 CLI 参数实现。

```bash
node --env-file=./.env.local app.ts
```

也可以通过 `node:util{:.string}` 模块的 `util.parseEnv(){:ts}` 方法解析 `.env{:.string}` 文本。

```ts
import util from 'node:util'

const env = util.parseEnv('API_KEY="sk-xxxxxx"')
console.log(env.API_KEY)
```

## node:fs

`node:fs{:.string}` 是 Node.js 中负责文件操作的模块。

```ts
import fs from 'node:fs'
```

### fs/promise

`fs{:.string}` 模块提供了 `fs/promise{:.string}` 的 [subpath imports](https://nodejs.org/api/packages.html#subpath-imports)，暴露了一组异步的文件系统交互方法，再加上近期增强的现有方法和新方法，基本可以 [替代](https://e18e.dev/docs/replacements/fs-extra.html) `fs-extra{:.string}` 了。

```ts
import fsp from 'node:fs/promises'

await fsp.readFile('./data.txt')
```

### fs.exists()

什么？你说 `fs{:.string}` 没有提供 `fs.exists(){:ts}` 方法？

```ts
await fsp.access(path).then(() => true, () => false) 
```

### fs.glob()

`glob{:.string}` 是一种文件路径通配符匹配语法，常用来匹配文件名。

如果你不需要否定模式，对性能也要求不高，那内置的 `fs.glob(){:ts}` 方法完全可以替换 `globby{:.string}`, `glob{:.string}`, `fast-glob{:.string}` 等包。

```ts
for await (const entry of fsp.glob('./**/*.ts')) {
  console.log(entry)
}
```

另外，如果你需要判断某个模式是否被已知路径匹配，可以使用 `path.matchesGlob(){:ts}`，顺势将 `micromatch{:.string}`, `picomatch{:.string}` 等包也卸了。

```ts
import path from 'node:path'

path.matchesGlob('./src/app.tsx', './**/*.{j,t}s{x,}')
```

### fs.mkdir()

`mkdirp{:.string}` 和 `make-dir{:.string}` 等包支持递归新建目录，`fs.mkdir(){:ts}` 通过设置 `{ recursive: true }{:ts}` 选项也可以完美胜任这一场景。

```ts
await fsp.mkdir('./path/to/dir', { recursive: true })
```

### fs.rm()

同样的，`rimraf{:.string}` 等包的递归删除功能也不在话下。

```ts
await fsp.rm('./path/to/dir', { recursive: true, force: true })
```

## node:util

`node:util{:.string}` 模块提供了一系列实用函数来简化常见操作。

```ts
import util from 'node:util'
```

### util.types

需要判断对象类型？试试 `util.types{:ts}`，可替换 `core-util-is{:.string}` 之类的包进行类型检测。

```ts
util.types.isDate()
util.types.isMap()
util.types.isSet()
util.types.isArrayBuffer()
util.types.isAsyncFunction()
```

### util.styleText(), util.stripVTControlCharacters()

「文本染色」（添加 ANSI 样式）和「文本清洗」（移除 ANSI 转义码）是非常常见的需求，常通过 `chalk{:.string}`, `kleur{:.string}`, `ansi-colors{:.string}`, `strip-ansi{:.string}` 等包来完成。现在，你可以卸载它们了。

`util.styleText(){:ts}` 和 `util.stripVTControlCharacters(){:ts}` 可以很好的处理这个需求。

```ts
import { styleText, stripVTControlCharacters } from 'node:util'

// 应用 ANSI 样式
const text = styleText('bgGrey', styleText('italic', styleText('cyan', 'Viki')))
// 移除 ANSI 样式
const stripedText = stripVTControlCharacters(text)
```

### util.parseArgs()

如果你经常写 CLI，估计很熟悉解析参数的需求。不妨试试 `util.parseArgs(){:ts}` 方法，目前支持文本和布尔两种类型。`yargs{:.string}`, `commander{:.string}`, `minimist{:.string}`, `mri{:.string}` 等包也许就不需要了。

```ts
#!/usr/bin/env node
import util from 'node:util'

const { values, positionals } = util.parseArgs({
  args: process.argv.slice(2),
  allowPositionals: true,
  options: {
    help: { type: 'boolean', short: 'h' },
    force: { type: 'boolean', short: 'f', default: false },
    user: { type: 'string', short: 'u' },
  },
})
```

通过 `chmod +x ./cli.ts{:bash}` 赋予执行权限，执行 `./cli.ts a b c -u viki{:bash}`，结果如下。

```ts
values: { user: 'viki', force: false }
positionals: [ 'a', 'b', 'c' ]
```

### util.debounce(), util.throttle()

防抖和节流，是用来控制高频函数执行次数的常用优化手段。

现在 Node.js 拥有了自己的 `util.debounce(){:ts}` 和 `util.throttle(){:ts}`，是时候跟 `lodash{:.string}`, `throttle-debounce{:.string}` 等包说再见了。

```ts
const debouncedListener = util.debounce(eventListener)
const throttledListener = util.throttle(eventListener)
```

## node:crypto

`node:crypto{:.string}` 是 Node.js 中负责加解密相关的模块。

```ts
import crypto from 'node:crypto'
```

### crypto.randomUUID()

UUID 常用 `uuid/v4{:.string}` 和 `nanoid{:.string}` 来生成，但其实 Node.js 已经内置了。

```ts
const uuid = crypto.randomUUID()
```

### MD5

如果你还在用 `md5{:.string}`, `md5.js{:.string}` 等包在 Node.js 上计算 MD5，那你真的 OUT 了。

```ts
const md5 = (content) => crypto.createHash('md5').update(content).digest('hex')
```

但如果你的使用涉及安全敏感（比如密码），强烈建议考虑更强的算法，MD5 [并不安全](https://en.wikipedia.org/wiki/MD5#Security)。

## node:sqlite

同样的，Node.js 也拥有了自己的 SQLite Driver `node:sqlite{:.string}`，可以考虑在合适的时机淘汰 `sqlite3{:.string}`, `better-sqlite3{:.string}` 和 `@libsql/client{:.string}` 了。

```ts
import sqlite from 'node:sqlite'

const db = new sqlite.DatabaseSync(':memory:')
const statement = db.prepare('CREATE TABLE users (id INTEGER, name TEXT)')
statement.run()
```

## node:test, node:assert

Node.js 也迎来了自己的 Test Runner，简单测试不在话下。写测试前可以先评估，是否急切地需要引入 `mocha`, `jest`, `vitest` 或者 `rstest`。

```ts
import test from 'node:test'
import assert from 'node:assert/strict'

const add = (a: number, b: number): number => a + b

const fetchUser = async (id: number): Promise<{ id: number; name: string }> =>
  id > 0 ? { id, name: `user-${id}` } : Promise.reject(new Error('Invalid id'))

test('add', () => assert.equal(add(1, 2), 3))
test('deepEqual', () => assert.deepEqual({ a: 1 }, { a: 1 }))
test('async', async () => assert.equal((await fetchUser(1)).name, 'user-1'))
test('rejects', () => assert.rejects(() => fetchUser(0), /Invalid id/))
```

结果如下。

```bash
✔ add (0.474459ms)
✔ deepEqual (2.177875ms)
✔ async (0.0785ms)
✔ rejects (0.21725ms)
ℹ tests 4
ℹ suites 0
ℹ pass 4
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 6.834042
```

## node:bench

如果需要做 Benchmark，Node.js 也能胜任部分 `benchmark{:.string}` 的任务。但目前还在试验性阶段，版本要求较高且需要加上特性标志 `--experimental-bench{:.string}`。

```ts
import { suite, bench } from 'node:bench'

const add = (a: number, b: number): number => a + b

suite('math', () => {
  bench('add', (b) => {
    b.start()
    for (let i = 0; i < 10_000; i++) add(i, i + 1)
    b.end(10_000)
  })
})
```

通过 `node --experimental-bench --bench app.ts{:bash}` 执行后，结果如下。

```bash
benchmark | samples | mean rate | 95% CI | median rate | warning
add | 30 | 700.53M ops/s | [598.96M ops/s, 802.11M ops/s] | 851.04M ops/s | noisy, skewed

1 completed, 0 failed, 0 skipped
```

## node app.ts

现在 Node.js 可以直接执行 TypeScript 脚本，不需要任何标志，已正式发布在较新版本当中。

```bash
node app.ts # 已经不再需要 --experimental-transform-types 标志了
```

如果临时有代码思路，想立马写点什么，希望不会被 `typescript{:.string}`, `tsx{:.string}`, `esno{:.string}`, `ts-node{:.string}`, `bun{:.string}` 的安装流程阻挠。

## node --watch

是的，Node.js 现在也支持监听模式，`nodemon{:.string}`, `node-dev{:.string}`, `ts-node-dev{:.string}` 可以往后稍稍了。

```bash
node --watch app.ts # 监听 app.ts 的改动，并自动重新执行
```

## fetch()

原生 `fetch(){:ts}` 已全局可用，如果不需要拦截器、重试策略或自动重试，`axios{:.string}`, `node-fetch{:.string}` 可以干掉了，或者考虑 `ofetch{:.string}`, `ky{:.string}`, `got{:.string}` 等现代库。

```ts
const response = await (await fetch('https://example.com')).json()
```

## WebSocket

属于 Web 规范，客户端在 Node.js 里已经内置了，无需 `ws{:.string}` 包，但服务端仍然需要安装。

```ts
const ws = new WebSocket('wss://example.com?access_key=xxx')
```

## URLPattern

属于 Web 规范，解析 URL 的方案，Node.js 跟进了，不再需要 `url-pattern{:.string}` 等包。

```ts
const pattern = new URLPattern({ pathname: '/users/:id' })
const match = pattern.exec('/users/42')
console.log(match?.pathname.groups.id) // 42
```

## URLSearchParams

属于 Web 规范，Node.js 已支持，不再需要 `qs{:.string}`, `querystring{:.string}`, `query-string{:.string}` 等包。

```ts
const qs = `?a=1&a=2&b=3`

const params = new URLSearchParams(qs)
const obj = Object.fromEntries(params)

console.log(obj.b) // 3
console.log(params.getAll('a')) // [ '1', '2' ]
```

## Date, Intl, Temporal

原生的 `Date{:.string}`, `Intl{:.string}` 和 `Temporal{:.string}` 已足够强大，如果用例简单，可以考虑移除 `dayjs{:.string}`, `moment{:.string}`, `date-fns{:.string}` 等包。

```ts
const formatted = new Date().toISOString().split('T')[0] // 2026-09-28

const localized = new Intl.DateTimeFormat('en-US', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric'
}).format(new Date()) // September 28, 2026

Temporal.Now.plainDateISO().toString() // 2026-09-28
Temporal.Now.plainDateISO().add({ days: 1 }) // 2026-09-29
```

## Base64

Node.js 已支持 `Buffer{:ts}` 类，以及 `atob(){:ts}` 和 `btoa(){:ts}` 方法。可以考虑移除 `js-base64{:.string}`, `atob-polyfill{:.string}` 等包，但请注意 `atob(){:ts}` 和 `atob(){:ts}` 在处理 Unicode 上的 [局限性](https://developer.mozilla.org/zh-CN/docs/Glossary/Base64#unicode_%E9%97%AE%E9%A2%98)。

```ts
Buffer.from('hello', 'utf8').toString('base64') // aGVsbG8=
Buffer.from('aGVsbG8=', 'base64').toString('utf8') // hello

btoa('hello') // aGVsbG8=
atob('aGVsbG8=') // hello
```

## SEA (Single Executable Application)

Node.js 现在也可以将代码打包为一个单文件可执行应用程序了。在 `ncc{:.string}`, `pkg{:.string}`, `nexe{:.string}` 等传统方案和 `bun build --compile{:bash}`, `deno compile{:bash}` 等现代方案之外，提供多了更多选择。

```bash
node --build-sea sea.config.json
```

需要 SEA 配置文件 `sea.config.json{:.string}`，示例内容如下。

```json
{ 
  "main": "main.mjs", 
  "mainFormat": "module", 
  "output": "main"
}
```

## 声明

本文所列建议只针对架构简单、需求单一、不考虑兼容性的项目和应用。对于大型复杂项目来说，成熟、经过考验的 npm 包仍然是不错的选择。毕竟这些老牌包在功能丰富度、边界场景、版本兼容性等方面依旧遥遥领先。

## 参考

- [15 Recent Node.js Features that Replace Popular npm Packages](https://nodesource.com/blog/nodejs-features-replacing-npm-packages)
- [Node.js built-ins that replaced npm packages](https://flaviocopes.com/node-builtins)
- [List of Module Replacements](https://e18e.dev/docs/replacements)
