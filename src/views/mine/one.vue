<template>
  <div>
    <tab-header v-bind="{active: active}"/>
    <div class="list-container">
      <div class="title">更新</div>
      <div class="item">
        <div class="content">
          获取并存储最新数据
        </div>
        <div class="operation">
          <a-button ref="update-btn" size="small" @click="update">确定</a-button>
        </div>
      </div>
      <div class="divider"></div>
    </div>
  </div>
</template>

<script>
import oneApi from '@/api/one';
import TabHeader from './components/TabHeader';

export default {
  name: 'One',
  components: {
    TabHeader
  },
  data() {
    return {
      active: this.$route.name
    };
  },
  methods: {
    update() {
      this.$refs['update-btn'].sLoading = true;
      oneApi.update({}).then(
        response => {
          const res = response.data.data;
          this.$refs['update-btn'].sLoading = false;
          this.$message.success('成功更新' + res.add_num + '条！');
        }
      );
    },
  },
  created() {
  }
};
</script>

<style scoped lang="less">
@import "~@/style/index";

</style>
