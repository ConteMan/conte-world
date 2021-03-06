<template>
  <div id="app">
    <a-config-provider
      :getPopupContainer="getPopupContainer"
    >
      <router-view/>
    </a-config-provider>
  </div>
</template>

<script>
import { mixin } from '@/utils/mixin'
import * as MT from '@/store/mutation-types'
import { mapMutations } from 'vuex'

export default {
  name: 'App',
  mixins: [mixin],
  data() {
    return {
      timer: false,
    }
  },
  created() {
    window.addEventListener('resize', () => {
      if (!this.timer) {
        this.timer = true
        setTimeout(
          () => {
            const isMobileTmp = window.innerWidth <= 768
            if (isMobileTmp !== this.isMobile) {
              this.isMobileAction(isMobileTmp)
            }
            this.timer = false
          }, 400)
      }
    }, false)
  },
  mounted() {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (prefersDarkMode) {
      this.darkAction(true)
    }
  },
  methods: {
    ...mapMutations('app', {
      darkAction: MT.DARK_MODE,
      isMobileAction: MT.IS_MOBILE,
      contentHeightAction: MT.CONTENT_HEIGHT,
    }),
    getPopupContainer(el) {
      if (el) {
        return el.parentNode
      } else {
        return document.body
      }
    },
  },
}
</script>

<style scoped lang="less">
#app {
  min-height: 100vh;
}
</style>
