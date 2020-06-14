### 语法

```
customElements.define(name, constructor, options);
```

### name 

自定义元素名.必须和NCName 产生方式相匹配的字符串，必须包含一个U+002D连字符号字符, 且不能包含任何ASCII大写字母. 自定义元素类型**禁止**是下面的任何一种:

annotation-xml
color-profile
font-face
font-face-src
font-face-uri
font-face-format
font-face-name
missing-glyph

上面的名称列表是所有来自适用规范中包含连字符元素的名称的总结, 即 SVG 和 MathML.

### constructor

自定义元素构造器.

### options [可选]

控制元素如何定义. 目前有一个选项支持:

- `extends`. 指定继承的已创建的元素. 被用于创建自定义元素.