<template>
  <div class="about-container">
    <div class="markdown-container markdown-body" v-html="picture403filter(page.content_html)" />
  </div>
</template>

<script>
import About from '@/api/about/index.js';

export default {
  name: 'About',
  data() {
    return {
      page: {},
    };
  },
  created() {
    this.getPageInfo();
  },
  methods: {
    async getPageInfo() {
      const res = await About.page();
      if (res.data.code === 0) {
        this.page = res.data.data;
      }
    },
    picture403filter(val) {
      try {
        return val.replace('<img', "<img referrerpolicy='no-referrer'");
      } catch (err) {
        return val;
      }
    }
  },
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>

