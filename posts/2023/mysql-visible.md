---
layout: post
title: MySQL 5.7 版本不支持新版 VISIBLE 关键字
date: 2023-03-30
top_image: https://s2.loli.net/2022/03/06/ed7FfCKA1ipN24r.png
excerpt: 在写毕设项目过程中踩了个小坑。
---

以前很少跟数据库打交道，这阵子在写毕设，踩了一个 MySQL 版本兼容性的小坑。

我使用官方提供的 MySQL Workbench 工具设计好了表结构，导出 SQL 语句，就在执行脚本建表时，发现语句执行失败，提示存在语法错误。

我纳闷了，这不是官方工具生成的 SQL 语句吗，这还能有错？

找了一阵，在 Stack Overflow 上找到了[这个问答](https://stackoverflow.com/questions/52785125/mysql-workbench-error-in-query-1064-syntax-error-near-visible-at-line-1)，发现是我在使用 MySQL Workbench 的时候，目标版本选的是默认的 8 的最新版本，MySQL 8 的版本引入了索引可选设置为隐藏的特性，通过 `VISIBLE` 关键字进行设置，但是在 MySQL 5.7 是不支持的。

所以，解决方案很简单，只需要将生成的 SQL 语句里的 VISIBLE 都删掉就行了。但如果不想手动删，也可以修改 MySQL Workbench 或者你习惯的工具的设置，让他最终生成兼容你使用的服务器 MySQL 版本的 SQL 语句。
