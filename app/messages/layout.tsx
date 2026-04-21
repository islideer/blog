/**
 * 留言板页面
 * Messages Page
 */

import { pages } from '@/lib/data'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 图片托管服务 */}
      <link rel="preconnect" href="https://s2.loli.net" />
      <link rel="dns-prefetch" href="https://s2.loli.net" />

      {/* 头像服务 */}
      <link rel="preconnect" href="https://q1.qlogo.cn" />
      <link rel="dns-prefetch" href="https://q1.qlogo.cn" />
      <link rel="preconnect" href="https://gravatar.loli.net" />
      <link rel="dns-prefetch" href="https://gravatar.loli.net" />

      {/* 表情包 */}
      <link rel="preconnect" href="https://cdn.jsdmirror.com" />
      <link rel="dns-prefetch" href="https://cdn.jsdmirror.com" />
      <link rel="preconnect" href="https://gxh.vip.qq.com" />
      <link rel="dns-prefetch" href="https://gxh.vip.qq.com" />
      <link rel="preconnect" href="https://p.qpic.cn" />
      <link rel="dns-prefetch" href="https://p.qpic.cn" />
      <link rel="preconnect" href="https://i1.hdslb.com" />
      <link rel="dns-prefetch" href="https://i1.hdslb.com" />
      <link rel="preconnect" href="https://tb3.bdstatic.com" />
      <link rel="dns-prefetch" href="https://tb3.bdstatic.com" />
      <link rel="preconnect" href="https://picasso-static.xiaohongshu.com" />
      <link rel="dns-prefetch" href="https://picasso-static.xiaohongshu.com" />

      <div className="space-y-8 pt-8 pb-16 sm:space-y-12 sm:pt-12 sm:pb-24">
        {/* 页面标题 */}
        <section className="space-y-3" id="title">
          <h1 className="text-3xl font-bold sm:text-4xl">
            话
            <ruby>
              匣<rp>(</rp>
              <rt className="text-sm">xiá</rt>
              <rp>)</rp>
            </ruby>
            子
          </h1>
          <p className="text-text-secondary">{`${pages.messages.description}。`}</p>
        </section>

        {children}
      </div>
    </>
  )
}
