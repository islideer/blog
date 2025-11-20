---
layout: 'post'
title: 'Git 常用命令速览'
date: 2020-10-11
top_image: 'https://i.loli.net/2020/11/21/24MWNinubCAd5Dr.png'
excerpt: '总结了一些常见常用的 Git 命令，方便日后查阅'
---


上张图

![git常用命令](https://i.loli.net/2020/10/15/Swsq8OFLTMDzGjE.jpg)

## 用的最为频繁的 git 命令

### 配置默认信息

```bash
git config --global user.name "[username]"
git config --global user.email "[email_address]"
```

### 初始化版本库

```bash
# 将当前目录初始化为 git 版本库
git init
# 重命名当前分支为 main
git branch -M main
```

> 推荐使用 main 作为主分支名 参见: [链接](https://github.com/github/renaming#new-repositories-use-main-as-default-branch-name)

### 设置远程分支

```bash
git remote add origin [repo_url]
```

### 暂存更改

```bash
git add .
git add -A .
```

### 提交更改

```bash
git commit -m "[commit_message]"
```

### 发布 main 分支

```bash
git push -u origin main
```

## 较为常用的命令

### 一、修改与提交操作

#### 查看当前版本库状态

```bash
git status
```

#### 暂存更改

```bash
git add .
```

#### 提交更改

```bash
git commit -m "[commit_message]"
```

#### 修改最后一次提交

运行以下命令后按`i`进入编辑模式

```bash
git commit --amend
```

### 二、分支操作

#### 新建分支

```bash
git branch [new_branch]
```

#### 切换分支

```bash
git checkout [banch_name]
git checkout HEAD^
git checkout HEAD~3
```

#### 删除本地分支

```bash
git branch -d [branch_name]
```

#### 新建并切换到指定分支

```bash
git checkout -b [branch_name]
```

#### 合并分支

合并指定分支到当前分支

```bash
git merge [branch_name]
```

#### 迁移分支

把当前分支迁移到目标分支的后面

```bash
git rebase [branch_name]
```

> 迁移完了后注意 `master` 等分支的当前引用位置，若目标分支是 `maste`、`main` 等主分支， 建议将主分支也 `rebase` 到最新的更改

### 三、撤销操作

#### 软撤销

仅仅撤销上一个 `commit` 不修改你改动了的文件

```bash
git reset --soft HEAD^
```

若只是想修改 `commit` 信息，可以先运行下列命令，然后输入 `i` 进入编辑模式，并修改第一行 `commit` 信息

```bash
git commit --amend
```

#### 硬撤销

撤销 commit 的同时， 删除你对文件做出的所有改动， 还原到上一个 commit 的状态

> 说人话就是: 不懂的话千万别乱用 否则一下午写的代码全白给

```bash
git reset --hard HEAD^ # 撤销上一个提交
git reset --hard HEAD~3 # 撤销前三个提交
```

如果实在是不小心误删， 可以先查看撤销记录， 找到要还原的记录的 `commitID` ， 再通过 `commitID` 还原:

```bash
git reflog
git reset --hard [commitID]
```

然后再根据需求撤销当前 `commmit`

### 四、查看提交历史

```bash
git log # 查看git日志(按q退出)
git show (commitID) # 查看上一次(或者指定id的)提交记录
git log -p [file_name] # 查看指定文件
git blame [file_name] # 以列表形式查看指定文件提交历史
```

## 附：可用来查阅的 git 命令集

```bash
# 初始化一个 git 版本库
git init
# 查看版本库的状态
git status
# 全局默认信息配置
git config --global user.email "[email_addres]"
# 全局默认信息配置
git config --global user.name "[username]"
# 将所有修改添加到暂存区
git add .
# Ant 风格添加修改
git add *
# 将以 Hello 结尾的文件的所有修改添加到暂存区
git add *Hello
# 将所有以 Hello 开头的文件的修改添加到暂存区
git add Hello*
# 将以 Hello 开头且其后仅跟一位字符的文件的修改提交到暂存区
git add Hello?
# 提交更改并附带有意义的信息
git commit -m "comment"
# 为本地版本库设置远程分支
git remote add origin [repo_url]
# 克隆远程版本库到本地( git 协议最快)
git clone [repo_url]
# 查看当前版本库所有分支
git branch
# 创建 [branch_name] 分支
git branch [branch_name]
# 删除 [branch_name] 分支
git branch -d [branch_name]
# 强制删除 [branch_name] 分支
git branch -D [branch_name]
# 丢弃工作区的修改退回原始状态
git checkout -- [file_name]
# 切换到一个已经存在的分支
git checkout [branch_name]
# 创建 [branch_name] 分支，并切换到 [branch_name] 分支
git checkout -b [branch_name]
# 拉取远程分支的最新更改到本地
git pull
# 将本地 [branch_name] 分支推送到远程的 [branch_name] 分支
git push -u origin [branch_name]
# 切换到 [branch_name] 分支并将本地 [branch_name] 分支推送到远程
git push -u origin [branch_name]
# 将标签 v1.0 推送到远程版本库
git push -u origin v1.0
# 一次性推送全部标签
git push -u origin --tags
# 将 [branch_name] 分支合并到 [branch_name] 分支
git merge [branch_name]
# 禁用 Fast forward 合并 [branch_name] 分支
git merge --no-ff -m "comment" [branch_name]
# 冻结当前的分支修改
git stash
# 列出所有工作现场存储
git stash list
# 查看 commit 信息
git log
# 将 commit 信息简化成一行显示
git log --pretty=oneline
# 图形化展示分支情况
git log --graph --pretty=oneline --abbrev-commit
# 退回到上一个版本， HEAD 表示当前版本
git reset --hard HEAD^
# 退回到上两个版本
git reset --hard HEAD^^
//退回到上 100 个版本
git reset --hard HEAD~100
# 退回到指定版本
git reset --hard [commitID]
# 丢弃已经添加到暂存区的修改
git reset HEAD [file_name]
# 在当前版本 HEAD 上打一个名称为 [tag_name] 的标签
git tag [tag_name]
# 查看所有标签，列表出所有的标签名
git tag
# 为目标 commit 打上 [tag_name] 标签
git tag [tag_name] [commitID]
# 为 commit 打上标签
git tag -a [tag_name] -m "[commit_msg]" [commitID]
# 查看标签的信息，包括文字说明
git tag [tag_name]
# 删除标签 [tag_name]
git tag -d [tag_name]
# 在文件未提交前查看文件被修改的部分
git diff [file_name]
# 从 git 版本库中删除文件(同时从文件系统中删除文件)
git rm file
# 查看之前版本的 commitID
git reflog
# 查看指定标签的提交信息
git show [tag_name]
```
