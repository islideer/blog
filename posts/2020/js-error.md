---
layout: post
title: JavaScript错误处理
date: 2020-01-11
top_image: https://i.loli.net/2020/11/21/VHW3jNehAX7S548.jpg
excerpt: 寒假学习之JavaScript错误处理
---

## JavaScript 原生错误类型

### （1）SyntaxError

- SyntaxError 是解析代码时发生的语法错误。

### （2）ReferenceError

- ReferenceError 是引用一个不存在的变量时发生的错误。

### （3）RangeError

- RangeError 是当一个值超出有效范围时发生的错误。主要有几种情况，一是数组长度为负数，二是 Number 对象的方法参数超出范围，以及函数堆栈超过最大值。

### （4）TypeError

- TypeError 是变量或参数不是预期类型时发生的错误。比如，对字符串、布尔值、数值等原始类型的值使用 new 命令，就会抛出这种错误，因为 new 命令的参数应该是一个构造函数。

### （5）URIError

- URIError 是 URI 相关函数的参数不正确时抛出的错误，主要涉及 encodeURI()、decodeURI()、encodeURIComponent()、decodeURIComponent()、escape()和 unescape()这六个函数。

### （6）EvalError

- eval 函数没有被正确执行时，会抛出 EvalError 错误。该错误类型已经不再在 ES5 中出现了，只是为了保证与以前代码兼容，才继续保留。

> 以上这 6 种派生错误，连同原始的 Error 对象，都是构造函数。开发者可以使用它们，人为生成错误对象的实例。

## 异常处理语句

- `try` 语句测试代码块的错误。

- `catch` 语句处理错误。

```js
try {
  //...
} catch (err) {
  //catch参数可以接受从try传来的错误信息
  //...
}
```

- `throw` 语句创建自定义错误。

- 下面是示例

```js
var txt = "";

function message() {
  try {
    allert("Welcome guest!");
  } catch (err) {
    txt = "本页有一个错误。\n\n";
    txt += "错误描述：" + err.message + "\n\n";
    txt += "点击确定继续。\n\n";
    alert(txt);
  }
}
```

- 上述例子的 message()函数中，故意将 alert 错写成 allert，此时发生了错误，allert()函数未定义。JavaScript 引擎本该终止并抛出错误，但是由于 `try...catch...` 语句的存在， `catch` 块会捕捉到 `try` 块中的错误，并执行代码来处理它。

- 搭配 `throw` 可以自定义生成错误信息

```js
function myFunction() {
  try {
    var x = document.getElementById("demo").value;
    if (x == "") throw "empty";
    if (isNaN(x)) throw "not a number";
    if (x > 10) throw "too high";
    if (x < 5) throw "too low";
  } catch (err) {
    console.log("error:", err);
  }
}
```

- 为了捕捉不同类型的错误，catch 代码块之中可以加入判断语句。

```js
try {
  foo.bar();
} catch (e) {
  if (e instanceof EvalError) {
    console.log(e.name + ": " + e.message);
  } else if (e instanceof RangeError) {
    console.log(e.name + ": " + e.message);
  }
  // ...
}
```

- 即使有 return 语句在前，finally 代码块依然会得到执行，且在其执行完毕后，才会显示 return 语句的值。

```js
var count = 0;

function countUp() {
  try {
    return count;
  } finally {
    count++;
  }
}

countUp();
// 0
count;
// 1
```

## finally 代码块

- `try...catch` 结构允许在最后添加一个 finally 代码块，表示不管是否出现错误，都必需在最后运行的语句。

```js
function cleansUp() {
  try {
    throw new Error("出错了……");
    console.log("此行不会执行");
  } finally {
    console.log("完成清理工作");
  }
}

cleansUp();
// 完成清理工作
// Uncaught Error: 出错了……
```

上面代码中，由于没有 `catch` 语句块，所以错误没有捕获执行 `finally` 代码块以后，程序就中断在错误抛出的方。

## finally 代码块用法的典型场景

```js
function f() {
  try {
    console.log(0);
    throw "bug";
  } catch (e) {
    console.log(1);
    return true; // 这句原本会延迟到finally代码块结束再执行
    console.log(2); // 不会运行
  } finally {
    console.log(3);
    return false; // 这句会覆盖掉前面那句return
    console.log(4); // 不会运行
  }
  console.log(5); // 不会运行
}

var result = f();
// 0
// 1
// 3

result;
// false
```

上面代码中， `catch` 代码块结束执行之前，会先执行 `finally` 代码块。从 `catch` 转入 `finally` 的标志，不仅有 `return` 语句，还有 `throw` 语句。

```js
function f() {
  try {
    throw "出错了！";
  } catch (e) {
    console.log("捕捉到内部错误");
    throw e; // 这句原本会等到finally结束再执行
  } finally {
    return false; // 直接返回
  }
}

try {
  f();
} catch (e) {
  // 此处不会执行
  console.log('caught outer "bogus"');
}
```

上面代码中，进入 `catch` 代码块之后，一遇到 `throw` 语句，就会去执行 `finally` 代码块，其中有 `return false` 语句，因此就直接返回了，不再会回去执行 `catch` 代码块剩下的部分了。

## 参考文章

- [JavaScript 错误处理机制-W3Cschool](https://www.w3cschool.cn/javascript_guide/javascript_guide-xb63268n.html)
