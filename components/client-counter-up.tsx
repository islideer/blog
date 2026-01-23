'use client'

import CountUp, { type CountUpProps } from 'react-countup'

export function ClientCounterUp(props: CountUpProps) {
  return <CountUp duration={1} start={0} {...props} />
}
