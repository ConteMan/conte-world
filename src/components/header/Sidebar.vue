<template>
  <div class="nav-container">
    <div class="title logo" @click="$router.push({ path: '/' })">
      <img src="@/assets/img/favicon.png" />
    </div>
    <div class="nav-content">
      <span
        v-for="item in routes"
        :key="item.name"
        class="nav-item"
        :class="{ active: item.active || item.path === $route.matched[0].path }"
        @click="$router.push({ path: item.path })"
      >
        {{ item.extend ? item.extend.extend.name : item.meta.title }}
      </span>
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
          <div class="setting-item" title="Dark Mode" @click="darkAction('default')">
            <c-icon type="icon-dark" class="setting-icon" />
          </div>

          <div v-if="enableFullscreen" class="setting-item" title="Full Screen" @click="fullScreen">
            <a-icon v-if="isFullscreen" type="fullscreen-exit" class="setting-icon" />
            <a-icon v-else type="fullscreen" class="setting-icon" />
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
  created() {
    this.enableFullscreen = fscreen.fullscreenEnabled;
    fscreen.addEventListener('fullscreenchange', this.fullscreenChange, false);
  },
  methods: {
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
    changeShowSetting($event) {
      if (!$event.relatedTarget && this.showSetting) {
        this.showSetting = false;
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
