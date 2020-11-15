<template>
  <div class="main-container">
    <div v-if="showMenu" class="item">
      <a-button ghost @click="menuAction" title="打开菜单">
        <a-icon type="appstore" :theme="menuIconTheme"/>
      </a-button>
    </div>
    <div class="item">
      <a-button ghost @click="darkAction" title="暗黑模式">
        <a-icon type="bulb" :theme="darkModeIconTheme"/>
      </a-button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mixin } from '@/utils/mixin'

export default {
  name: "FloatActions",
  props: {
    showMenu: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    menuIconTheme: function() {
      return 'outlined';
    },
    darkModeIconTheme: function() {
      return this.darkMode ? 'filled' : 'outlined';
    }
  },
  mixins: [ mixin ],
  methods: {
    ...mapMutations({
      menuAction: 'MENU_ACTION',
    }),
    ...mapMutations('app', {
      darkAction: 'DARKMODE',
    }),
  }
}
</script>

<style scoped lang="less">
@import "~@/style/variables";

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
    background: @dark-theme-bg;
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
      }
    }
  }
}
</style>
