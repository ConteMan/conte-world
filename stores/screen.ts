import { acceptHMRUpdate, defineStore } from 'pinia'

type ScreenSizeType = 'large' | 'medium' | 'small'

export const useScreenStore = defineStore('screen', () => {
  const screenSize: Ref<ScreenSizeType> = ref('large')

  function setScreenSize(size: ScreenSizeType) {
    screenSize.value = size
  }

  return {
    screenSize,
    setScreenSize,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useScreenStore, import.meta.hot))
