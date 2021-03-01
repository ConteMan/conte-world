<template>
  <div>
    <div class="list-header">
      {{ $config.articleListTitle }}
    </div>
      <a-spin
        :spinning="loading"
        wrapperClassName="spin-loading-container"
        tip="Hello, ConteMan"
      >
      <a-icon slot="indicator" class="spin-loading" type="loading" spin />
      <div class="fixed-header-container list-container">
        <a-list
          itemLayout="vertical"
          size="small"
          :bordered="false"
          :dataSource="data"
        >
          <a-list-item
            slot="renderItem"
            slot-scope="item"
            :key="item.slug"
            @click="$router.push({name: 'ArticleDetail', params: {id: item.id}})"
          >
            <div class="article-l-item">
              <div class="article-l-title" :title="item.title">{{ item.title }}</div>
              <div class="article-l-time">
                {{ $dayjs(item.info_at).format("YYYY-MM-DD") }}
              </div>
            </div>
          </a-list-item>
        </a-list>
      </div>
    </a-spin>
  </div>
</template>

<script>
import articleApi from '@/api/article'

export default {
  name: 'Article',
  data() {
    return {
      data: [],
      loading: false,
    }
  },
  created() {
    this.list()
  },
  methods: {
    list() {
      this.loading = true
      articleApi.docs().then(
        response => {
          setTimeout(() => {
            this.loading = false
          }, 200)
          if (response.data.code === 0) {
            this.data = response.data.data.items
          }
        }
      )
    },
  }
}
</script>

<style scoped lang="less">
@import "~@/style/variables";

@{deep} .ant-list-vertical .ant-list-item-content {
  margin: 0;
  padding: 10px 8px;
}

.list-container {
  height: calc(100vh - 1px);
}

.article-l-item {
  cursor: pointer;

  .article-l-title {
    font-size: 14px;
  }

  .article-l-time {
    font-size: 12px;
    text-align: left;
  }
}

.article-l-item:hover {
  .article-l-title {
    color: @red;
  }
}

.dark-theme {
  .article-l-item {
    color: @dark-theme-color;
  }

  .list-container .ant-list-item {
    border-bottom-color: @dark-theme-border;
  }
}
</style>
