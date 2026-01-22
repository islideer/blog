import { HokSkinsClient } from './hok-skins-client'

import type { HokResponse } from '@/lib/hok'

interface HokSkinsProps {
  id?: string
  data: HokResponse | null
}

/**
 * 王者荣耀皮肤组件（纯服务端组件）
 * - 完全在服务端渲染结构
 * - 排序和显示更多由客户端组件处理
 */
export function HokSkins({ id, data }: HokSkinsProps) {
  // 如果没有数据，显示空状态
  if (!data || data.skins.length === 0) {
    return (
      <section className="space-y-4">
        <h2 className="text-text-primary text-sm font-semibold tracking-wider uppercase" id={id}>
          王者皮肤
        </h2>
        <p className="text-text-secondary text-sm">暂无王者荣耀皮肤数据</p>
      </section>
    )
  }

  return (
    <section className="space-y-4">
      {/* 客户端组件处理排序和显示更多 */}
      <HokSkinsClient data={data} id={id} />
    </section>
  )
}
