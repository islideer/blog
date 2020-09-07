---
layout: post
title: Windows命令行下的常用命令
date: 2019-12-18
excerpt: 总结了Windows命令行下的常用命令，便于日后翻阅
---

在任何路径下使用 `help` + `命令名` 命令可以查看对应命令的详细用法

> 如: `help dir` 可以查看dir命令的详细用法

#### 1. 切换路径:

1. `d:` 或 `c:` 切换到到对应盘的根目录
2. `cd D:\downloads ` 切换到D盘下的downloads目录
3. `cd demo` 切换到当前路径下的demo文件夹
4. `cd ..` 回退到上一目录
5. `cd ..\demo` 切换到上一目录的demo文件夹
6. `cd \` 或 `cd /` 回退到当前所在盘的根目录

#### 2. 文件/文件夹操作:

1. `dir` 列出当前路径下的文件和文件夹
2. `mkdir demo` 在当前路径下新建名为demo的文件夹
3. `copy demo1.md demo2.md` 将当前路径下demo1.md 拷贝并命名为demo2.md
4. `copy demo1.md demo` 将当前路径下demo1.md 拷贝到当前路径下的demo文件夹中
5. `del demo.md` 删除当前路径下名为demo.md的文件且不能在回收站恢复
6. `del demo` 删除当前路径下名为demo的文件夹下的所有文件（不会删除demo文件夹下的文件夹）
7. `rd demo` 删除当前路径下名为demo的空文件夹 
8. `move demo.md demo` 将当前路径下的demo.md文件移动到当前路径下的demo文件夹
9. `del *.* /s /q /f ` 静默删除当前路径下的所有文件及文件夹且无法恢复（慎用，我在尝试的时候就错把桌面文件全删没了/哭）

#### PS:

1. Win10可以在文件夹空白处按住 `shift` ，再单击鼠标右键选择在此目录打开powershell的选项来快速打开当前路径的powershell

   > 如：在桌面空白处按住shift，再单击鼠标右键可以看到"在此处打开powershell窗口"的选项

2. 在文件夹窗口按 `Alt` + `d` 快捷键可快速定位到地址栏，再输入 `cmd` 或者 `powershell` 即可以快速打开当前路径下的命令行窗口

3. 将文件夹拖入 `powershell` 的界面可以快速键入该目录的绝对路径

4. 如果已经安装了 `vscode` ，可以使用 `code .` 命令来用 `vscode` 打开当前目录

