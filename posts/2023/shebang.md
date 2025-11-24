---
title: '什么是 Shebang (或 hashbang)'
date: 2023-03-14
excerpt: 'Shebang，也称为 hashbang 或 sha-bang，是一种在 Unix、Linux 和其他类 Unix 系统上...'
---

Shebang，也称为 hashbang 或 sha-bang，是一种在 Unix、Linux 和其他类 Unix 系统上的脚本中使用的特殊字符序列。它的作用是指定脚本应该由哪个解释器来解释执行。

Shebang 由两个字符组成：一个井号（`#`）和一个惊叹号（`!`）。它们通常出现在脚本文件的第一行，并在两个字符之间没有空格。在这个字符序列之后，紧接着是一个解释器的路径，用于指定脚本应该由哪个解释器来解释执行。

例如，下面使用 Shebang 的 Bash 脚本：

```bash
#!/bin/bash

echo "Hello, world!"
```

在上面的例子中，第一行 `#!/bin/bash` 指定了脚本应该由 Bash 解释器来解释执行。当你在命令行上执行这个脚本时，操作系统会读取这个特殊字符序列，然后启动 Bash 解释器，并将脚本作为参数传递给它。

Shebang 的使用不仅限于 Bash 脚本，它可以用于任何类型的脚本文件，只要在特定的操作系统上有相应的解释器。例如，Python 脚本的 Shebang 应该为 `#!/usr/bin/python` 或 `#!/usr/bin/env python`。

在 Windows 系统上，Shebang 的使用可能不受支持或表现不同，因为 Windows 系统通常会使用文件扩展名来确定脚本应该由哪个程序来解释执行。

## Shebang 和 Hashbang 有什么区别？

在 Unix、Linux 和类 Unix 系统上，Shebang 是最常用的术语，但在某些情况下，人们也称之为 Hashbang。事实上，Hashbang 一词通常是指由井号和惊叹号组成的字符序列，而 Shebang 更加特定，指的是用于指定脚本应该由哪个解释器来解释执行的字符序列。所以，在 Unix 和类 Unix 系统中，Shebang 是更加准确和常用的术语。

## 常见的 Shebang 有哪些？

以下是一些常见的 Shebang 的例子，它们用于指定各种类型的脚本文件应该由哪个解释器来解释执行：

- Bash 脚本：`#!/bin/bash`
- Python 2.x 脚本：`#!/usr/bin/python`
- Python 3.x 脚本：`#!/usr/bin/python3`
- Perl 脚本：`#!/usr/bin/perl`
- Ruby 脚本：`#!/usr/bin/ruby`
- Node.js 脚本：`#!/usr/bin/node`
- PHP 脚本：`#!/usr/bin/php`
- Shell 脚本：`#!/bin/sh`

这些 Shebang 的例子假定相关的解释器已经正确地安装在系统中，并且解释器的可执行文件位于指定的路径中。在不同的系统上，这些解释器的路径可能会有所不同，可以根据实际情况进行相应的调整。

## 为什么还有 #!/usr/bin/env node 的形式？

使用 `#!/usr/bin/env node` Shebang 的好处是，它可以自动找到在 PATH 环境变量中第一个可用的 Node.js 解释器，并使用它来解释执行脚本。这种做法有几个优点：

- 跨平台兼容性：由于不同的操作系统可能会将 Node.js 解释器安装在不同的位置，使用 `#!/usr/bin/env node` 能够确保脚本可以在不同的操作系统上正确地运行。

- 简化部署：使用 `#!/usr/bin/env node` 能够避免在部署时手动更改 Shebang 中的路径，因为它会自动找到可用的 Node.js 解释器。

- 简化开发：在开发过程中，使用 `#!/usr/bin/env node` 能够确保脚本在不同的开发环境中正确地运行，因为不同的开发环境可能会安装不同版本的 Node.js 解释器。

需要注意的是，在使用 `#!/usr/bin/env node` Shebang 时，确保系统中 PATH 环境变量中包含了正确的 Node.js 可执行文件路径，否则脚本将无法正确解释执行。

> 本篇文章正文部分内容主要由 [ChatGPT](https://chat.openai.com/chat) 润色生成。
