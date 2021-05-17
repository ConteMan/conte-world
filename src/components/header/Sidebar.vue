<template>
  <div class="nav-container">
    <div class="title logo" :data-cn-title="cnTitle" @click="$router.push({ path: '/' })">
      <span class="en-title">{{ enTitle }}</span>
    </div>
    <div class="slogan">
      <span>{{ getSlogan('start') }}</span>
      <br />
      <span>{{ getSlogan() }}</span>
    </div>
    <div class="nav-content">
      <div
        v-for="item in routes"
        :key="item.name"
        class="nav-item"
        :class="{ active: item.active || item.path === $route.matched[0].path }"
        @click="$router.push({ path: item.path })"
      >
        <div class="des">
          {{ item.extend ? item.extend.extend.name : item.meta.title }}
        </div>
      </div>
    </div>

    <div class="setting-action" tabindex="0" @blur.capture="changeShowSetting($event)">
      <span class="setting-item" :style="{ opacity: showSetting ? '1' : '' }">
        <a-icon type="caret-left" class="nav-icon pointer" @click="revertShowSetting" />
      </span>

      <transition
        enter-active-class="animated fadeIn page-toggle-enter-active"
        leave-active-class="animated fadeOut page-toggle-leave-active"
      >
        <div v-if="showSetting" class="nav-setting">
          <div class="setting-item" title="Dark Mode" @click="darkAction">
            <c-icon type="icon-dark" class="setting-icon" />
          </div>

          <div v-if="enableFullscreen" class="setting-item" title="Full Screen" @click="fullScreen">
            <a-icon v-if="isFullscreen" type="fullscreen-exit" class="setting-icon" />
            <a-icon v-else type="fullscreen" class="setting-icon" />
          </div>

          <div v-if="!isMobile" class="setting-item" title="Layout Mode" @click="layoutModeAction">
            <c-icon v-if="layoutMode === 'static'" type="icon-fit-width" class="setting-icon" />
            <c-icon v-if="layoutMode === 'fit'" type="icon-static-width" class="setting-icon" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import fscreen from 'fscreen';
import { mixin } from '@/utils/mixin';
import { mapMutations } from 'vuex';
import * as MT from '@/store/mutation-types';

export default {
  name: 'Sidebar',
  mixins: [mixin],
  data() {
    return {
      enableFullscreen: true,
      isFullscreen: false,
      showSetting: false,
    };
  },
  computed: {
    cnTitle() {
      return this.info.title ? String(this.info.title).split('/')[1] : '';
    },
    enTitle() {
      return this.info.title ? String(this.info.title).split('/')[0] : '';
    },
  },
  created() {
    this.enableFullscreen = fscreen.fullscreenEnabled;
    fscreen.addEventListener('fullscreenchange', this.fullscreenChange, false);
  },
  methods: {
    turnUrl(url) {
      window.location.href = url;
      return true;
    },
    ...mapMutations('app', {
      menuAction: MT.MENU_STATUS,
      darkAction: MT.DARK_MODE,
    }),
    fullScreen() {
      const element = document.body;
      if (fscreen.fullscreenElement === null) {
        fscreen.requestFullscreen(element);
      } else {
        fscreen.exitFullscreen();
      }
    },
    fullscreenChange() {
      if (fscreen.fullscreenElement !== null) {
        this.isFullscreen = true;
      } else {
        this.isFullscreen = false;
      }
    },
    getSlogan(type) {
      if (!this.info.slogan) {
        return '';
      }
      if (type === 'start') {
        return String(this.info.slogan).split(',')[0].toLowerCase();
      }
      return String(this.info.slogan).split(',')[1];
    },
    changeShowSetting($event) {
      if (!$event.relatedTarget) {
        this.showSetting = !this.showSetting;
      }
    },
    revertShowSetting() {
      this.showSetting = !this.showSetting;
    }
  }
};
</script>

<style scoped lang="less">
@import './index.less';
</style>
