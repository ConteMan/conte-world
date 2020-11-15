<template>
  <div class="nav-container">
    <div class="nav-item" :key="item.name" :class="{ active: (item.active || item.name == $route.matched[0].name) }" v-for="item in routes" @click="$router.push({name: item.name})">
      <div class="des">{{ item.meta.title }}</div>
    </div>
  </div>
</template>

<script>
import { mixin } from '@/utils/mixin'
import { mapGetters } from "vuex"

export default {
  name: "Sidebar",
  mixins: [ mixin ],
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(
      {
        routes: 'routes'
      }
    ),
  },
}
</script>

<style scoped lang="less">
@import "~@/style/variables";

.nav-container {
  height: 80%;
  display: flex !important;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  .nav-item {
    width: 100%;
    padding: 24px 0 0 0;
    cursor: pointer;
    .des {
      margin: auto;
      line-height: 1.2;
      width: min-content;
      font-size: 14px;
      border-bottom: 1px solid @border-color;
    }
  }
  .nav-item,.nav-item:focus {
    color: @font-color-grey;
  }
  .nav-item:hover {
    color: @red-60;
  }
  .nav-item.active {
    .des{
      font-weight: @font-bold;
      color: @red;
      border-bottom: 1px solid @red;
    }
  }
}
.dark-theme {
  .nav-container {
    .nav-item {
      .des {
        border-bottom: 1px solid @dark-theme-border;
      }
    }
    .nav-item {
      color: @font-color-grey2;
    }
    .nav-item:hover {
      color: white;
    }
  }
}
</style>
