---
layout: post
title: Python 介绍以及 Python2 与 Python3 的区别
date: 2020-9-5
quicklink: true
top_image: https://i.loli.net/2020/11/21/vYmfz2eAjhud7sP.jpg
excerpt: Python 是一种面向对象、解释型、动态数据类型的高级程序设计脚本语言，同时也是一种功能强大而完善的通用型语言。
---

### 关于 Python

Python 是一种**面向对象、解释型、动态数据类型**的高级程序设计脚本语言，同时也是一种功能强大而完善的通用型语言。

它因为具有**语法简单、易于学习、可读性强、功能强大（模块众多）、可扩展性强、开源免费、跨平台**等优势而被很多程序员青睐。

Python 简单的语法使得其代码量相对较少，能够让程序员专注于业务逻辑而不是纠结于编程语言语法本身。

但是，**Nothing is perfect** ，Python 也是这样

作为一门解释性语言，**运行慢自然是 Python 的主要缺点之一**，但目前计算机硬件的性能、计算速度在不断增强，这点往往不会带来大问题，大多数情况，用户往往感觉不到差异。

其他的一些不足：不具备完整的语法检查、暴露源代码（解释性语言通病）、语法要求强制缩进等

### Python 用途广泛

**Web 开发**

如豆瓣、知乎、果壳网、Google、NASA、YouTube、Facebook 等都将 Python 作为主要开发语言

**服务端**

App 与的游戏后台等

**网络爬虫**

快速抓取互联网数据

**人工智能**

相较于其他编程语言，Python 适合人工智能领域，得益于其很多适合用来做人工智能的库，如 `numpy`、`pybrain` 和 `matplotlib` 等，但是计算密集型以及调用硬件底层接口的核心算法还是得靠 `C/C++` 来实现

**数据分析**

在数据分析处理方面，Python 有很完备的生态环境。涉及到的分布式计算、数据可视化、数据库操作等，Python 中都有成熟的模块可以选择完成其功能。

**其他的用途**

自动化运维、系统编程、图形处理、数学处理、文本处理、数据库编程、网络编程、Web 编程、多媒体应用、黑客编程......

> Python 最最强大的功能当然是 ~~**用来做线代作业**~~

### Python2 与 Python3 的区别

Python3 不兼容 Python2，为了尽可能兼容早期用 Python2 写的
Python 程序，官方发布了 Python2.6 作为一个过度版本，其往后的版本完全支持 Python2 的同时兼容了部分 Python3 的语法。

**Python3 在部分函数上做了修改**

例如 `print`

```Python
# Python2 的 print 语句
print 'This is a Feature of Python2'
# Python 2.6/2.7 兼容Python3的print()函数
print('foo') # 只可以存在一个参数
# Python3 将Python2的print语句换为了 print() 函数
print('Foo'， 1 + 1) # 支持多个参数
```

**Python3 增强了对 `Unicode` 的支持**

```Python
# 以下语句符合Python3的语法
浩浩 = 'Viki'
print(浩浩)
```

**对`/`除法的处理方式不同**

```Python
# 在Python2中只有出现浮点数最后结果才是浮点数
>>> 1/3
0
>>> 1.0/3
0.333333333333
# 在Python3中始终是进行精确的除法
# 无论是否出现浮点数最后结果都是浮点数
>>> 1/3
0.3333333333333333
```

**数据类型变动**

Python3 仅存在一种整数类型—— `int` ，去除了 Python2 中的 long（长整数） 类型，相当于扩充了 `int` 型数据的长度

新增了 `bytes` 类型，对应于 Python2 的八位串

`str` 对象和 `bytes` 对象可以使用 `.encode()` (str -> bytes) 或 `.decode()` (bytes -> str)方法相互转化

`dict` 的`.keys()`、`.items()` 和`.values()`方法返回迭代器

> `//`（整除，也叫地板除）运算 2 和 3 的版本表现是一样的

**异常处理不同**

在 Python 3 中使用 `as` 作为关键词，捕获异常的语法由 `except exc， var` 改为 `except exc as var`。
使用语法 `except (exc1， exc2) as var` 可以同时捕获多种类别的异常。 Python 2.6 已经支持这两种语法。

**将 `xrange` 换为 `range`**

Python3 用更规范的 `range` 函数代替 Python2 的 `xrange` 函数。在 Python 3 中使用 `xrange()` 会抛出命名异常

**进制字面量表示不同**

Python3 的字面量表示更规范

```Python
# Python2
0777 # 数字0前缀表示八进制
# Python3
0o777 # 八进制的0后面必须加个小写字母o
0b101 # 二进制的0后面必须加个小写字母b
```

**不等运算符**

Python3 删减了 `<>` 不等运算符

```Python
# Python2中
a <> b
a != b
# Python3中
a != b
```

**删除了 repr 表达式**

Python2 中的反引号 \`\` 相当于 repr 函数的作用，而在 Python3 不允许使用反引号充当 `repr` 函数，只允许使用 `repr` 函数

**多个模块被改名**

这里就不详细展开说了。

### 参考文章

- [Python2.x 与 3.x 版本的区别 - 菜鸟教程][1]

[1]: https://www.runoob.com/python/python-2x-3x.html
