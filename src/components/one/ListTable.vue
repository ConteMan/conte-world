<template>
  <vxe-grid
    border
    show-header-overflow
    highlight-hover-row
    height="100%"
    width="100%"
    size="small"
    :loading="loading"
    :columns="tableColumn"
    :data="tableData"
    :toolbar="tableToolbar"
  ></vxe-grid>
</template>

<script>
import oneApi from '@/api/one/index';

export default {
  name: 'Index',
  data() {
    return {
      loading: false,
      tableColumn: [
        { type: 'seq', width: 50 },
        {
          field: 'date',
          title: '日期',
          width: 100,
        },
        {
          field: 'content',
          title: '文字',
          showOverflow: 'tooltip',
        },
        {
          field: 'text_authors',
          title: '作者',
          width: 100,
          showOverflow: 'tooltip',
        }
      ],
      tableData: [],
      tableToolbar: {
        refresh: true,
        zoom: true,
        custom: true
      },
    };
  },
  created() {
    const params = {
      type: 'one',
      id: 0,
    };
    this.loading = true;
    oneApi.ajaxList(params).then(
      responese => {
        this.loading = false;
        this.tableData = responese.data.data;
      }
    );
  }
};
</script>

<style scoped>

</style>
