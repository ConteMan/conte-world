<template>
  <div class="header">
    <div class="trigger" @click="menuAction()">
      <a-icon type="menu" class="trigger-icon"/>
    </div>
    <div
      v-if="isArticleDetail"
      class="trigger"
      @click="$router.push({ path: '/article'})"
    >
      <a-icon type="left" class="trigger-icon"/>
    </div>
    <div
      v-if="showListIcon"
      class="trigger"
      @click="showListAction(!showList)"
    >
      <c-icon type="icon-mulu" class="trigger-icon"/>
    </div>
    <div
      v-if="isArticle"
      class="trigger end"
      title="RSS Feed of Article"
      @click="turnUrl('https://isconte.com/feed/article.rss')"
    >
      <c-icon type="icon-rss" class="trigger-icon"/>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import * as MT from '@/store/mutation-types'
import { contentHeaderMixin } from '@/utils/mixin'

export default {
  name: 'ContentHeader',
  mixins: [contentHeaderMixin],
  data() {
    return {
      isArticle: false,
      isArticleDetail: false,
    }
  },
  created() {
    this.deal()
  },
  computed: {
    showListIcon() {
      return this.isArticleDetail && this.clientWidth > this.$config.articleShowListWidth
    }
  },
  watch: {
    '$route': 'deal'
  },
  methods: {
    ...mapMutations('app', {
      menuAction: MT.MENU_STATUS,
      darkAction: MT.DARK_MODE,
    }),
    deal() {
      this.isArticleDetail = this.$route.name === 'Article' && this.$route.params.id
      this.isArticle = ['Article'].includes(this.$route.name)
    },
    turnUrl(url) {
      window.location.href = url
      return true
    },
  },
}
</script>

<style scoped lang="less">
@import "~@/style/variables.less";

.header {
  padding: 0 10px;
  .trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 @base-padding/2;
    height: 100%;
    cursor: pointer;
    opacity: 0.3;
    .trigger-icon {
      font-size: 18px;
    }
    &:hover, &:focus, &:active, &:target {
      opacity: 1;
    }
    &.end {
      position: absolute;
      right: 20px;
    }
  }
  .trigger.ant-popover-open {
    opacity: 1;
  }
}
</style>
