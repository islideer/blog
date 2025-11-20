---
layout: 'post'
title: 'Git Submodules 备忘录'
date: 2024-12-09
excerpt: '这是一份给自己的、简单而又基础的 Git Submodules 备忘录。'
---


这是一份给自己的、简单而又基础的 Git Submodules 备忘录。 因为发现自己一到用的时候就忘了，结果就是一遍又一遍问 GPT...

## 克隆带有 Git Submodules 的仓库

```bash
# 方法一，一步到位
git clone --recurse-submodules <主仓库URL>

# 方法二，常规方式，较繁琐
git clone <主仓库URL> <主仓库目录?>
cd <主仓库目录>
git submodule update --init --recursive
```

## 添加 Submodules 到当前仓库

```bash
git submodule add <子模块仓库URL> [路径]
```

## 更新现有的 Submodules

根据记录的子模块的 Commit ID 来更新子模块：

- 当子模块仓库有了更新
- 当主项目引用的子模块的提交点改变

```bash
git submodule update --init --recursive
```

## 更新现有 Submodules 到最新提交

```bash
# 进入 Submodules 并拉取最新更改
cd path/to/my-submodule 
git pull

# 在主项目的跟路径下，保存提交
git add path/to/my-submodule
git commit -m "chore: update submodule"
```

## 更新现有 Submodules 的仓库地址

```bash
# 编辑 .gitmodules 文件，修改 url 字段

# 将 .gitmodules 中的变更同步到 .git/config
git submodule sync

# 更新 Submodules
git submodule update --init --recursive

# 保存并提交
git add .gitmodules
git commit -m "chore: update submodule url"
git push
```

## 删除现有 Submodule

```bash
# 通过 git 删除 Submodule 目录
git rm -f <submodule_path>

# 编辑 `.gitmodules` 和  `.git/config` 文件
# 找到并删除与该 Submodule 相关的那一段配置，如下

# [submodule "submodule_name"]
# path = submodule_path
# url = https://github.com/username/repo.git

# 删除 Submodule 目录下的 `.git` 目录引用。
# 如果之前使用 `git rm`，此步骤应该已经自动完成。

# 提交更改
git add .
git commit -m "chore: remove submodule"

# 在 `.git/modules` 中删除 Submodule 相关数据
rm -rf .git/modules/<submodule_path>
```
