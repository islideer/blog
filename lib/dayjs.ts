import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import 'dayjs/locale/zh-cn.js'

dayjs.locale('zh-cn')
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)

export const TZ_SHANGHAI = 'Asia/Shanghai'

export type DatePreset = 'date' | 'date-time' | 'full' | 'full-mono' | 'full-time' | 'month-day'

const DATE_PRESETS: Record<DatePreset, { withYear: string; withoutYear: string }> = {
  date: { withYear: 'YYYY.M.D', withoutYear: 'M.D' },
  'date-time': { withYear: 'YYYY.M.D HH:mm', withoutYear: 'M.D HH:mm' },
  full: { withYear: 'YYYY.M.D', withoutYear: 'YYYY.M.D' },
  'full-mono': { withYear: 'YYYY.MM.DD', withoutYear: 'YYYY.MM.DD' },
  'full-time': { withYear: 'YYYY.M.D HH:mm', withoutYear: 'YYYY.M.D HH:mm' },
  'month-day': { withYear: 'MM.DD', withoutYear: 'MM.DD' },
}

function isCurrentYear(d: dayjs.Dayjs): boolean {
  return d.year() === dayjs().tz(TZ_SHANGHAI).year()
}

export function formatDate(date: dayjs.ConfigType, preset: DatePreset = 'date'): string {
  const d = dayjs(date).tz(TZ_SHANGHAI)
  const { withYear, withoutYear } = DATE_PRESETS[preset]
  return d.format(isCurrentYear(d) ? withoutYear : withYear)
}

export function formatDateCN(date: dayjs.ConfigType): string {
  const d = dayjs(date).tz(TZ_SHANGHAI)
  return d.format(isCurrentYear(d) ? 'M 月 D 日' : 'YYYY 年 M 月 D 日')
}

export function fromNow(date: dayjs.ConfigType): string {
  return dayjs(date).tz(TZ_SHANGHAI).fromNow()
}

export { dayjs }
