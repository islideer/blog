---
layout: post
title: JavaScript 正则的高级用法
date: 2022-12-26
excerpt: 记录一些 JavaScript 正则的高级用法，便于自己日后翻阅复习。
---

**1. 惰性匹配**

如 `Hi+?` 只会匹配 `Hiiiii` 中的 `Hi`

```js
'Hiii'.replace(/Hi+?/, 'x') // xii
'Hiii'.replace(/Hi+/, 'x') // x

'Hellollo'.replace(/H.*?llo/, 'x') // xllo
'Hellollo'.replace(/H.*llo/, 'x') // x

'yoooooo'.replace(/yo{2,6}?/, 'x') // xoooo
'yoooooo'.replace(/yo{2,6}/, 'x') // x
```

**2. 单词边界**

```js
'How are you?'.replace(/\b.+?\b/, 'x') // x are you?
```

**3. 捕获组引用**

捕获组表现形式: `(xxx)`, 反向引用: `\n`, 如: `\1`, `\2` 等

```js
'How are you?'.replace(/(how)/i, '$1 old') // How old are you?
'1#2#3'.replace(/^(\d)#(\d)#(\d)$/i, '$1 $2 $3') // 1 2 3
'111#111#111'.replace(/^(\d+)#\1#\1$/i, '$1') // 111
```

**4. 命名捕获组+反向引用**

命名捕获组: `(?<name>xxx)`, 反向引用: `\k<name>`

```js
'111#111'.replace(/^(?<num>\d+)#\k<num>$/i, '$<num>') // 111
```

**5. 位置断言**

包括:

- 正向先行断言: `(?=xx)`
- 反向先行断言: `(?!xx)`, 反向即: **不能匹配**
- 正向后行断言: `(?<=xx)`
- 反向后行断言: `(?<!xx)`, 反向即: **不能匹配**

**6. 修饰符**

除了常用的 `g` 全局匹配, `i` 忽略大小写之外：

- `m`: multiline 简写，多行匹配，把 `^` 和 `$` 变成行开头和行结尾。
- `u`: unicode 简写，允许使用 Unicode 点转义符
- `y`: sticky 简写，开启粘连匹配，正则表达式执行粘连匹配时试图从最后一个匹配位置开始

**7. replace 第二个参数**

如果是字符串，可以用以下的特殊字符：

- `$n`x: 1<=n<=99, 匹配第 1-99 个分组里捕获的文本
- `$&`: 匹配到的子串文本
- <code>$`</code>: 匹配到的子串的左边文本
- `$'`: 匹配到的子串的右边文本
- `$$`: 美元符号
- `$<name>`: 命名分组捕获的结果值

如果是函数，函数的返回值作为替换字符串。并且函数遵循以下规则：

- 第 1 个参数为匹配的子串，对应于上述的 `$&`
- 第 1+1=2 个到第 n+1 个参数为对应的第 1 到第 n 个分组（如果有）
- 第 n+2 个参数为 offset, 即匹配到的子字符串在原字符串中的偏移量
- 第 n+3 个参数为被匹配的原字符串
- 第 n+4 个参数为命名捕获组匹配的对象

## 参考

- [String.prototype.replace() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
- [对正则表达式，这么多年你还在害怕吗？ - 前端新世界](https://mp.weixin.qq.com/s?__biz=MzAwNjI1MzI3OQ==&mid=2649003502&idx=1&sn=7195108bf00c319436818f1727c23d22)
- [正则表达式完整使用指南 - 前端新世界](https://mp.weixin.qq.com/s?__biz=MzAwNjI1MzI3OQ==&mid=2649001386&idx=1&sn=07f820152869a53955298f8624caecf1)
