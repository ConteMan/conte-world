<template>
  <div class="main-container">
    <div v-if="showMenu" class="item">
      <a-button ghost title="打开菜单" @click="menuAction">
        <a-icon type="appstore" :theme="menuIconTheme"/>
      </a-button>
    </div>
    <div v-if="enableFullscreen" class="item">
      <a-button ghost title="全屏" @click="fullScreen">
        <a-icon v-if="isFullscreen" type="fullscreen-exit"/>
        <a-icon v-else type="fullscreen"/>
      </a-button>
    </div>
    <div class="item">
      <a-button ghost title="暗黑模式" @click="darkAction">
        <a-icon type="bulb" :theme="darkModeIconTheme"/>
      </a-button>
    </div>
  </div>
</template>

<script>
import fscreen from 'fscreen';
import { mapMutations } from 'vuex';
import * as MT from '@/store/mutation-types';
import { mixin } from '@/utils/mixin';

export default {
  name: 'FloatActions',
  mixins: [mixin],
  props: {
    showMenu: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      enableFullscreen: true,
      isFullscreen: false,
    };
  },
  computed: {
    menuIconTheme: function() {
      return 'outlined';
    },
    darkModeIconTheme: function() {
      return this.darkMode ? 'filled' : 'outlined';
    }
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
    }
  }
};
</script>

<style scoped lang="less">
@import "~@/style/variables.less";

.main-container {
  position: fixed;
  bottom: 64px;
  right: 16px;
  height: max-content;
  z-index: 9999;

  .item {
    margin: 10px 0 0 0;
    .ant-btn-background-ghost {
      color: @font-color-grey;
      border-color: @grey;
    }
    .ant-btn:hover, .ant-btn:focus {
      color: @font-color-grey;
      border-color: @grey-60;
      box-shadow: none;
      animation: jelly 0.5s;
    }
    .ant-btn {
      padding: 0 10px;
      border: 1px solid @border-color;
      border-radius: 1px;
      background: @bg !important;
    }

    --antd-wave-shadow-color: none;
    @keyframes jelly {
      0%,
      100% {
        transform: scale(1, 1);
      }
      25% {
        transform: scale(0.9, 1.1);
      }
      50% {
        transform: scale(1.1, 0.9);
      }
      75% {
        transform: scale(0.95, 1.05);
      }
    }
  }
}

.dark-theme {
  .main-container {
    .item {
      .ant-btn-background-ghost {
        color: @dark-theme-color;
        border-color: @dark-theme-color;
      }
      .ant-btn:hover, .ant-btn:focus {
        color: @dark-theme-color;
      }
      .ant-btn {
        border: 1px solid @dark-theme-color;
        background: @dark-theme-bg !important;
      }
    }
  }
}
</style>
