---
layout: 'post'
title: '使用 Web Speech API 原生实现语音识别和文字转语音功能'
date: 2023-03-14
excerpt: 'Web Speech API 是一项现代 Web 技术，它允许我们在浏览器中进行语音识别和文本转语音。'
---


Web Speech API 是一项现代 Web 技术，它允许我们在浏览器中进行语音识别和文本转语音。

## 什么是 Web Speech API

Web Speech API 是一个浏览器 API，能够将语音合成和语音识别功能添加到 Web 应用程序中。

Web Speech API 的核心是两个接口：SpeechSynthesis 和 SpeechRecognition。

- SpeechSynthesis: SpeechSynthesis 接口将文本转换为语音。
- SpeechRecognition: SpeechRecognition 接口将语音转换为文本。

## 基本使用

### 文本转语音

1. 创建 SpeechSynthesis 对象

创建 SpeechSynthesis 对象，只需创建一次即可。

```js
const synth = window.speechSynthesis
```

2. 创建 SpeechSynthesisUtterance 对象

可以设置一些选项，如语速、音调和音量等。

```js
const utterance = new SpeechSynthesisUtterance('Hello, World!')
utterance.rate = 0.8
utterance.pitch = 1
utterance.volume = 1
```

3. 将 SpeechSynthesisUtterance 对象添加到队列中，并播放

将 SpeechSynthesisUtterance 对象添加到队列中，使用 `speak()` 方法播放。

```js
synth.speak(utterance)
```

### 语音识别

1. 创建 SpeechRecognition 对象

创建 SpeechRecognition 对象，只需创建一次即可。

```js
const recognition = new webkitSpeechRecognition()
```

2. 设置语音识别参数

如语言模型、连续识别和语音识别结果的最大个数等。

```js
recognition.continuous = true
recognition.interimResults = true
recognition.maxAlternatives = 1
recognition.lang = 'en-US'
```

3. 监听识别事件

监听识别事件，在用户说话时触发：

- start： 识别开始时触发的事件。
- result： 在用户说话时触发的事件，可以获取语音识别结果。
- end： 识别结束时触发的事件。

```js
recognition.addEventListener('start', () => {
  console.log('Speech recognition service has started')
})

recognition.addEventListener('result', e => {
  const transcript = e.results[0][0].transcript
  console.log(transcript)
})

recognition.addEventListener('end', () => {
  console.log('Speech recognition service disconnected')
})
```

4. 开始识别

调用 `start()` 方法开始识别。

```js
recognition.start()
```

## 浏览器兼容性

Web Speech API 目前已经被广泛支持，不同浏览器对 Web Speech API 的支持情况可能略有不同，建议在实际开发中使用 [Can I Use](https://caniuse.com/) 查询最新的浏览器兼容性信息。

> 本篇文章主要内容经过了 [ChatGPT](https://chat.openai.com/chat) 修饰。
