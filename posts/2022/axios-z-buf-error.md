---
layout: 'post'
title: '记录 Axios 的 `Z_BUF_ERROR` BUG'
date: 2022-12-25
excerpt: '在升级到正式版的 Axios 1.2.1 之后发现了部分问题，记录一下。'
---


在 Axios 的 1.2.0 版本，不少人遇到了 `Z_BUF_ERROR` 的 BUG。

当设置了 `Content-Encoding` 的请求头，但是返回的内容为空时（如 204 请求、HEAD 请求、或者重定向请求），Axios 仍会调用 `zlib` 的 `BrotliDecoder` 进行 Brotli decompression，导致 `zlib` 执行出错，可参考这个 [issue](https://github.com/axios/axios/issues/5246)。

随后，开发者[修复](https://github.com/axios/axios/pull/5250)了这个问题，并同时[修复](https://github.com/axios/axios/pull/5306)了响应头没有 `Content-Length` 的情况。

出于某些原因，Axios 核心开发者对发版比较敏感（参考这个[评论](https://github.com/axios/axios/pull/5306#issuecomment-1334055495)和这个 [issue](https://github.com/axios/axios/issues/5337)），在社区的一再期盼下，1.2.1 终于也是发布了。

然而好景不长，1.2.1 版本再次出现了 `Z_BUF_ERROR` 的问题，翻了几页 issue 之后，大概定位了报错原因：在上一次修复“响应头没有 `Content-Length` 的情况”的[提交](https://github.com/axios/axios/pull/5306)中，引发了 Brotli decompression 的 BUG，当服务器返回的数据压缩格式为 br 时，就会导致 `Z_BUF_ERROR` 错误，作为临时解决方案，你可以手动设置请求头指定服务器返回的编码格式，并确保不返回 br 即可，如下所示。

```js
axios.get(someApi, {
  headers: { 'Accept-Encoding': 'gzip,deflate,compress' }
})
```

这个问题已经被[修复](https://github.com/axios/axios/pull/5353)了，但是还没发版 =.=，至于为什么不发版，刚才有提到。虽然还没发，但是看到昨天（2022/12/24，刚好是平安夜）提了一个发版的 [PR](https://github.com/axios/axios/pull/5404)，希望尽快发布吧，~~距离上一个版本发布已经三个礼拜了呢，毕竟知名度这么高的库最新版存在 broken bug 这么长时间容易问题越堆越多，而且说实话影响的范围非常广。~~

在翻 issue 的时候看到了挺多不礼貌的发言，有一种“你写了 bug 你就得赶紧给老子更新，赶紧发版”的感觉，牢骚归牢骚，还是希望开源社区的维护者和使用者双方之间能多一点理解，多一点包容。
