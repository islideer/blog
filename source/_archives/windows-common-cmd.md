---
layout: post
title: Windows命令行基础知识
date: 2019-12-18
top_image: https://i.loli.net/2020/11/21/Q7DG9uSYmPJXov8.jpg
excerpt: 总结了Windows命令行下的基本常识和常用命令，便于日后翻阅
---

使用 `help` + `命令名` 命令可以查看对应命令的详细用法

> 如: `help dir` 可以查看 dir 命令的详细用法

## 1. 切换路径:

1. `d:` 或 `c:` 切换到到对应盘的根目录
2. `cd D:\downloads ` 切换到 D 盘下的 downloads 目录
3. `cd demo` 切换到当前路径下的 demo 文件夹
4. `cd ..` 回退到上一目录
5. `cd ..\demo` 切换到上一目录的 demo 文件夹
6. `cd \` 或 `cd /` 回退到当前所在盘的根目录

## 2. 文件/文件夹操作:

1. `dir` 列出当前路径下的文件和文件夹
2. `mkdir demo` 在当前路径下新建名为 demo 的文件夹
3. `copy demo1.md demo2.md` 将当前路径下 demo1.md 拷贝并命名为 demo2.md
4. `copy demo1.md demo` 将当前路径下 demo1.md 拷贝到当前路径下的 demo 文件夹中
5. `del demo.md` 删除当前路径下名为 demo.md 的文件且不能在回收站恢复
6. `del demo` 删除当前路径下名为 demo 的文件夹下的所有文件（不会删除 demo 文件夹下的文件夹）
7. `rd demo` 删除当前路径下名为 demo 的空文件夹
8. `move demo.md demo` 将当前路径下的 demo.md 文件移动到当前路径下的 demo 文件夹 (同时也可用来改文件名)
9. `del *.* /s /q /f ` 静默删除当前路径下的所有文件及文件夹且无法恢复（慎用，我在尝试的时候就错把桌面文件全删没了 QAQ）

## 3. 有趣的命令

```bash
# 生成指定大小的空文件
fsutil file createnew demo.txt 524288000

# 生成空文件
"" > README.md
copy nul > file.txt
```

## PS:

1. Win10 可以在文件夹空白处按住 `shift` ，再单击鼠标右键选择在此目录打开 powershell 的选项来快速打开当前路径的 powershell

> 如：在桌面空白处按住 shift，再单击鼠标右键可以看到"在此处打开 powershell 窗口"的选项

2. 在文件夹窗口按 `Alt` + `d` 快捷键可快速定位到地址栏，再输入 `cmd` 或者 `powershell` 即可以快速打开当前路径下的命令行窗口

3. 将文件夹拖入 `powershell` 的界面可以快速键入该目录的绝对路径

4. 如果已经安装了 `vscode` ，可以输入 `code .` 命令用 `vscode` 打开当前目录
