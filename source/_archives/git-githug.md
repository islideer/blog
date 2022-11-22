---
layout: post
title: Githug小白指南
date: 2019-12-14
top_image: https://i.loli.net/2020/11/21/3ygtAW8ESVJuMKH.jpg
excerpt: 给刚入门的小白门看的Githug指南
---

## 前言

### Githug 简介

`Githug` （不是 `Github` ）是一个用 `Ruby` 编写的、用来练习 `Git` 的闯关小游戏。在闯关过程中，我们可以掌握 `Git` 的基本用法、加深理解，同时提高熟练度。

> - 不了解 `Git` ?👉[浅谈 Git](https://zhidao.baidu.com/question/1994271798219235947.html?qbl=relate_question_0&word=git%BF%C9%D2%D4%B8%C9%C2%EF)
> - `Git` 、 `Githug` 和 `Github` 概念混淆?👉[Git、Githug 和 Github 的关系](https://zhidao.baidu.com/question/1963914368577710820.html?fr=iks&word=git+github+githug%B9%D8%CF%B5&ie=gbk)

### 闯关原则

在闯关过程中，要时刻明白，我们闯关的目的是学习 `git` ，所以请不要为了闯关而闯关，而忽略了闯关过程中的收获。我们的重点在于学习 `Git` 。

### 进行 Githug 前的准备

#### 安装 Ruby

`Ruby` 是一种开源的动态编程语言。因为 `Githug` 是用 `Ruby` 写的，所以我们得先安装 `Ruby` （已安装则跳过此步）。[Ruby 官网安装指引](https://www.ruby-lang.org/zh_cn/downloads/)

> Windows 用户可直接下载安装程序进行安装 :[下载 Ruby 安装程序](https://rubyinstaller.org/downloads/)

安装完后，打开命令行界面执行下列命令：

```html
ruby --version
```

> 不了解命令行?👉[命令行](https://zhidao.baidu.com/question/1387050620456949460.html)

若输出有关 `Ruby` 的版本号，则代表安装成功。

#### 安装 Githug

执行下列三行命令修改默认下载源:

```html
//删除默认需要翻墙才能用的国外下载源 gem sources --remove https://rubygems.org/
//设置下载源为国内可以访问的下载源 gem sources --a https://gems.ruby-china.org/
//查看是否安装成功 gem sources -l
```

换源成功后执行下列命令安装 `Githug`

```html
gem install githug
```

## 初始化 Githug

首先打开一个你想要建立 githug 游戏目录的文件夹，然后在资源管理器（暂时简单理解为文件夹的页面）的地址栏(有 `"C:\windows\"` 这样类似文字的编辑框)输入 `cmd` 回车。系统会自动打开位于当前路径下的 `cmd` 控制台，在这个命令行界面输入 `githug` ，返回的预期结果如下：

```html
*********************************************************** * Githug *
*********************************************************** No githug directory
found， do you wish to create one? [yn]
```

这个提示的意思是你已经进入到 `Githug` 的游戏界面了，但是它未检索到游戏目录，提示你是否要建立目录。此时，输入字母 `y` 并按回车确认，它会在该文件夹下创建名为 `git_hug` 的游戏文件夹，然后用如下命令行进入到 `git_hug` 路径下就可以进行闯关了。

```html
cd git_hug
```

> 不会命令行的基本操作?👉[命令行基本操作](https://jingyan.baidu.com/article/ceb9fb1074947b8cad2ba0f9.html)

### 常用的命令:

> - `githug` 或 `githug play` 检测当前关卡是否通过
> - `githug hint` 显示当前关卡的提示
> - `githug reset` 重置当前关卡
> - `githug levels` 列出所有关卡

注 · 在任意关卡退出后，再次进入 `Githug` ，闯关进度会保存

## 闯关指引

### Level 1 init

```html
Name: init Level: 1 Difficulty: * A new directory， `git_hug` ， has been
created; initialize an empty repository in it.
```

### Level 2

### Level 3

### Level 4

### Level 5

### Level 6

### Level 7

### Level 8

### Level 9

### Level 10

### Level 11

### Level 12

### Level 13

### Level 14

### Level 15

### Level 16

### Level 17

### Level 18

### Level 19

### Level 20

### Level 21

### Level 22

### Level 23

### Level 24

### Level 25

### Level 26

### Level 27

### Level 28

### Level 29

### Level 30

## 需要注意的问题

## Git 学习资料

- [Git 教程 - 慕雪峰](https://www.liaoxuefeng.com/wiki/896043488029600)

- [Git 教程 - W3School](https://www.w3cschool.cn/git/)

- [Git 教程 - 菜鸟教程](https://www.runoob.com/git/git-tutorial.html)

## 参考文章

- [利用 githug 来练习 git - 灰太狼](https://blog.csdn.net/huitailang1991/article/details/54288618)

- [Github 通关指南 - Wzb 博客](https://wzb.me/posts/2019/09/06/githug-guideline.html)

- [GitHug 不完全通关攻略 - lunar](http://lunarnai.cn/2016/03/30/githug%20%E4%B8%8D%E5%AE%8C%E5%85%A8%E9%80%9A%E5%85%B3%E6%94%BB%E7%95%A5/)

- [命令行](https://jingyan.baidu.com/article/ceb9fb1074947b8cad2ba0f9.html)
