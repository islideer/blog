---
layout: 'post'
title: 'JavaScript 基础篇'
date: 2020-01-11
top_image: 'https://i.loli.net/2020/11/21/2dmkoTYZnhjauOG.jpg'
excerpt: '寒假学习之 JavaScript基础篇'
---


## JavaScript 语法标识符的命名规范

`JavaScript` 中使用变量来作为值的符号名。变量的名字又叫做**标识符**，他的命名需要遵守一定的规则:

1. 必须以字母、下划线 `_` 或者美元符号开头
2. 后续的字符也可以是数字 `0-9` 或字母(可以是从 `A` 到 `Z` 的大写字母和从 `a` 到 `z` 的小写字母)
3. 可以使用大部分 `ISO 8859-1` 或 `Unicode` 编码的字符作标识符，例如 `å` 和 `ü`
4. 也可以使用 `Unicode` **转义字符**作为标识符
5. 不能使用 `JavaScript` 的保留关键字作为标识符

### JavaScript 关键字

![关键字.png](https://i.loli.net/2020/03/24/KDhPxQfsz8UjLag.png)

## JavaScript 语法之注释的使用

单行注释用 `//这里是注释` ，多行注释用 `/*这里是注释*/` ，但是注意注释**不能嵌套使用**

```js
var a = 6; //这是单行注释

/* 
这是多行注释
可以编写多行注释
*/
```

> 添加注释是为了便于开发者阅读原码和日后的维护。一个好的注释习惯将会带来极大的阅读体验，极大地降低了后续开发者二次开发的难度。

## JavaScript 语法之分号的使用

精炼表述：**行末的分号表示当前语句结束，不过只有在单行内需要分割多条语句时，这个分号才是必须的**。

- `if else` 、 `while` 、 `for` 语句的 `{ }` 之后不需要分号来结束

```js
if (x != 1) {
  // ... do something
} else {
  // ... do something
} //此处不加分号

while (!true) {
  // ... do something
} //此处不加分号

var i = 1;
for (; i < 10; i++) {
  // ... do something
} //此处不加分号
```

- `for` 语句的 `( )` 里面的语句分割需要用分号，但最后一条语句结尾不需要分号（如上所示）

- 用 `function` 关键字声明的语句的 `{ }` 之后不需要分号

```js
function get(url) {
  // ... do something
} //此处不需要分号
```

- **单行语句可以省略末尾的分号，但是一般并不建议这么做。**

- 在一条语句的末尾加上分号虽然不是必需的，但却是是一个很好的习惯，可以大大减少代码中产生 bug 的可能性。

## JavaScript 语法之声明

### 在 JavaScript 中，有三种声明方式

1. `var` 可选初始化一个值
2. `let` 声明一个**块作用域**的**局部变量**，可选初始化一个值
3. `const` 声明一个**块作用域**的**只读常量**

```js
var a = 1;
var b;

let a = 1;
let b;

const that = this;
const c = 520;
```

### 在 JavaScript，变量的声明也有三种方式

1.**使用关键词** `var` 。例如 `var x = 42` 。这个语法可以用来声明**局部变量**和**全局变量**，是比较规范的声明方式
2.**直接赋值**。例如 `a = 6` 。在函数外使用这种形式赋值，会产生一个全局变量。在严格模式下会产生错误。所以要**尽可能避免使用这种方式来声明变量**
3.**使用关键词** `let` 。例如 `let y = 13` 。这个语法可以用来声明**块作用域**的**局部变量**

### 关于 JavaScript 的变量提升

- 在 `JavaScript` 中，你可以先使用变量然后再声明变量而不会引发异常。这个概念被叫做**变量提升**。

```js
console.log(a); //undefined
var a;

console.log(b); //undefined
var b = 3;
```

- 然而变量提升并不是什么好事，提升后的变量将返回 `undefined` 值。**当使用或引用某个变量之后，再在后面的语句中进行声明和初始化操作，这个被提升的变量仍将返回** `undefined`

### 关于 JavaScript 中函数的提升

- 函数声明会被提升到顶部，而函数表达式不会被提升

> 即用 `function` 关键字直接定义的函数，可以直接通过数名 `( )` 的形式被引用，而通过变量定义的函数在引用时会被提升。

```js
foo(); //520
function foo() {
  return 520;
}
bar(); //Uncaught TypeError: bar is not a function
var bar = function () {
  return 666;
};
```

### 关于 var 和 let 在声明变量时的区别

- `let` 和 `var` 的区别体现在作用域上。
- `var` 的作用域被规定为一个函数作用域，而 `let` 则被规定为块作用域，块作用域要比函数作用域小一些。
- 但是如果两者既没在函数中，也没在块作用域中定义，那么两者都属于全局作用域。
- 在 ES6 标准中， `let` （ `const` ）**将不会提升变量到代码块的顶部。**因此，在变量声明之前引用这个变量，将抛出引用错误。
- 为了减少不必要的麻烦，**一般建议声明变量使用**`let`**关键字来声明变量**

```js
//------全局定义，两者相同------
var a = 1;
let b = 1;

//------let定义的全局对象不作为全局对象window的属------
console.log(window.a); //1
console.log(window.b); //undefined

//------函数中定义变量，两者相同------
function f() {
  let bar = "hehe"; // 函数作用域中的变量
  var foo = "lala"; // 函数作用域中的变量
}

//------块作用域------
function f1() {
  for (let i = 1; i < 5; i++) {
    console.log(i); //1,2,3,4,5
  }
  console.log(i); //ReferenceError: i is not defined
}

function f2() {
  for (var i = 1; i < 5; i++) {
    console.log(i); //1,2,3,4,5
  }
  console.log(i); //1,2,3,4,5
}

//-------重新声明------
let me = "foo";
let me = "bar"; //SyntaxError: Identifier 'me' hasalready been declared

var me = "foo";
var me = "bar"; //me被重新替代，var可以进行重复声明作，不报错
```

### JavaScript 的变量声明和引用问题

- 变量被声明但未赋值时，可以被引用，其初始值为 `undefined`
- 访问未声明的变量会抛出引用错误

```js
console.log(a); //undefined
var a;

console.log(b); //b is not defined
```

### 关于 JavaScript 中的全局变量声明

- 在函数之外声明的变量，叫做全局变量，因为它可被当前文档中的任何其他代码所访问。
- 在函数内部声明的变量，叫做局部变量，因为它只能在当前函数的内部访问。
- 全局变量是全局对象的属性。**在网页中，全局对象是** `window` ，**可以用形如**`window.variable`**的语法来设置和访问全局变量。**

### 关于 JavaScript 中常量的声明

- 可以用 `ES6` 的关键字 `const` 创建一个只读的常量。常量标识符的命名规则和变量相同：必须以字母、下划线 `_` 或美元符号`$`开头并可以包含有字母、数字或下划线
- `const` 声明一个只读的常量。一旦声明，常量的值就不能改变。且 const 一旦声明变量，就必须立即初始化，不能留到以后赋值。
- `const` 的作用域与 `let` 命令相同：只在声明所在的块级作用域内有效。
- `const` 命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。也与 `let` 一样不可重复声明。
- `const` 实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动。
- `const` 如果引用的是一个对象，只能保证引用对象的这个指针不变，但对象本身的数据结构是可以改变的。
- 若省略 `const` 关键字，则该标识符将被视为变量
- 在同一作用域中，不能使用与变量名或函数名相同的名字来命名常量。

## 关于 JavaScript 中的数据结构和类型

- 最新的 ECMAScript 标准定义了 8 种数据类型：

- 七种基本数据类型:

  1. `布尔值（Boolean）` ，有 2 个值分别是：true 和 false.
  2. `null` ， 一个表明 null 值的特殊关键字。

     > JavaScript 是大小写敏感的，因此 null 与 Null、NULL 或变体完全不同。

  3. `undefined` ，和 null 一样是一个特殊的关键字，undefined 表示变量未定义时的属性。
  4. `数字（Number）` ，整数或浮点数.

     > 例如： 42 或者 3.14159。

  5. `整数 (BigInt)` ，任意精度。

     > 可以安全地存储和操作大整数，甚至可以超过数字的安全整数限制。

  6. `字符串（String）` ，字符串是一串表示文本值的字符序列，例如："Howdy" 。
  7. `代表（Symbol）` ，一种实例是唯一且不可改变的数据类型（在 ECMAScript 6 中新添加的类型）。

- 以及 `对象（Object）` 。

## 关于 JavaScript 中数据类型的转换

- JavaScript 是一种动态类型语言(dynamically typed language)。也就是说在声明变量时可以不必指定数据类型，而数据类型会在代码执行时会根据需要自动转换。下面的代码是合法且有效的。

```js
var a = 1;
a = "Hello World!";

x = "The answer is " + 42; // "The answer is 42"
y = 42 + " is the answer"; // "42 is the answer"

/*涉及其它运算符（如下面的减号'-'）时，
JavaScript语言不会把数字变为字符串。*/

"37" - 7; // 30
"37" + 7; // "377"

"1.1" + "1.1" = "1.11.1"(+"1.1") + +"1.1"; //2.2
// 注意：加入括号为清楚起见，不是必需的。
```

## 关于 JavaScript 中的字面量 (Literals)

- 字面量是由语法表达式定义的常量
- 其值是固定的，而且在程序脚本运行中不可更改

> 比如 false，3.1415，thisIsStringOfHelloworld invokedFunction: myFunction("myArgument")，

- ECMAScript 2015 增加了一种新的字面量，叫做模板字面量 template literals。它包含一些新特征，包括了多行字符串！

```js
var poem = `Roses are red,
Violets are blue.
Sugar is sweet,
and so is foo.`;

console.log(poem);
/*
Roses are red,
Violets are blue.
Sugar is sweet,
and so is foo.
*/
```

## 关于 JavaScript 转义字符

- 在给字符串赋多行的值时，可以用 `\` 来表示

```js
let a =
  "Hello \
world \
!";

console.log(a); //Hello world !
```

## JavaScript 标准

- `ECMAScript` ：一个由 ECMA International 进行标准化，TC39 委员会进行监督的语言。通常用于**指代标准本身**。
- `JavaScript` ：ECMAScript 标准的各种实现的最常用称呼。这个术语并不局限于某个特定版本的 ECMAScript 规范，并且可能被用于任何不同程度的任意版本的 ECMAScript 的实现。
- `ECMAScript 5 (ES5)` ：ECMAScript 的第五版修订（**ES5**），于 **2009** 年完成标准化。这个规范在所有现代浏览器中都相当完全的实现了。
- `ECMAScript 6 (ES6) / ECMAScript 2015 (ES2015)` ：ECMAScript 的第六版修订（**ES6**），于 **2015** 年完成标准化。这个标准被部分实现于大部分现代浏览器。可以查阅这张兼容性表来查看不同浏览器和工具的实现情况。
- 最新的 ES7, ES8, ES9, ES10 参考链接:

> [ES6,ES7,ES8,ES9,ES10 新特性-简书](https://juejin.im/post/5ca2e1935188254416288eb2#heading-25)

- `ECMAScript Proposals` ：被考虑加入未来版本 ECMAScript 标准的特性与语法提案，他们需要经历五个阶段：Strawman（稻草人），Proposal（提议），Draft（草案），Candidate（候选）以及 Finished （完成）

## 参考文章

- [JavaScript-MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)，[javascript 中 let 和 var 的区别-简书](ttps://www.jianshu.com/p/9f7f053f7204)
