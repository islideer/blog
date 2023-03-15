---
layout: post
title: 使用 Web Speech API 原生实现语音识别和文字转语音功能
date: 2023-03-14
excerpt: Web Speech API 是一项现代 Web 技术，它允许我们在浏览器中进行语音识别和文本转语音。
---

> 本篇文章主要内容由 [ChatGPT](https://chat.openai.com/chat) 生成。

Web Speech API 是一项现代 Web 技术，它允许我们在浏览器中进行语音识别和文本转语音。在这篇文章中，我们将会深入探讨 Web Speech API 的基本使用，并且我们还将探讨它的浏览器兼容性。

## 什么是 Web Speech API

Web Speech API 是一个浏览器 API，它使得开发人员能够将语音合成和语音识别功能添加到他们的 Web 应用程序中。Web Speech API 的核心是两个接口：SpeechSynthesis 和 SpeechRecognition。

- SpeechSynthesis: SpeechSynthesis 接口允许我们将文本转换为语音。 它提供了一组方法和事件，以便我们可以选择语音、调整语速和音调等参数。

- SpeechRecognition: SpeechRecognition 接口允许我们将语音转换为文本。 它允许我们定义语言模型，并在语音输入被识别时触发一系列事件。

## Web Speech API 的基本使用

在本节中，我们将讨论如何使用 Web Speech API 进行文本转语音和语音识别。

### 文本转语音

首先，我们将看一下如何使用 Web Speech API 进行文本转语音。

1. 创建 SpeechSynthesis 对象

要使用 Web Speech API 进行文本转语音，我们需要首先创建 SpeechSynthesis 对象。SpeechSynthesis 对象是单例对象，只需创建一次即可。

```js
const synth = window.speechSynthesis
```

2. 创建 SpeechSynthesisUtterance 对象

接下来，我们需要创建一个 SpeechSynthesisUtterance 对象，该对象将包含要转换为语音的文本。可以设置一些选项，如语速、音调和音量等。

```js
const utterance = new SpeechSynthesisUtterance('Hello, World!')
utterance.rate = 0.8
utterance.pitch = 1
utterance.volume = 1
```

3. 将 SpeechSynthesisUtterance 对象添加到队列中，并播放

最后，我们需要将 SpeechSynthesisUtterance 对象添加到队列中，并使用 `speak()` 方法开始播放。

```js
synth.speak(utterance)
```

### 语音识别

接下来，我们将看一下如何使用 Web Speech API 进行语音识别。

1. 创建 SpeechRecognition 对象

要使用 Web Speech API 进行语音识别，我们需要首先创建 SpeechRecognition 对象。SpeechRecognition 对象是单例对象，只需创建一次即可。

```js
const recognition = new webkitSpeechRecognition()
```

2.设置语音识别参数

接下来，我们需要设置一些语音识别参数，如语言模型、连续识别和语音识别结果的最大个数等。

```js
recognition.continuous = true
recognition.interimResults = true
recognition.maxAlternatives = 1
recognition.lang = 'en-US'
```

3. 监听识别事件

在设置完语音识别参数后，我们需要监听识别事件，这将在用户说话时触发。我们可以监听以下事件：

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

最后，我们需要调用 `start()` 方法开始识别。

```js
recognition.start()
```

## 浏览器兼容性

Web Speech API 目前已经被广泛支持，但是我们仍然需要注意浏览器兼容性。

- Chrome：版本 25 及以上支持 Web Speech API。
- Firefox：版本 44 及以上支持 Web Speech API。
- Safari：版本 7.1 及以上支持 Web Speech API，但仅限于 Mac OS X 系统。
- Edge：版本 14 及以上支持 Web Speech API。
- Opera：版本 27 及以上支持 Web Speech API。
- iOS Safari：版本 10 及以上支持 Web Speech API。
- Android WebView：版本 4.4 及以上支持 Web Speech API。
- Samsung Internet：版本 4.0 及以上支持 Web Speech API。

需要注意的是，不同浏览器对 Web Speech API 的支持情况可能略有不同，建议在实际开发中使用 [Can I Use](https://caniuse.com/) 查询最新的浏览器兼容性信息。

## 结论

Web Speech API 是一项强大的 Web 技术，它使我们能够在浏览器中进行语音识别和文本转语音。在本文中，我们介绍了 Web Speech API 的基本使用方法，包括如何进行文本转语音和语音识别，并提供了浏览器兼容性的说明。现在你可以开始探索 Web Speech API 并在你的 Web 应用程序中添加这些强大的语音功能了。
