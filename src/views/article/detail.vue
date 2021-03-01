<template>
  <div>
    <div class="back-header">
      <div class="back-btn" @click="$router.push({ path: '/article' })">
        <a-icon class="back-btn-icon" type="left"/>
      </div>
      <div class="title">
        {{ title }}
      </div>
    </div>
    <template v-if="platform === 'YUQUE'">
      <iframe
        :srcdoc="data"
        style="width:100%; height:calc(100vh - 4px); border:none;"
        frameborder="0"
        scrolling="auto"
      ></iframe>
    </template>
    <template v-else>
      <div class="markdown-container markdown-body" v-html="data"></div>
    </template>
  </div>
</template>

<script>
import articleApi from '@/api/article'

export default {
  name: 'Detail',
  data() {
    return {
      data: '',
      title: '',
      platform: 'ORI',
    }
  },
  computed: {
    id: function() {
      return this.$route.params.id
    }
  },
  created() {
    this.detail()
  },
  methods: {
    turnTo(params) {
      this.$route.push(params)
    },
    detail() {
      articleApi.docDetail(this.id).then(
        response => {
          if (response.data.code === 0) {
            const data = response.data.data.res
            const platform = data.platform
            if (platform === 'ORI') {
              this.data = data.content_html
            }
            if (platform === 'YUQUE') {
              this.data = data.yuque_content.body_html
            }
            this.title = data.title
          }
        }
      )
    },
  }
}
</script>

<style scoped lang="less">
@import "~@/style/variables";

.markdown-container {
  max-width: 800px;
  margin: auto;
  padding: 71px 16px 16px;
}

.dark-theme {
  .markdown-container {
    color: @dark-theme-color;
  }
}
</style>
