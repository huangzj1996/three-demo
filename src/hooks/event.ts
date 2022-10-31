import { onMounted, onUnmounted } from 'vue'

export function useEventLister(target: HTMLElement | Window, event: keyof HTMLElementEventMap, callBack: (this: HTMLElement, ev: any) => any) {
  onMounted(() => target.addEventListener(event, callBack))
  onUnmounted(() => target.removeEventListener(event, callBack))
}
