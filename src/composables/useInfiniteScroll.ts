import { onMounted, onUnmounted, ref, toValue, type MaybeRefOrGetter } from 'vue'

interface UseInfiniteScrollOptions {
  threshold?: number
  disabled?: MaybeRefOrGetter<boolean>
}

export function useInfiniteScroll(
  callback: () => void | Promise<void>,
  options: UseInfiniteScrollOptions = {}
) {
  const threshold = options.threshold ?? 200
  const disabled = options.disabled ?? false
  const isLoading = ref(false)

  const handleScroll = async () => {
    if (isLoading.value || toValue(disabled)) return

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight

    if (scrollTop + windowHeight >= documentHeight - threshold) {
      isLoading.value = true
      try {
        await callback()
      } finally {
        isLoading.value = false
      }
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    isLoading
  }
}
