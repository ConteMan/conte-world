<template>
  <div class="share-container">
    <div class="back">
      <a-icon type="left" @click="$router.push({ path: '/' + type })" />
    </div>
    <div class="content" v-html="data.content"></div>
  </div>
</template>

<script>
import { mixin } from '@/utils/mixin';
import { mapMutations } from 'vuex';
import * as MT from '@/store/mutation-types';
import Talk from '@/api/talk';

export default {
  name: 'Share',
  mixins: [mixin],
  props: {
    type: {
      type: String,
      default: 'talk',
    },
    slug: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      loading: true,
      data: {},
    };
  },
  async created() {
    await this.getInfo();
  },
  methods: {
    ...mapMutations('app', {
      headerHeightAction: MT.HEADER_HEIGHT,
      loadingAction: MT.LOADING,
    }),
    async getInfo() {
      const { type, slug } = this;
      switch (type) {
        default:
          this.data = await this.getTalk(slug || 'random');
          break;
      }
    },
    async getTalk(slug) {
      const res = await Talk.show(slug);
      if (!res.data.code) {
        return res.data.data;
      } else {
        return {};
      }
    }
  },
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
