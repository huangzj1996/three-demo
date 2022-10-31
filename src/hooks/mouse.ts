import { ref } from 'vue'
import { useEventLister } from './event'

export function useMouse(target: HTMLElement | Window, callBack: (x: number, y: number) => void) {
  const x = ref(0)
  const y = ref(0)

  useEventLister(target, 'mousemove', (event) => {
    const { pageX, pageY } = event
    x.value = pageX
    y.value = pageY
    callBack && callBack(pageX, pageY)
  })

  return { x, y }
}
