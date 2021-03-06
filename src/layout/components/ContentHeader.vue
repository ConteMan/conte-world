<template>
  <div class="header">
    <div class="trigger" @click="menuAction()">
      <a-icon type="menu" class="trigger-icon"/>
    </div>
    <div v-if="isArticleDetail" class="trigger" @click="$router.push({ path: '/article'})">
      <a-icon type="left" class="trigger-icon"/>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import * as MT from '@/store/mutation-types'
export default {
  name: 'ContentHeader',
  data() {
    return {
      isArticleDetail: false,
    }
  },
  created() {
    this.deal()
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
      if (this.$route.name === 'ArticleDetail') {
        this.isArticleDetail = true
      } else {
        this.isArticleDetail = false
      }
    }
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
  }
  .trigger.ant-popover-open {
    opacity: 1;
  }
}
</style>
