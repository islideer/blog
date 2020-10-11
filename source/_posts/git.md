---
layout: post
title: Git 常用命令
date: 2020-10-11
top_image: https://i.loli.net/2020/10/11/RPTxzujrFkG2tDV.jpg
excerpt: 总结了一些常见常用的 Git 命令
---

## 基本用法

### 初始化操作

#### 设置默认用户信息

```bash
git config user.name "Vik"
git config user.email "vikiboss@qq.com"
```

### 暂存更改

把做出的更改存档到暂存区

```bash
# 基本用法
git add file_name
# 一般用下方这条命令添加当前目录下所有做出更改的文件到暂存区
git add .
```

### 提交更改

对更改进行带提示信息的标记提交(本地)

```bash
git commit -m "commit_msg"
```

### 拉取更改

拉取远程仓库的最新更改

```bash
git pull
```

### 发布更改

将做出的更改发布到远程仓库

```bash
git push
```

### 查看远程

查看本地仓库链接到的远程仓库地址

```bash
git remote -v
```

### 新建分支

```bash
git branch branch_name
```

### 切换分支

```bash
git checkout branch_name
```

### 新建并切换到新分支

```bash
git checkout -b branch_name
```

### 合并更改

合并目标分支改动到当前分支

```bash
git merge branch_name
```

### 撤销

#### 软撤销

仅仅撤销上一个 commit 不改动你已经做出的改动

```bash
git reset --soft HEAD^
```

#### 硬撤销

撤销 commit 的同时, 删除你对文件做出的所有改动, 还原到上一个 commit 的状态

> 说人话就是: 不懂别乱用 等下一下午写的代码全白给了

```bash
git reset --hard HEAD^
```

如实在是不小心误删了改动, 可以先查看撤销记录, 找到要还原的记录的唯一识别码, 再还原用识别码还原

```bash
git reflog
# 在输出的一堆东西里找到你要还原的最后一个commit的识别码
git reset --hard 2deae34
```

然后再按照软撤销去撤销 commmit

### 迁移当前分支

把当前分支迁移到目标分支的后面

```bash
git rebase branch_name
```

> 迁移完了后注意 master 等分支的当前引用位置
> 若目标分支是 master/main 等主分支, 建议将主分支也 rebase 到最新的更改

## 高级

### 引用指针 HEAD

HEAD 是一个引用 用来保存当前分支的最近一次提交记录

修改整个提交树的 Git 命令通常是改变 HEAD 的指向开始的

### 查看 HEAD

```bash
cat .git/HEAD
```

### 查看 HEAD 的引用

```bash
git symbolic-ref HEAD
```

### 引用指针

```bash
# 上一个更改
HEAD^
# 回到上一个更改(不撤销)
git checkout HEAD^
# 上n个更改
HEAD~n
# 撤销上两个更改
git reset HEAD~2
```
