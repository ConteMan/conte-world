<template>
  <div class="nav-container">
    <div id="top-bar"/>
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
          <a-icon type="bulb" class="bottom-icon"/>
        </span>
        <span v-if="enableFullscreen" class="bottom-item" @click="fullScreen()" title="全屏">
          <a-icon v-if="isFullscreen" type="fullscreen-exit" class="bottom-icon"/>
          <a-icon v-else type="fullscreen" class="bottom-icon"/>
        </span>
    </div>
  </div>
</template>

<script>
import Wave from '@/utils/wave.es.min'
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
    this.wave = new Wave('#top-bar', {
      number: 3,
      smooth: 50,
      velocity: 1,
      height: 20,
      colors: ['rgb(240, 28, 0, 0.2)'],
      opacity: 0.3,
      position: 'bottom',
      border: {
        show: false,
        width: 2,
        color: [],
      },
    })
    this.wave.animate()
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
