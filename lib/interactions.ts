// 通用互动系统 - 配置驱动架构

export type InteractionType = string // 完全开放，不限制类型

export interface InteractionConfig {
  /** 图标组件名称 */
  icon: 'cheers' | 'flower' | 'heart' | string
  /** CSS 变量名称（不含 var()） */
  colorVar: string
  /** 无障碍标签 */
  ariaLabel: string
  /** 显示名称（用于日志等） */
  displayName: string
  /** 是否启用（预留开关） */
  enabled?: boolean
  /** 每天最大点击次数（默认 1） */
  maxClicksPerDay?: number
}

export interface InteractionCounts {
  [id: string]: number
}

export interface InteractionClickResponse {
  ok: boolean
  count: number
  error?: string
}

// 配置注册表（易于扩展）
export const INTERACTION_CONFIGS: Record<string, InteractionConfig> = {
  thoughts: {
    icon: 'cheers',
    colorVar: '--color-viki-blue',
    ariaLabel: '干杯',
    displayName: '碎碎念互动',
    enabled: true,
    maxClicksPerDay: 1, // 每天 1 次
  },
  'mio-says': {
    icon: 'flower',
    colorVar: '--color-mio-pink',
    ariaLabel: '献花',
    displayName: 'Mio 说互动',
    enabled: true,
    maxClicksPerDay: 1, // 每天 1 次
  },
  posts: {
    icon: 'heart',
    colorVar: '--color-mio-pink',
    ariaLabel: '喜欢',
    displayName: '文章互动',
    enabled: true, // 已启用
    maxClicksPerDay: 10, // 每天 10 次
  },
}

// 获取配置（带验证）
export function getInteractionConfig(type: string): InteractionConfig | null {
  const config = INTERACTION_CONFIGS[type]
  if (!config || config.enabled === false) {
    return null
  }
  return config
}

// 验证类型是否有效
export function isValidInteractionType(type: string): boolean {
  return getInteractionConfig(type) !== null
}

// ==================== 客户端状态管理 ====================

interface UserClickState {
  date: string // YYYY-MM-DD 格式
  clicks: Record<string, number> // { id: clickCount }
}

// 获取今天的日期字符串
function getTodayString(): string {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

// 从 localStorage 读取用户点击状态
export function loadUserClickState(type: string): UserClickState {
  if (typeof window === 'undefined') {
    return { date: getTodayString(), clicks: {} }
  }

  const key = `interaction:${type}:user-clicks`
  const stored = localStorage.getItem(key)

  if (!stored) {
    return { date: getTodayString(), clicks: {} }
  }

  try {
    const state = JSON.parse(stored) as UserClickState

    // 如果不是今天的数据，清空
    if (state.date !== getTodayString()) {
      return { date: getTodayString(), clicks: {} }
    }

    return state
  } catch {
    return { date: getTodayString(), clicks: {} }
  }
}

// 保存用户点击状态到 localStorage
export function saveUserClickState(type: string, state: UserClickState): void {
  if (typeof window === 'undefined') return

  const key = `interaction:${type}:user-clicks`
  localStorage.setItem(key, JSON.stringify(state))
}

// 获取用户今天对某个 ID 的点击次数
export function getUserClickCount(type: string, id: string): number {
  const state = loadUserClickState(type)
  return state.clicks[id] ?? 0
}

// 记录用户点击
export function recordUserClick(type: string, id: string): number {
  const state = loadUserClickState(type)
  const currentCount = state.clicks[id] ?? 0
  const newCount = currentCount + 1

  state.clicks[id] = newCount
  saveUserClickState(type, state)

  return newCount
}

// 检查用户是否还能点击
export function canUserClick(type: string, id: string): boolean {
  const config = getInteractionConfig(type)
  if (!config) return false

  const maxClicks = config.maxClicksPerDay ?? 1
  const currentCount = getUserClickCount(type, id)

  return currentCount < maxClicks
}
