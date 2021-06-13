<template>
  <div class="content-list">
    <div class="item-container">
      <div v-for="item in items" :key="item.id" class="list-item">
        <div class="card">
          <p>
            {{ item.properties.Name.title[0].plain_text }}
          </p>
          <p>
            {{ item.properties.About.formula.string }}
          </p>
        </div>
        <div class="info">
          <span class="time">
            {{ item.properties.Start.date.start }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Base from '@/api/notion';

export default {
  name: 'Date',
  data() {
    return {
      loading: true,

      queryBase: {
        type: 'database',
        action: 'query',
        params: {
          id_key: 'CONTE_WORLD_F_DATE_NOTION_DB',
          sorts: [
            {
              property: 'ID',
              direction: 'ascending',
            }
          ],
        },
      },

      startCursor: undefined,
      pageSize: 100,
      hasMore: true,

      items: [],
    };
  },
  async created() {
    await this.index();
  },
  methods: {
    async index() {
      const { queryBase, startCursor, pageSize, hasMore } = this;
      if (!hasMore) {
        return false;
      }
      queryBase.params.start_cursor = startCursor;
      queryBase.params.page_size = pageSize;

      const res = await Base.index(queryBase);
      if (res.data.code === 0) {
        const { results, has_more, next_cursor } = res.data.data;
        this.hasMore = has_more;
        this.startCursor = next_cursor;
        if (results.length > 0) {
          this.items = this._.concat(this.items, results);
        }
        if (has_more) {
          return 1;
        } else {
          return 0;
        }
      } else {
        return -1;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
