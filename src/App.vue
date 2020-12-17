<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mixin } from '@/utils/mixin'

export default {
  name: 'App',
  mixins: [mixin],
  methods: {
    ...mapMutations('app', {
      darkAction: 'DARKMODE',
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
