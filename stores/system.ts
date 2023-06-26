import { acceptHMRUpdate, defineStore } from 'pinia'

export const useSystemStore = defineStore('system', () => {
  const showNavDrawer = ref(false)

  function toggleNavDrawer(status: boolean | undefined = undefined) {
    if (typeof status === 'undefined')
      showNavDrawer.value = !showNavDrawer.value
    else
      showNavDrawer.value = status
  }

  return {
    showNavDrawer,
    toggleNavDrawer,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useScreenStore, import.meta.hot))
