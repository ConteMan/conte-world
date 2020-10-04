<template>
    <div>
        <div class="back-header">
            <div class="back-btn" @click="$router.push({ name: 'Article' })">
                <a-icon type="left" />
            </div>
            <div class="title">
                {{ title }}
            </div>
        </div>
      <template v-if="platform === 'YUQUE'">
        <iframe :srcdoc="data" style="width: 100%;height: calc(100vh - 4px); border: none;" frameborder="0" scrolling="auto"></iframe>
      </template>
      <template v-else>
        <div class="markdown-container markdown-body" v-html="data"></div>
      </template>
    </div>
</template>

<script>
    import articleApi from "@/api/article"

    export default {
        name: "index",
        data() {
            return {
              data: '',
              title: '',
              platform: 'ORI',
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
              articleApi.docDetail(this.$route.params.id).then(
                    responese => {
                      if(responese.data.code === 0) {
                        const data = responese.data.data.res;
                        const platform = data.platform;
                        if (platform === 'ORI') {
                          this.data = data.content_html;
                        }
                        if (platform === 'YUQUE') {
                          this.data = data.yuque_content.body_html;
                        }
                        this.title = data.title;
                      }
                    }
                )
            },
        }
    }
</script>

<style scoped lang="less">
  .markdown-container {
    padding: 16px;
  }
</style>
