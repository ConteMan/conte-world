<template>
  <div class="about-container">
    <div class="markdown-container markdown-body" v-html="data.content_html" />
  </div>
</template>

<script>
import Base from '@/api/about.js';

export default {
  name: 'About',
  data() {
    return {
      data: {},
    };
  },
  created() {
    this.getPageInfo();
  },
  methods: {
    async getPageInfo() {
      const res = await Base.page();
      if (res.status === 200) {
        this.data = res.data.data;
      }
    },
  },
};
</script>

<style scoped lang="less">
@import './index.less';
</style>

