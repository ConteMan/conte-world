<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mixin } from '@/utils/mixin'
import * as MT from '@/store/mutation-types'
import { mapMutations } from 'vuex'

export default {
  name: 'App',
  mixins: [mixin],
  methods: {
    ...mapMutations('app', {
      darkAction: MT.DARK_MODE,
    }),
  },
  mounted() {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (prefersDarkMode) {
      this.darkAction(true)
    }
  },
}
</script>

<style scoped lang="less">
#app {
  min-height: 100vh;
}
</style>
