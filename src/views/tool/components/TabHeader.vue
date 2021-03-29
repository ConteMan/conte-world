<template>
  <div class="tab-header">
    <div
      class="tab-item"
      :class="{ active:active==item.name }"
      v-for="item in tabs"
      :key="item.name"
      @click="$router.push({ name: item.name })"
    >
      {{ item.meta.title }}
    </div>
  </div>
</template>

<script>
import mine from '@/router/modules/tool';

export default {
  name: 'TabHeader',
  data() {
    return {
      tabs: mine.children,
    };
  },
  props: {
    active: {
      type: String,
      default: '',
    }
  }
};
</script>

<style scoped lang="less">
@import "~@/style/variables";

.tab-header {
  position: relative;
  top: 0;
}

.tab-item {
  display: inline-block;
  padding: 4px 6px;
  margin: 0 10px 0 0;
  line-height: 15px;
  cursor: pointer;
}

.active {
  font-weight: @font-bold;
  color: @red;
}
</style>
