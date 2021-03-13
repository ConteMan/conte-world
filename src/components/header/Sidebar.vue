<template>
  <div class="nav-container">
    <div class="title logo" @click="$router.push({ path: '/' })">
      {{ $config.siteName }}
    </div>
    <div
      class="nav-item"
      :class="{ active: (item.active || item.path == $route.matched[0].path) }"
      v-for="item in routes"
      :key="item.name"
      @click="$router.push({path: item.path})"
    >
      <div class="des">{{ item.meta.title }}</div>
    </div>
    <div class="nav-bottom">
        <span class="bottom-item" @click="darkAction()" title="暗黑模式">
          <c-icon type="icon-dark" class="bottom-icon"/>
        </span>
        <span v-if="enableFullscreen" class="bottom-item" @click="fullScreen()" title="全屏">
          <a-icon v-if="isFullscreen" type="fullscreen-exit" class="bottom-icon"/>
          <a-icon v-else type="fullscreen" class="bottom-icon"/>
        </span>
    </div>
  </div>
</template>

<script>
import fscreen from 'fscreen'
import { mixin } from '@/utils/mixin'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
import * as MT from '@/store/mutation-types'

export default {
  name: 'Sidebar',
  mixins: [mixin],
  data() {
    return {
      enableFullscreen: true,
      isFullscreen: false,
      wave: null,
    }
  },
  computed: {
    ...mapGetters(
      {
        routes: 'routes'
      }
    ),
  },
  created() {
    this.enableFullscreen = fscreen.fullscreenEnabled
    fscreen.addEventListener('fullscreenchange', this.fullscreenChange, false)
  },
  mounted() {
  },
  methods: {
    turnUrl(url) {
      window.location.href = url
      return true
    },
    ...mapMutations('app', {
      menuAction: MT.MENU_STATUS,
      darkAction: MT.DARK_MODE,
    }),
    fullScreen() {
      const element = document.body
      if (fscreen.fullscreenElement === null) {
        fscreen.requestFullscreen(element)
      } else {
        fscreen.exitFullscreen()
      }
    },
    fullscreenChange() {
      if (fscreen.fullscreenElement !== null) {
        this.isFullscreen = true
      } else {
        this.isFullscreen = false
      }
    }
  }
}
</script>

<style scoped lang="less">
@import './index.less';
</style>
