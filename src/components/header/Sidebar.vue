<template>
  <div class="nav-container">
    <div
      class="title logo"
      @click="$router.push({ path: '/' })"
      :data-cn-title="cnTitle"
    >
      <span class="en-title">{{ enTitle }}</span>
    </div>
    <div class="slogan">
      <span>{{ getSlogan('start') }}</span>
      <br>
      <span>{{ getSlogan() }}</span>
    </div>
    <div class="nav-content">
      <div
        class="nav-item"
        :class="{ active: (item.active || item.path == $route.matched[0].path) }"
        v-for="item in routes"
        :key="item.name"
        @click="$router.push({path: item.path})"
      >
        <div class="des">
          {{ item.extend ? item.extend.extend.name : item.meta.title }}
        </div>
      </div>
    </div>
    <div class="nav-bottom">
      <span class="bottom-item" @click="darkAction()" title="Dark Mode">
        <c-icon type="icon-dark" class="bottom-icon"/>
      </span>
      <span v-if="enableFullscreen" class="bottom-item" @click="fullScreen()" title="Full Screen">
        <a-icon v-if="isFullscreen" type="fullscreen-exit" class="bottom-icon"/>
        <a-icon v-else type="fullscreen" class="bottom-icon"/>
      </span>
    </div>
  </div>
</template>

<script>
import fscreen from 'fscreen'
import { mixin } from '@/utils/mixin'
import { mapMutations } from 'vuex'
import * as MT from '@/store/mutation-types'

export default {
  name: 'Sidebar',
  mixins: [mixin],
  data() {
    return {
      enableFullscreen: true,
      isFullscreen: false,
    }
  },
  computed: {
    cnTitle() {
      return this.info.title ? String(this.info.title).split('/')[1] : ''
    },
    enTitle() {
      return this.info.title ? String(this.info.title).split('/')[0] : ''
    },
  },
  created() {
    this.enableFullscreen = fscreen.fullscreenEnabled
    fscreen.addEventListener('fullscreenchange', this.fullscreenChange, false)
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
    },
    getSlogan(type) {
      if (!this.info.slogan) {
        return ''
      }
      if (type === 'start') {
        return String(this.info.slogan).split(',')[0].toLowerCase()
      }
      return String(this.info.slogan).split(',')[1].slice(0, -1)
    }
  }
}
</script>

<style scoped lang="less">
@import './index.less';
</style>
