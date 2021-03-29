<template>
  <div>
    <tab-header v-bind="{active: active}"/>
    <div class="list-container">
      <div class="title">@{{ data.username }}</div>
      <div class="item">
        <div class="content">
          ID：{{ data.id }}
        </div>
      </div>
      <div class="item">
        <div class="content">
          创建日期：{{ $dayjs(data.created_at).format('YYYY-MM-DD HH:mm:ss') }}
        </div>
      </div>
      <div class="item">
        <div class="content">
          更新日期：{{ $dayjs(data.updated_at).format('YYYY-MM-DD HH:mm:ss') }}
        </div>
      </div>
      <div class="divider"></div>
    </div>
  </div>
</template>

<script>
import userApi from '@/api/user';
import TabHeader from './components/TabHeader';

export default {
  name: 'Index',
  components: {
    TabHeader
  },
  data() {
    return {
      data: {},
      active: this.$route.name
    };
  },
  methods: {
    info() {
      userApi.info().then(
        response => {
          this.data = response.data.data;
        }
      );
    },
  },
  created() {
    this.info();
  }
};
</script>

<style scoped lang="less">
</style>
