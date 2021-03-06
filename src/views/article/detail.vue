<template>
  <div>
    <div class="title">
      <span class="name">
        {{ title }}
      </span>
      <span class="date">
        {{ $dayjs(fullData.updated_at).format( 'YYYY-MM-DD') }}
      </span>
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
      fullData: '',
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
            this.fullData = data
          }
        }
      )
    },
  }
}
</script>

<style scoped lang="less">
@import "~@/style/variables";

.title {
  padding: @base-padding;
  text-align: left;
  .name {
    font-size: 20px;
    font-weight: 800;
  }
  .date {
    padding: @base-padding/2;
    font-size: 14px;
    color: @font-color-grey;
    font-style: italic;
  }
}

.markdown-container {
  margin: auto;
  padding: @base-padding;
  max-height: 100vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}

.dark-theme {
  .markdown-container {
    color: @dark-theme-color;
  }
}
</style>
